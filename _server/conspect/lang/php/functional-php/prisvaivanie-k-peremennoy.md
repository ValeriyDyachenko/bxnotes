---
title: Присваивание к переменной
seoDescription: С функциями можно обращаться, как с любыми другими объектами, а значит, можно присваивать переменным.
seoKeywords: php, is_callable()
date: 2017-11-08 09:00:00
---
# Присваивание к переменной

```php
$concat2 = function (string $s1, string $s2): string {
  return $s1. ' '. $s2;
};
$concat2('Hello', 'World'); //-> 'Hello World'
```

Анонимная функция назначается переменной $concat2. С помощью функции `is_callable()` можно проверить, является ли переменная вызывающей.

```php
is_callable($concat2) // 1
```