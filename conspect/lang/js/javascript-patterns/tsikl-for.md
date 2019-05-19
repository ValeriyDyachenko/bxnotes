---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Цикл For
seoDescription: Итерация массивов и подобных массивам объектов, таких как arguments и HTMLCollection, способы применения и микро-оптимизация.
seoKeywords: js, for, arguments, HTMLCollection
date: 2017-11-14 06:00:00
---
# Цикл For

С помощью цикла `for` можно обходить массивы и подобные массивам объекты, такие как `arguments` и `HTMLCollection`.

```js
// обычное использование цикла for
for (var i = 0; i < myarray.length; i++) {
 // действия с myarray[i]
}
```

Длину массива лучше кешировать, для избегания повторных вычислений в операторе `for`:

```js
for (var i = 0, max = myarray.length; i < max; i++) {
 // ...
}
```

Цикл `for` можно микро-оптимизировать. Для этого доступно несколько вариантов:
+ Использовать одной переменной меньше (без максимальной)
+ Считать до 0, обычно это быстрее

Первый вариант микро-оптимизации:

```js
var i, myarray = [];
for (i = myarray.length; i--;) {
 // ...
}
```

Второй вариант микро-оптимизации с использование цикла `while`:

```js
var myarray = [],
 i = myarray.length;
while (i--) {
 // ...
}
```