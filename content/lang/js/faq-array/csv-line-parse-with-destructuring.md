---
title: Спарсить строку в переменные
seoDescription: Как спарсить строку в переменные JavaScript?
seoKeywords: js, array, destructuring
date: 2019-07-07 00:01:00
origin: <a rel="nofollow" href="https://www.freecodecamp.org/news/9-neat-javascript-tricks-e2742f2735c3/" target="_blank">Learn these neat JavaScript tricks in less than 5 minutes</a>
---
# Спарсить строку в переменные

Разбить строку на массив с помощью `String.prototype.split()`, деструктурировать массив в переменные.

```js
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');

console.log(country); // US
console.log(state); // New York 
```
