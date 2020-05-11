---
title:  Доступность
description: Доступность
keywords: Доступность
date: 2019-12-03 00:13:00
origin: <a rel="nofollow" href="https://medium.com/@ABatickaya/%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-html-%D0%BD%D0%B5-%D0%B7%D0%B0%D0%B1%D1%8B%D0%B2%D0%B0%D1%8F-%D0%BE-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE%D1%81%D1%82%D0%B8-9ffbf97ecbe7" target="_blank">medium</a>, <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML" target="_blank">MDN</a>, <a rel="nofollow" href="https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9" target="_blank">medium</a>
---

Доступность дает возможность пользоваться сайтом не только мышью, но и клавиатурой, и делает сайт работоспособным на различных устройствах (мобильный, планшет, читалки и других устройствах). И в различных контекстах (например, текстовые браузеры, аудио браузеры, плагины). Сайт должен быть доступен для всех.

## Lang

Всегда указывайте язык документа:

```html
<html lang="ru">
    …
</html>
```

### Lang для кастомного тега

Если внутри документа встречаются несколько языков, то вы можете использовать атрибут **lang** для отдельных тегов:

```html
<p>В воздухе витало <i lang="fr" class="idiomatic">je ne sais quoi</i>.</p>
```

## Hidden

Можно прятать контент от экранных читалок с помощью атрибута `hidden`.

Вы можете обеспечить поддержку старых браузеров, просто добавив в CSS фоллбэк.

```css
[hidden] {
   display: none;
}
```

## Alt

Используйте ```alt``` для описания картинок. Если картинка декоративная, используйте пустой ```alt```.

Пустой alt означает, что изображение является ключевой частью контента, но для него нет текстового эквивалента.

Пустая строка означает, что это не ключевой контент и специфический браузер имеет право его не отображать.

```html
<img src="decorative_image.jpg" alt="">
```

## Button

Используйте элемент ```button``` для кнопок. Преимущества:

1) Возможность фокусировки
2) Кликабельность (мышкой или клавиатурой)
3) Экранные читалки идентифицируют их как кнопки!

## Заголовки

Структурирование разметки с помощью заголовков (```h1```-```h6```). Некоторые читалки поддерживают перемещение по заголовкам. Заголовки нужны для правильного озвучивания структуры и навигации.

## Тематические секции (семантические теги)

Подробнее - https://www.w3.org/WAI/tutorials/page-structure/sections/

Нужно размечать тематические секции при помощи HTML5 тегов (```<article>```, ```<aside>```, ```<nav>```, ```<section>```). 

Секционные элементы (```<section>```) не являются прямой заменой элементу ```<div>```. Используйте их для разметки больших кусков связанного контента, отличающегося от остального контента на странице. Это поможет различным устройствам, а так же поисковым роботам правильно "видеть" сайт.

## ARIA-атрибут role

Для более старых браузеров или секций, не имеющих для обозначения специфических тегов, например, поиска.

## Main, header и footer ориентиры

Оборачивая основной контент сайта в ориентиры, вы позволяете пользователям переместиться к нему при помощи горячих клавиш. 

Дополнительные атрибуты `role` важны только для старых браузеров

## Fieldset

Группируйте элементы при помощи ```<fieldset>``` если у вас есть необходимость связать элементы в группу и добавляйте лейбл для этой группы при помощи ```<legend>```:

```html
<form>
  <fieldset>
    <legend>Размеры рубашек</legend>
    <input type="radio" id="s" name="shirtsize" />
    <label for="s">S</label>  
    <input type="radio" id="m" name="shirtsize" />
    <label for="m">M</label>  
    <input type="radio" id="l" name="shirtsize" />
    <label for="l">L</label>   
  </fieldset>
</form>
```

## Tabindex

Элементы интерфейса доступны с клавиатуры (tab, enter, стрелки) - лучший способ для этого сразу использовать правильные элементы по назначению

Значение ```Tabindex``` 0 делает элемент доступным для фокусировки с клавиатуры.

Отрицательное значение ```Tabindex``` делает элемент доступным для фокусировки только для **JavaScript**. 

Значение ```Tabindex``` больше нуля меняет естественный порядок сортировки и считается антипаттерном.

```html
<h2 tabindex="0">A focusable heading</h2>
```

### Фокусировка с JS

```javascript
// Use the focus() method to set focus
function showModal() {
  ...
  var modal = document.getElementById('modal2');
  modal.focus();
  ...
}
```

Текущий сфокусированный элемент с JS:

```document.activeElement``` - получть текущий сфокусированный элемент.


### Фокусировка модального окна

```javascript
function showModal() {
  ...
  // Store the last focused element
  lastFocusedElement = document.activeElement;
  var modal = document.getElementById(modalID);
  modal.focus();
  ...
}

function removeModal() {
  ...
  // Return the focus to the last focused element
  lastFocusedElement.focus();
  ...
}
```

## Role="status"

Чтобы читалки озвучили изменение статуса, используйте ```role="status"```:

```html
<div class="message" role="status">Changes saved!</div>
```

## Полезные правила

* Текст без сокращений, расшифровка акронимов, без сленга.
* Ссылки и кнопки имеют понятное без контекста название
* Связывать ```label``` с ```input``` для корректного озвучивания скринридером
* Семантические теги в таблицах (```th```, ```caption```)
* Атрибуты тега ``img`` - ```alt```, ```aria-labelledby```, ```longdesc``` (адрес страницы с описанием картинки)
* ```Input``` с соответствующим типом, вместо самописных решений
* Расшифровка акронимов - ```<abbr title="Hypertext Markup Language">HTML</abbr>```
* **WAI-ARIA** - спецификация, написанная *W3C*, это дополнительные атрибуты (роли, свойства и состояния) не влияющие на отображение *HTML* документа, но дающие дополнительную информацию об элементе для *API устройств*, счытывающих данный документ.
* Использовать альтернативные формы события, например, ```onmousedown``` вместе с ```ontouchstart```.
* Не отключать масштабирование ```<meta name="viewport" content="user-scalable=no">```
* Цвета должны быть достаточно контрастными для комфортного чтения

## Дополнительная информация

### Common aria examples

http://heydonworks.com/practical_aria_examples/

### Components

https://frend.co/

### Patterns

https://a11yproject.com/patterns/

### WAI-ARIA

https://www.w3.org/TR/wai-aria-practices-1.1/

### Книга Inclusive Front-End Design Patterns

https://www.smashingmagazine.com/2016/10/inclusive-design-patterns/