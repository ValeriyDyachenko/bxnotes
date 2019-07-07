---
title: Удалить дубли из массива
seoDescription: Как удалить дубли из массива JavaScript?
seoKeywords: js, array
date: 2019-07-07 00:02:00
origin: <a rel="nofollow" href="https://www.freecodecamp.org/news/9-neat-javascript-tricks-e2742f2735c3/" target="_blank">Learn these neat JavaScript tricks in less than 5 minutes</a>
---
# Удалить дубли из массива

Используйте ```new Set()``` и ```spread``` оператор.

```js
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]); // [42, "foo", true]
```
