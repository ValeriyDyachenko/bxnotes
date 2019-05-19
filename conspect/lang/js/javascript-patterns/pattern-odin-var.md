---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Паттерн один var
seoDescription: Использование паттерна единственного var для более наглядного и менее многословного объявления переменных.
seoKeywords: js, var, single, pattern
date: 2017-11-14 05:00:00
---
# Паттерн один var

Паттерн единственного `var` выглядит следующим образом:

```js
function func() {
 var a = 1,
     b = 2,
     sum = a + b,
     myobject = {},
     i,
     j;
 // код...
}
```

В момент декларирования переменных может совершаться некоторая актуальная работа:

```js
function updateElement() {
 var el = document.getElementById("result"),
     style = el.style;
 // код...
}
```