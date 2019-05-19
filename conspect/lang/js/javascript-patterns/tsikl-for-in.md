---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Цикл for in
seoDescription: Обход объектов циклом for-in в JavaScript и использование метода hasOwnProperty() для безопасного обхода.
seoKeywords: js, for-in, hasOwnProperty()
date: 2017-11-14 07:00:00
---
# Цикл for in

Цикл `for in` применяется для обхода объектов, которые не являются массивами. Обход `for in` так же называется `enumeration`.

Очень важно использовать метод `hasOwnProperty()` во время обхода свойств объекта, чтобы игнорировать свойства, которые получены по цепочке прототипа.

Рассмотрим пример:

```js
// объект
var man = {
 hands: 2,
 legs: 2,
 heads: 1
};

// кто-то добавил метод всем объектам
if (typeof Object.prototype.clone === "undefined") {
 Object.prototype.clone = function () {};
}

// 1.
// for-in loop
for (var i in man) {
 if (man.hasOwnProperty(i)) { // filter
 console.log(i, ":", man[i]);
 }
}
/*
результат в консоли:
hands : 2
legs : 2
heads : 1
*/

// 2.
// antipattern:
// for-in loop без проверки hasOwnProperty()
for (var i in man) {
 console.log(i, ":", man[i]);
}
/*
результат в консоли
hands : 2
legs : 2
heads : 1
clone:
*/
```

Еще одним примером использования `hasOwnProperty()`, является вызов этого метода из `Object.prototype`:

```js
for (var i in man) {
  if (Object.prototype.hasOwnProperty.call(man, i)) { // filter
    console.log(i, ":", man[i]);
  }
}
```

Это позволит избежать коллизии имен в случае, если объект man имеет собственное свойство `hasOwnProperty()`.