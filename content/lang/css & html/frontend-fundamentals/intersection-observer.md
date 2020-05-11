---
title:  Intersection Observer
description: Intersection Observer
keywords: Intersection Observer
date: 2019-12-03 00:02:00
origin: <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API" target="_blank">MDN</a>
---

Области применения:

* Отложенная загрузка контента.
* Бесконечный скролл.
* Отчет о показе рекламы.
* Показ "дорогой" анимации.

Пример использования:

```javascript
var intersectionObserver = new IntersectionObserver(function(entries) {
  if (entries[0].intersectionRatio <= 0) return;
  loadItems(10);
});

intersectionObserver.observe(document.querySelector('.scrollerFooter'));
```