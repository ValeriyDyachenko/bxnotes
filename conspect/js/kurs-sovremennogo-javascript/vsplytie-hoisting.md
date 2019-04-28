---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Всплытие. Hoisting
seoDescription: Процесс всплытия переменных в JavaScript.
seoKeywords: hoisting
date: 2018-22-09 01:00:00
---
# Всплытие. Hoisting.

Говоря формально, объявление переменных и функций в исполняемом контексте, всплывает наверх контекста.

```js
function foo() {
  console.log(x) //undefined
  var x = "value";
}
```

Это похоже на то, как если бы переменная `x` в этом примере была объявлена наверху функции:

```js
function foo() {
  var x;
  console.log(x) //undefined
  x = "value";
}
```

Из-за данного сходства, такое поведение называют всплытием. Всплытие, это не то, что происходит на самом деле, на низком уровне, а лишь понятный способ объяснить происходящее.

Всплывают не все объявления. Например, это не сработает с `let` и `const`.

Всплытие позволяет запускать объявленные функции выше, чем они объявлены в контексте. Рассмотрим еще несколько примеров.

```js
console.log(foo()); 
//выведет "bar", хотя сама функция определена ниже

function foo() {
  return "bar";
}

console.log(varBaz()); 
// такой вариант вызовет ошибку, т.к. varBaz, 
// до присвоения значения в коде, имеет значение undefined

var varBaz = function() {
  return "varBaz";
}

console.log(varBaz()); 
//выведет "varBaz"
```