---
title: Извлечь вложенное свойство объекта
seoDescription: Как безопасно извлечь вложенное свойство объекта в JavaScript?
seoKeywords: js, object
date: 2019-07-07 21:00:00
origin: <a rel="nofollow" href="https://codeburst.io/accessing-nested-objects-in-javascript-c2ed249fe576" target="_blank">Accessing Nested Objects in JavaScript</a>
---
# Извлечь вложенное свойство объекта

> Как извлечь вложенное свойство объекта, без риска получить ошибку *Uncaught TypeError: Cannot read property 'bar' of undefined*.

Несколько способов решения:

1. Проверять предыдущее значение на *undefined* с оператором ```&&```:

```js
const info = data && data.user && data.user.personalInfo
```

2. Создавать страховочный объект, если значение *undefined*:

```js
const info = ((data || {}).user || {}).personalInfo
```

3. Использовать хелпер, или библиотеку:

```js
const getNestedObject = (nestedObj, pathArr) => 
  pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined,
    nestedObj
  );

const info = getNestedObject(data, ['user', 'personalInfo']);
```

4. Proposal Optional Chaining. На момент написания поста (7 июля 2019) &mdash; stage 2:

```js
const info = data?.user?.personalInfo;
```
