---
title:  Виды верстки
description: Виды верстки
keywords: Виды верстки
date: 2019-12-03 00:11:00
origin: <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries" target="_blank">media queries</a>, <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design" target="_blank">responsive design</a>
---

## Фиксированная

Ширина верстки статична

## Резиновая

Контент находится в блоке динамической ширины, которая зависит от ширины экрана

## Адаптивная

Верстка с использованием медиа запросов, для адаптации под различные устройства

## Сетка
Адаптивная верстка с использованием сетки (различное число колонок в зависимости от брейкпоинтов, по типу bootstrap)

## Multiple-column layout

Колоночная https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Multiple-column_Layout

```css
/* пример multiple-column layout */
.container {
  column-width: 250px;
  column-gap: 20px;
}

.card {
  break-inside: avoid;
  page-break-inside: avoid;
  background-color: rgb(207, 232, 220);
  border: 2px solid rgb(79, 185, 227);
  padding: 10px;
  margin: 0 0 1em 0;
}
```

## Flexbox

https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox

## Grid

https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids


## Медиа запросы

Шаблон медиа запроса:

```css
@media media-type and (media-feature-rule) {
  /* CSS rules go here */
}
```

### Media types

* all
* print
* screen
* speech

### Orientation

* landscape
* portrait

## Подходы к адаптивной верстке

*mobile first responsive design* - проектирование начинается с мобильной версии
*desktop first responsive design* - проектирование начинается с десктопной версии