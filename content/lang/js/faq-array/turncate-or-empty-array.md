---
title:  Сократить массив
description: Как быстро сократить массив JavaScript?
keywords: js, array, clear, turncate
date: 2019-07-07 00:00:00
origin: <a rel="nofollow" href="https://www.freecodecamp.org/news/9-neat-javascript-tricks-e2742f2735c3/" target="_blank">Learn these neat JavaScript tricks in less than 5 minutes</a>
---

Используйте свойство ```length```, чтобы быстро очисть или сократить массив.

```js
const arr = [11, 22, 33, 44, 55, 66];
arr.length = 3 // [11, 22, 33]
arr.length = 0 // []
```
