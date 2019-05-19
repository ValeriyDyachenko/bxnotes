---
layout: post.njk
tags: [post, postInConspect:functional-php, postInSubject:php, postInSection:lang]
conspect: functional-php
section: lang
subject: php
title: Какую версию PHP использовать?
seoDescription: О выборе версии PHP и тонкостях неявного преобразования типов.
seoKeywords: php, сlosure, strict_types, declare
date: 2017-11-08 01:00:00
---
# Какую версию PHP использовать?

Функциональный стиль можно использовать с версии *5.3*, когда появился класс `Closure`. Но лучше использовать *PHP7*, он быстрее, современнее и позволяет *типизировать* данные.

*PHP*, являясь динамическим языком, всегда пытается конвертировать значения неверного типа данных к ожидаемому скалярному типу.

```php
function increment($i) {
  return ++$i;
}
echo increment('a'); //выведет b
```

Подобного неявного приведения аргументов можно избежать включив режим строгого типирования, указав вверху файла:

```php
<?php
declare(strict_types = 1);
```