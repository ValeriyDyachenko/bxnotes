---
layout: post.njk
tags: [post, postInConspect:functional-php, postInSubject:php, postInSection:lang]
conspect: functional-php
section: lang
subject: php
title: Декларативный код
seoDescription: В декларативном стиле программирования, конструкции языка позволяют получить результат, не прибегая к низкоуровневой манипуляции данных.
seoKeywords: php, array_map, array_reduce
date: 2017-11-08 03:00:00
---
# Декларативный код

```php
$array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
$square = function (int $num): int {
  return pow($num, 2);
};
array_map($square, $array); //-> [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
function add(float $a, float $b): float {
  return $a + $b;
}
array_reduce(array_map($square, $array), 'add'); //-> 285
```

:pencil2: **Абстрактные функции обхода позволяют использовать приемущества анонимных функций и замыканий.**