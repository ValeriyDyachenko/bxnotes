---
layout: post.njk
tags: [post, postInConspect:javascript-patterns]
conspect: javascript-patterns
section: lang
subject: js
title: JSON
seoDescription: Синтаксис, парсинг, конвертация объекта в строку в JavaScript.
seoKeywords: js, json
date: 2017-11-14 15:00:00
---
# JSON

## Синтаксис

```js
{"name": "value", "some": [1, 2, 3]}
```

## Парсинг

```js
// строка
var jstr = '{"mykey": "my value"}';

// АНТИПАТТЕРН
var data = eval('(' + jstr + ')');
console.log(data.mykey); // "my value"

// правильно
var data = JSON.parse(jstr);
console.log(data.mykey); // "my value"

//JQuery
var data = $.parseJSON(jstr);
console.log(data.mykey); // "my value"
```

## Конвертация объекта в строку

```js
var dog = {
    name: "Fido",
    dob: new Date(),
    legs: [1, 2, 3, 4]
};

var jsonstr = JSON.stringify(dog);
// jsonstr теперь:
// {"name":"Fido","dob":"2010-04-11T22:36:22.436Z","legs":[1,2,3,4]}
```