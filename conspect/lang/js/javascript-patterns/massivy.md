---
title: Массивы
seoDescription: Работа с массивами в JavaScript, литеральная запись. Проверка на массив в ES5. Реализация собственной проверки является ли объект массивом.
seoKeywords: js, array
date: 2017-11-14 14:00:00
---
# Массивы

## Литеральная запись

Используйте литеральную форму записи для инициализации массива, это предпочтительный вариант.

```js
var a = ["itsy", "bitsy", "spider"];
console.log(typeof a); // "object", т.к. массив является объектом
console.log(a.constructor === Array); // true
```

## Проверка на массив

*ECMAScript 5* имеет метод `Array.isArray()`.

```js
Array.isArray([]); // true

// попытка обмануть не проходит
Array.isArray({
  length: 1,
  "0": 1,
  slice: function () {}
}); // false
```

## Реализация собственной проверки на массив

Реализация `Array.isArray` для версий младше *ES5*:

```js
if (typeof Array.isArray === "undefined") {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };
}
```