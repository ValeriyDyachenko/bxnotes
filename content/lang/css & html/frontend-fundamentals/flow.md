---
title: Поток
seoDescription: Поток
seoKeywords: Поток
date: 2019-12-03 00:10:00
origin: <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model" target="_blank">Box Model</a>, <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout" target="_blank">Css layout</a>
---
# Поток

Расположение контента может быть блочным (следующий блок располагается под предыдущим), или строчным (блоки выстраиваются в линию).

По умолчанию, браузер располагает элементы в нормальном потоке, это поведение можно изменять с помощью css стилей, но верстать следует так, чтобы верстка работала на вас - то есть, чтобы ожидаемое поведение соответствовало нормальному и правки достигались минимальными средствами.

По умолчанию свойство ```display``` имеет значение ```static```, и на такой элемент не действуют ```top```, ```right```, ```bottom```, ```left``` и ```z-index```.


## Управление потоком

`Css` свойства, влияющие на положение элемента в потоке:

* **display** (block, inline, inline-block, flex, grid)
* **float** (left, right, none, inherit)
* **position** (relative, absolute, fixed, или sticky).
* **Table layout** - свойства для разметки таблиц могут быть использованы и для нетабличных элеметов, с помощью ```display: table``` и соответствующих свойств.
* **column-count** - располагает контент в колонки, как в газете, например ```column-count: 3``` подробнее: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns

## Абсолютная позиция

Абсолютно позиционированный элемент выпадает из потока (как бы переносится на отдельный слой, и остальные элементы страницы располагаются, как будто абсолютного блока совсем нет, то есть прямо "за ним").

По умолчанию, абсолютно позиционированный блок находится в месте, где бы находился в нормальном потоке. Если у абсолютно позиционированного элемента указать свойства ```top```, ```left```, ```right``` или ```left```, то он выровнется по краю ближайшему родителю, у которого d```isplay: relative```, а если такого родителя нет, то по *viewport*.

## Box Model (standard)

* **Content** - контент (*width*, *height* - применяется к контентному боксу)
* **Padding** - отступ от бордера
* **Border** - рамка
* **Margin** - отступ снаружи рамки

## Box Model (alternative)

```box-sizing: border-box;``` - данное свойство включает альтернативную модель расчета шарины и высоты бокса не по контенту, а от границы, включая ширину границы.

Включить альтернативную box model для всего документа можно так:

```css
html {
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: inherit;
}
```

## Свойства border

Доступны различные уровни избирательности для настройки бордера:

```css
  /* все границы */
  border: 1px solid red;

  /* выборочно */
  border-top: 1px solid red;
  border-right: 2px solid red;
  border-bottom: 1px dotted green;
  border-left: none

  /* еще свойства: */
  border-width
  border-style
  border-color

  border-top-width
  border-top-style
  border-top-color
  border-right-width
  border-right-style
  border-right-color
  border-bottom-width
  border-bottom-style
  border-bottom-color
  border-left-width
  border-left-style
  border-left-color

  border-top-left-radius
  border-top-right-radius
  border-bottom-left-radius
  border-bottom-right-radius
```