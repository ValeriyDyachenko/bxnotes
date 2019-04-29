---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Фасад
seoDescription: Обзор паттерна "Фасад" и его реализация в JavaScript
seoKeywords: js, фасад, паттерны
date: 2018-22-09 09:00:00
---
# Фасад

Фасад относится к структурным паттернам.

Назначение данного паттерна предоставить интерфейс, содержащий логику работы с несколькими подсистемами.

Шаблон паттерна фасад выглядит примерно так:

```js
function facadePattern(param) {
    object1 = new Object1();
    object2 = new Object2();
    object3 = new Object3();
    // some logic...
}
```

Принцип данного паттерна в том, чтобы обернуть некоторую структуру в одну функцию, освободив клиентский код от работы с деталями.