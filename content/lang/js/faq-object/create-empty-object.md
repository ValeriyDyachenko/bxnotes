---
title:  Создать чистый объект
description: Как создать чистый объект в JavaScript без прототипа?
keywords: js, object, create
date: 2019-07-07 00:00:00
origin: <a rel="nofollow" href="https://www.freecodecamp.org/news/9-neat-javascript-tricks-e2742f2735c3/" target="_blank">Learn these neat JavaScript tricks in less than 5 minutes</a>
---

Используйте `Object.create(null)`, чтобы создать чистый объект без конструктора и унаследованных методов.

```js
const pureObject = Object.create(null);

console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```
