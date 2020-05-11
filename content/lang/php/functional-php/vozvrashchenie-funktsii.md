---
title:  Возвращение функции
description: Функции могут возвращать функции.
keywords: php, return, function
date: 2017-11-08 10:00:00
---

```php
function concatWith(string $a): callable {
  return function (string $b) use ($a): string {
    return $a . $b;
  };
}
$helloWith = concatWith('Hello');
$helloWith('World'); //-> 'Hello World'
```

Это очень полезная техника, на которой основывается каррирование.