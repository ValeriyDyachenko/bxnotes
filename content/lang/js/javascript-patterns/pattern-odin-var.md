---
title:  Паттерн один var
description: Использование паттерна единственного var для более наглядного и менее многословного объявления переменных.
keywords: js, var, single, pattern
date: 2017-11-14 05:00:00
---

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