---
title:  Деструктуризация аргумента функции
description: Деструктуризация аргумента в JavaScript. Паттерн RORO.
keywords: js
date: 2019-07-06 12:30:00
origin: <a rel="nofollow" href="https://www.freecodecamp.org/news/elegant-patterns-in-modern-javascript-roro-be01e7669cbd/" target="_blank">Elegant patterns in modern JavaScript RORO</a>
---

При **деструктуризации аргумента** иногда указывают *дефолтное значение*, это позволяет:

* гибко задать значения параметров по умолчанию, например, из заранее подготовленного объекта
* избежать ```Uncaught TypeError``` при вызове функции без аргументов

Преимущества функций с *деструктурированным аргументом*:

* понятные аргументы
* оператор ```spread```
* композиция

Разберем это подробнее на примерах.

## Понятные аргументы

Явные аргументы за счет ключей. Можно пропускать дефолтные значения:

```js
function findUsersByRole({
    role,
    withContactInfo = true,
    includeInactive
} = {}) {
    // do something
}

findUsersByRole({ role: 'Admin',  includeInactive: true })
```

## Оператор spread

Можно собрать аргументы в новый объект с помощью ```spread``` синтаксиса:

```js
const saveUser = ({  transaction,  ...userInfo }) => {
    console.log(userInfo)
}

saveUser({ transaction: 'INSERT',  name: 'Ivan', email: 'some@email.com' })
// выведет {name: 'Ivan', email: 'some@email.com'}
```

## Композиция

Использование объекта позволяет реализовать композицию функций:

```js
function prepareUserInfo(userInfo) {
  return pipe(validate, normalize, persist)(userInfo);
}

function pipe(...fns) {
  return param => fns.reduce((result, fn) => fn(result), param);
}

function validate({
  id,
  firstName,
  lastName,
  email = requiredParam(),
  username = requiredParam(),
  pass = requiredParam(),
  address,
  ...rest}
) {  
  // do some validation  return { 
  //   id, firstName, lastName, email, username, pass, address, ...rest 
  // }
}

function normalize({ email,  username,  ...rest }) {
  // do some normalizing  return { email, username, ...rest }
}

async function persist({ upsert = true, ...info }) {
  // save userInfo to the DB  return { operation, status, saved: info }
}

function requiredParam(param) {
  throw Error(`Required parameter, "${param}" is missing.`);
}
```
