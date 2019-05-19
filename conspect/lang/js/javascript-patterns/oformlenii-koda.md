---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Оформлении кода
seoDescription: Общепринятые правила оформления кода в JavaScript.
seoKeywords: js, good practices
date: 2017-11-14 11:00:00
---
# Оформлении кода

## Горизонтальные отступы

```js
function outer(a, b) {
    var c = 1,
        d = 2,
        inner;
    if (a > b) {
        inner = function () {
            return {
                r: c - d
            };
        };
    } else {
        inner = function () {
            return {
                r: c + d
            };
        };
    }
    return inner;
}
```

## Фигурные скобки

```js
if (true) {
  alert(1);
} else {
  alert(2);
}
```

Фигурная скобка на линии оператора:

```js
function func() {
    return {
        name: "Batman"
    };
}
```

## Пробелы 

Для улучшения читаемости:

```js
var d = 0,
    a = b + 1;
if (a && b && c) {
    d = a % c;
    a += d;
}
```

## API Docs

```js
/**
 * Reverse a string
 *
 * @param {String} input String to reverse
 * @return {String} The reversed string
 */
var reverse = function (input) {
    // ...
    return output;
};
```

## Именование

### Camel Case 

```js
function MyConstructor() {...} // функция с конструктором
function myFunction() {...}
```

### Константы 

```js
var MAX_VALUE = 299;
```

### Приватные переменные

```js
_private = "hidden";
```