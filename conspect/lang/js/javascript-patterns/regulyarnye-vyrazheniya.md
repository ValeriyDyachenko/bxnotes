---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Регулярные выражения
seoDescription: Создание регулярного выражения с помощью литеральной записи и конструктора в JavaScript.
seoKeywords: js, regex
date: 2017-11-14 16:00:00
---
# Регулярные выражения

В *js* можно создать регулярное выражение с помощью:

+ конструктора new RegExp()
+ литерального выражение

```js
// литерал
var re = /\\/gm;

// конструктор
var re = new RegExp("\\\\", "gm");
```

Литеральная запись лаконичнее, по этому чаще используют её. Паттерн литерала имеет следующий вид:

```js
var re = /pattern/gmi;
```

символ | значение
--- | ---
g | глобальное сопоставление
m | мультистроковость
i | нечувствительность к регистру

У строкового объекта есть метод `String.prototype.replace()`, который позволяет делать следующее:

```js
var no_letters = "abc123XYZ".replace(/[a-z]/gi, "");
console.log(no_letters); // 123
```