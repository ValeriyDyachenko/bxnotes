---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Наблюдатель
seoDescription: Обзор паттерна "Наблюдатель" и его реализация в JavaScript.
seoKeywords: js, наблюдатель, паттерны
---
# Наблюдатель

Наблюдатель относится к поведенческим паттернам.

Объекты желающие подписаться на событие называются наблюдателями. Они должны реализовывать общий интерфейс, который будет запущен в нужное время.

Объект который сообщает наблюдателям о наступлении интересующих их событий называется издателем. Издатель содержит хеш таблицу, в которой находятся ссылки на наблюдателей и типы событий, на которые наблюдатели подписаны. У издателя есть методы позволяющие наблюдателям подписываться и отписываться от событий.

Так как издатель содержит хеш таблицу с типами событий и наблюдателями, то будет правильным шагом реализовать соответствующий тип данных для работы с такой таблицей. Нам нужен тип данных, хранящий структуру в виде объекта, ключами которого являются названия события, а значениями массивы ссылок на объекты наблюдателей. Еще наш тип данных должен иметь методы для добавления и удаления подписок из своей хеш структуры. Реализация подобной структуры данных избавит класс издателя от реализации логики, которая к нему напрямую не относится.

```js
class MapListeners {
    constructor() {
        // в свойстве m будет храниться хэш карта вида:
        // {eventName: [object1, object2, ...], eventName2: [...], ...}
        this.m = {};
    }
    add(listener, event) {
        if (this.m.hasOwnProperty(event)) {
            this.m[event].push(listener);
        } else {
            this.m[event] = [];
            this.m[event].push(listener);
        }
    }
    remove(listener, event) {
        if (this.m.hasOwnProperty(event)) {
            this.m[event].forEach(l => {
                if (l === listener) {
                    this.m[event].splice(this.m[event].indexOf(listener), 1);
                    if (Object.keys(this.m[event]).length == 0) {
                        delete this.m[event];
                    }
                }
            });
        }
    }
    get() {
        return this.m;
    }
}
```

С помощью нашей новой структуры данных реализуем код издателя.

```js
class Publisher {
    constructor() {
        this.mapList = new MapListeners();
    }
    subscribe(listener, event) {
        this.mapList.add(listener, event);
    }
    unscribe(listener, event) {
        this.mapList.remove(listener, event);
    }
    notify(event, data) {
        if (this.mapList.get()[event]) {
            this.mapList.get()[event].forEach(listener => {
                listener.update(data);
            });
        }
    }
}
```

Теперь с помощью данных классов и паттерна "Наблюдатель" реализуем задачу - вывод в консоль определенных событий. В программе будет выводиться последовательность чисел от 1 до 12, при этом в лог будут выводиться сообщения о том, что число положительное, отрицательное и больше ли оно пяти. В процессе выполнения программы мы динамически отпишем одно из событий. Создадим для этого несколько подписчиков. Подписчик должен обязательно реализовать метод update():

```js
class OddLogger {
    update(data) {
        console.log(data + " нечетное число");
    }
}

class EvenLogger {
    update(data) {
        console.log(data + " четное число");
    }
}

class MoreThanFiveLogger {
    update(data) {
        console.log(data + " больше пяти");
    }
}
```

Осталось написать непосредственно код приложения:

```js
// инициируем издателя
const publisher = new Publisher();

// инициируем подписчиков
const oddLogger = new OddLogger();
const evenLogger = new EvenLogger();
const moreThanFiveLogger = new MoreThanFiveLogger();

// подписываем подписчиков на события
publisher.subscribe(oddLogger, "odd");
publisher.subscribe(evenLogger, "even");
publisher.subscribe(moreThanFiveLogger, "moreThanFive");

// выведем числа от 1 до 12
// обновляя информацию для подписчиков
// после 10 удалим одну из подписок
for (let i = 1; i <= 12; i++) {
    if (i % 2 === 0 && i > 0) {
        publisher.notify("even", i);
    } else {
        publisher.notify("odd", i);
    }
    if (i > 10) {
        publisher.unscribe(moreThanFiveLogger, "moreThanFive");
    }
    if (i > 5) {
        publisher.notify("moreThanFive", i);
    }
}
```

Таким образом можно подвести итог, что суть поведенческого паттерна "Наблюдатель" в том, чтобы в определенный момент иметь возможность запустить общий метод у ряда объектов. Что за объекты будут в этом участвовать решают сами объекты. Для этого им необходимо подписаться на нужное событие и дождаться, когда соответствующее событие наступит в процессе выполнения программы.
