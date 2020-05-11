---
title:  Стратегии загрузки шрифтов
description: Стратегии загрузки шрифтов
keywords: Стратегии загрузки шрифтов
date: 2019-12-03 00:04:00
origin: <a rel="nofollow" href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization" target="_blank">MDN</a>, <a rel="nofollow" href="https://m.habr.com/ru/company/ruvds/blog/470870/" target="_blank">habr</a>
---

## Форматы

Использовать все форматы для корректного отображения в разных любых браузерах:

* `WOFF 2.0` в тех браузерах, которые его поддерживают.
* `TTF` в устаревших браузерах Android (для версий до 4.4).
* `EOT` для поддержки устаревших версий IE (до IE9).

## Сжатие

Сжатие шрифтов (`gzip`, встроенное сжатие `WOFF`, пользовательские алгоритмы)

## Type hint preload

Preload загрузит шрифт в приоритетном режиме
```html
<link rel="preload" href="myfont.woff2" as="font" type="font/woff2" crossorigin>
```

## Font-display

Дескриптор ```font-display``` определяет то, как шрифт, подключенный через font-face будет отображаться в зависимости от того, загрузился ли он и готов ли к использованию. Возможные значения:

* `auto` - Стратегию загрузки шрифта определяет пользовательский агент.
* `block` - Для шрифта задается короткий период блокировки и бесконечный период подмены.
* `swap` - Для шрифта не задается период блокировки и задается бесконечный период подмены.
* `fallback` - Для шрифта задается очень короткий период блокировки и короткий период подмены.
* `optional` - Для шрифта задается очень короткий период блокировки и не задается период подмены. Это отличная стратегия, чтобы скачать шрифт на первом хите и использовать на последующих страницах.


### Подробнее про периоды блокировки, подмены и отказа:

**Период блокировки шрифта** (Font block period) - Если шрифт не загружен, любой элемент, который пытается его использовать, должен быть отрендерен с невидимым запасным шрифтом. Если за это время шрифт успешно загружается, то он используется, как обычно.

**Период подмены шрифта** (Font swap period) - Если шрифт не загружен, любой элемент, который пытается его использовать, должен быть отрендерен запасным шрифтом. Если за это время шрифт успешно загружается, то он используется, как обычно.

**Период отказа шрифта** (Font failure period) - Если шрифт не загружен, пользовательский агент воспринимает это как неудачную загрузку и использует запасной шрифт.

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome.woff2') format('woff2'), 
       url('/fonts/awesome.woff') format('woff'),
       url('/fonts/awesome.ttf') format('ttf'),
       url('/fonts/awesome.eot') format('eot');
}

@font-face {
  font-family: 'Awesome Font';
  font-style: italic;
  font-weight: 400;
  src: local('Awesome Font Italic'),
       url('/fonts/awesome-i.woff2') format('woff2'), 
       url('/fonts/awesome-i.woff') format('woff'),
       url('/fonts/awesome-i.ttf') format('ttf'),
       url('/fonts/awesome-i.eot') format('eot');
}

/* local() позволяет ссылаться на шрифт и загружать его, а также использовать шрифты, установленные на устройстве пользователя */
```

## Unicode range

Unicode range - мы можем создать разделенный запятыми список значений диапазона. Каждое из них может быть указано в одной из трех форм:

* **Одна кодовая точка** (например, U+416)
* **Диапазон интервала** (например, U+400-4ff). Обозначает начальную и конечную кодовые точки диапазона.
* **Диапазон Wildcard** (например, U+4??): '?' Символы обозначают любое шестандцатиричное число.

```css
/* разделение семейства Awesome Font на латинский и японский поднаборы, которые браузер при необходимости может скачать */

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), 
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('ttf'),
       url('/fonts/awesome-l.eot') format('eot');
  unicode-range: U+000-5FF; /* Latin glyphs */
}

@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-jp.woff2') format('woff2'), 
       url('/fonts/awesome-jp.woff') format('woff'),
       url('/fonts/awesome-jp.ttf') format('ttf'),
       url('/fonts/awesome-jp.eot') format('eot');
  unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
}
```

## Font loading API

Возможно точно точное управление жизненными циклами шрифотов с помощью JS и font loading api (либо кроссбраузерной библиотеки https://github.com/bramstein/fontfaceobserver):

```javascript
var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
  style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
});

font.load(); // don't wait for render tree, initiate immediate fetch!

font.ready().then(function() {
  // apply the font (which may rerender text and cause a page reflow)
  // once the font has finished downloading
  document.fonts.add(font);
  document.body.style.fontFamily = "Awesome Font, serif";

  // OR... by default content is hidden, and rendered once font is available
  var content = document.getElementById("content");
  content.style.visibility = "visible";

  // OR... apply own render strategy here... 
});
```

## Кеширование

Укажите правила для кеша и проверки актуальности. Шрифты - это статичные ресурсы, которые редко обновляются. Убедитесь, что сервер отправляет маркер подтверждения и директиву max-age с максимально долгим периодом. Благодаря этому шрифт может использоваться повторно на разных страницах.

## Алгоритм браузера по установке шрифта

1) Браузер читает разметку страницы и определяет, какие варианты шрифтов нужны для отрисовки текста.
2) Браузер проверяет, не установлены ли нужные шрифты на устройстве.
3) Если файла нет на устройстве, браузер читает список внешних расположений:
4) Если формат указан, перед скачивание браузер проверяется, поддерживается ли он. В случае отрицательного ответа программа переходит к следующему варианту.
5) Если указание на формат отсутствует, браузер скачивает ресурс.