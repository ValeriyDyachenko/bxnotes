---
title: тестирование
seoDescription: тестирование | React.
seoKeywords: тестирование, React, saga, компоненты
date: 2020-01-19 04:00:00
---
# тестирование

## виды тестов

+ End to End &ndash; робот имитирует действия пользователя. Иногда называются "функциональным тестированием" или e2e.
+ Интеграционное &ndash; тестируется корректное взаимодействие нескольких юнит тестов.
+ Юнит &ndash; тестируется изолированная часть приложения.
+ Статика &ndash; опечатки и статическая типизация во время написания кода.

Подробнее про виды тестов &ndash; https://kentcdodds.com/blog/unit-vs-integration-vs-e2e-tests
Почему не стоит использовать <span lang="en">shallow rendering</span> &ndash; https://kentcdodds.com/blog/why-i-never-use-shallow-rendering

В учебном проекте был использован *create-react-app*, в котором предоставлен *jest* по умолчанию.

## saga

<a href="https://redux-saga.js.org/docs/advanced/Testing.html">Тестирование саг</a> в официальной документации.

Работа саг основана на эффектах. Эффект &ndash; это специальный объект-инструкция, который затем интерпретируется сагами. В юнит тестах важно проверить алгоритм, а не результат выполнения конкретных инструкций. По этому, саги тестировать очень легко, достаточно проверить, что определенные эффекты возникают в правильной последовательности. При этом, эффекты выполняться не будут, то есть никаких реальных запусков функций не произойдет, так как нет среды, которая бы их интерпретировала.

Ниже предоставлен код, который тестирует сагу, добавляющую пользователя:

```redux/ducks/people.js```:

```js
export const addPersonSaga = function * ({ payload }) {
    yield put({
        type: ADD_PERSON_START
    })

    yield call(apiService.addPerson, payload)

    yield put({
        type: ADD_PERSON_SUCCESS,
    })
}
```

```redux/ducks/people.test.js```:

```js
import { put, call } from 'redux-saga/effects'
// ...

describe('People Duck', () => {
  describe('Saga', () => {
    describe('Add Person', () => {
      it('should add a person', () => {
        const person = {
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com'
        }
        const action = addPerson(person) // action creator

        const saga = addPersonSaga(action) // saga

        // test dispatching action:
        expect(saga.next().value).toEqual(
          put({
            type: ADD_PERSON_START
          })
        )

        // await apiService.addPerson(person):
        expect(saga.next().value).toEqual(call(apiService.addPerson, person))

        // dispatching action
        expect(saga.next().value).toEqual(
          put({
            type: ADD_PERSON_SUCCESS
          })
        )
      })
    })
  })
})
```

## компоненты

*Enzyme* тестирует реакт компоненты с помощью виртуального *DOM*, без браузера.

Для получения DOM элементов рекомендуется написать отдельный слой абстракции driver, чтобы меньше зависеть от изменений верстки.  

```src/components/people/people-list.driver.js```:

```js
import React from 'react'
import { PeopleList } from './people-list'
import { mount } from 'enzyme'

export default (initialProps = {}) => {
  const props = { people: [], fetchPeople: () => {}, ...initialProps }
  const component = mount(<PeopleList {...props} />)

  return {
    get: {
      listItems: () => component.find(`[data-test="people-list-item"]`),
      listItem: (index) =>
        component.find(`[data-test="people-list-item"]`).at(index),
      isItemActive: (index) =>
        component
          .find(`[data-test="people-list-item"]`)
          .at(index)
          .hasClass('active-item')
    },
    when: {
      itemClicked: (index) =>
        component
          .find(`[data-test="people-list-item"]`)
          .at(index)
          .simulate('click')
    }
  }
}
```

```src/components/people/people-list.test.js```:

```js
import React from 'react'
import { mount } from 'enzyme'
import createDriver from './people-list.driver'

const people = [
  {
    id: '123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  },
  {
    id: '124',
    firstName: 'Test1',
    lastName: 'User1',
    email: 'test1@example.com'
  }
]

describe('PeopleList', () => {
  it('should render a list', () => {
    const driver = createDriver({ people })

    expect(driver.get.listItems().length).toEqual(people.length)
  })

  it('should call fetchPeople', () => {
    const fetchPeople = jest.fn()

    createDriver({ fetchPeople })

    expect(fetchPeople.mock.calls.length).toEqual(1)
  })

  it('should select person', () => {
    const driver = createDriver({ people })

    expect(driver.get.isItemActive(0)).toEqual(false)

    driver.when.itemClicked(0)

    expect(driver.get.isItemActive(0)).toEqual(true)
  })
})
```

## Интеграционные тесты

Интеграционные тесты проверяют взаимодействие реальных частей приложения.

```src/components/people/people-list.driver.js```:

```js
import React from 'react'
import PeopleList from './people-list'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import createStore from '../../redux'

export default (initialProps = {}) => {
  const component = mount(
    <Provider store={createStore()}>
      <PeopleList {...initialProps} />
    </Provider>
  )

  return {
    get: {
      listItems: () => component.find(`[data-test="people-list-item"]`),
      listItem: (index) =>
        component.find(`[data-test="people-list-item"]`).at(index),
      isItemActive: (index) =>
        component
          .find(`[data-test="people-list-item"]`)
          .at(index)
          .hasClass('active-item')
    },
    when: {
      itemClicked: (index) =>
        component
          .find(`[data-test="people-list-item"]`)
          .at(index)
          .simulate('click')
    },
    update: () => component.update()
  }
}
```

Обратите внимание, что ```PeopleList``` подключен к *redux* хранилищу.

```src/components/people/people-list.test.js```:

```js
import eventually from 'wix-eventually'
import createDriver from './people-list.driver'
const people = [
  {
    id: '123',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com'
  },
  {
    id: '124',
    firstName: 'Test1',
    lastName: 'User1',
    email: 'test1@example.com'
  }
]

jest.mock('../../services/api', () => ({
  fetchPeople: () =>
    Promise.resolve([
      {
        id: '123',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      },
      {
        id: '124',
        firstName: 'Test1',
        lastName: 'User1',
        email: 'test1@example.com'
      }
    ]),
  onAuthChange: () => {}
}))

describe('PeopleList', () => {
  it('should render a list', async () => {
    const driver = createDriver()

    await eventually(() => {
      driver.update()
      expect(driver.get.listItems().length).toEqual(people.length)
    })
  })

  it('should select person', async () => {
    const driver = createDriver()

    await eventually(() => {
      driver.update()
      expect(driver.get.listItems().length).toEqual(people.length)
    })

    expect(driver.get.isItemActive(0)).toEqual(false)

    driver.when.itemClicked(0)

    expect(driver.get.isItemActive(0)).toEqual(true)
  })
})
```

С помощью jest.mock мы замокали импорт реального класса.

С помощью ```eventually``` (сторонний пакет ```wix-eventually```) дождались полной отрисовки компонента с данными.

```driver.update()``` синхронизирует *снапшот* компонента *enzyme* с деревом компонента *react*. ```Update``` следует запускать, если что-то внешнее обновляет стейт компонента.

<a href="https://airbnb.io/enzyme/">Документация по enzyme</a>
