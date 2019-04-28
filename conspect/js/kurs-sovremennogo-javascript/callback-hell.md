---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Callback Hell
seoDescription: Что такое Callback Hell. История известного антипаттерна.
seoKeywords: js, callback hell
---
# Callback Hell

Callback Hell - это паттерн для управления конкурирующими (асинхронными) запросами, который обеспечивает последовательность их выполнения.

Асинхронная функция в паттерне Callback Hell не может возвращать значение, так как такие функции выполняются с задержкой и позже кода, который за ними последует. Вместо этого они принимают коллбек, который будет запущен, когда функция выполнит свою работу. Как правило таких коллбеков два - один для случая успешного выполнения, а второй для обработки возникших ошибок. Рассмотрим упрощенный пример:

```js
function onGetUserInfo(id, handler) {
    setTimeout(() => {
        const userData = {
            id: 1,
            name: "test"
        }
        handler(userData);
    },
    100);
}

function onGetPermissions(userData, handler) {
    setTimeout(() => {
        const permissions = {
            write: "y",
            read: "y"
        }
        handler(permissions, userData);
    },
    50);
}

function makePost(permissions, userData) {
    if (permissions.write === "y") {
        console.log(`Пользователь ${userData.name} написал пост`);
    }
}


// реализация паттерна Callback Hell
onGetUserInfo(1, (userData) => {
    onGetPermissions(userData, (permissions, userData) => {
        makePost(permissions, userData); // будет выведено "Пользователь test написал пост"
    });
});
```

Можно заметить, что паттерн "Callback Hell" не удобен для восприятия, из-за этого он и получил свое название. Чем больше уровней вложенности коллбеков, тем труднее понять что происходит. Для того, чтобы предложить более удобную форму записи и облегчить жизнь программистов в ES6 был реализован специальный объект Promise.