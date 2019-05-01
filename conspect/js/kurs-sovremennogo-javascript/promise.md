---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Promise
seoDescription: Использования объекта Promise для рефакторинга паттерна "Callback Hell"
seoKeywords: js, promise, resolve, reject
date: 2018-09-22 14:00:00
---
# Promise

Объект **Promise** служит удобной оберткой для обслуживания асинхронного функционала. Основное назначение Promise создавать цепочки вызовов асинхронных функций.

Структура и использование:

```js
const myPromise = new Promise((resolve, reject) => {
    // выполнение асинхронного кода...
    // resolve(someValue); // вернуть результат как Promise
    // reject("причина ошибки"); // если произошла ошибка
});

myPromise
    .then((data) => {
        return myNextPromise(data);
    })
    .then((data2) => {
        return myNextPromise2(data2);
    })
    .then((data3) => {
        return myNextPromise3(data3);
    })
    .catch(); // будет вызван в случае ошибки
```

Перепишем код примера из предыдущей статьи "Callback Hell" в более удобную форму с помощью промисов.

Исходный вариант:

```js
onGetUserInfo(1, (userData) => {
    onGetPermissions(userData, (permissions, userData) => {
        makePost(permissions, userData);
    });
});
```

Рефактор:

```js
getUserInfo(1)
    .then(userData => { return getPermissions(userData); })
    .then(([permissions, userData]) => { makePost(permissions, userData); })
    .catch(console.log("err"));
```

Полый код рефакторинга:

```js
const getUserInfo = id => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userData = {
                id: 1,
                name: "test"
            }
            resolve(userData);
        },
        100);
    });
};

const getPermissions = userData => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const permissions = {
                write: "y",
                read: "y"
            };
            resolve([permissions, userData]);
        },
        50);
    });
};

const makePost = (permissions, userData) => {
    if (permissions.write === "y") {
        console.log(`Пользователь ${userData.name} написал пост`);
    }
}


// клиентский код
getUserInfo(1)
    .then(userData => {
        return getPermissions(userData);
    })
    .then(([permissions, userData]) => {
        makePost(permissions, userData);
    })
    .catch(console.log("err"));
```

В данном примере мы рассмотрели как использовать объекты Promise для построения цепочки вызовов асинхронных функций и избавились с помощью них от паттерна "Callback hell".