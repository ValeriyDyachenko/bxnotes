---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Primitive wrapper objects
seoDescription: Обертки примитивов в JavaScript.
seoKeywords: js, primitive, primitive wrapper objects
date: 2017-11-14 17:00:00
---
# Primitive wrapper objects

В *JavaScript* есть 5 типов примитивов: `number`, `string`, `boolean`, `null` и `undefined`. При этом типы `number`, `string` и `boolean` имеют так называемые объекты обертки. Объекты обертки могут быть созданы с помощью конструкторов `Number()`, `String()` и `Boolean()`.

```js
// числовой примитив
var n = 100;
console.log(typeof n); // "number"

// числовой объект
var nobj = new Number(100);
console.log(typeof nobj); // "object"
```

Объекты обертки имеют специальные методы, но для того чтобы ими пользоваться не обязательно создавать объект с помощью конструктора. Если вызвать метод у примитива, то он на время будет сконвертирован в объект и метод успешно выполнится.

```js
var s = "hello";
console.log(s.toUpperCase()); // "HELLO"
"monkey".slice(3, 6); // "key"
(22 / 7).toPrecision(3); // "3.14"
```

Так как примитивы могут действовать как объекты нет нужды создавать их как объекты. Единственной причиной для этого может стать необходимость добавить в примитив свойство.

```js
var test = "test";
test.foo = "bar";
console.log(test.foo); // undefined

var test = new String("test");
test.foo = "bar";
console.log(test.foo); "bar"
```

Если запустить функцию без `new`, то вернется значение, сконвертированное в примитив.

```js
typeof Number(1); // "number"
typeof Number("1"); // "number"
typeof Number(new Number()); // "number"
typeof String(1); // "string"
typeof Boolean(1); // "boolean"
```