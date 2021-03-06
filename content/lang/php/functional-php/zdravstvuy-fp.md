---
title:  Здравствуй, FP
description: Зачем нужно функциональное программирование в PHP?
keywords: php, compose
date: 2017-11-08 02:00:00
---

Цель функционального программирования, это глобальный контроль потоков и операций над данными с помощью *функций*, избегая при этом *сайд эффектов* и уменьшая *мутацию состояний*.

Пример функционального подхода:

```php
$run = compose(toFile('ch01.txt'), $repeat(2), 'htmlentities');
$run('Functional PHP <i>Rocks!</i>');
//-> writes 'Functional PHP &lt;i&gt;Rocks!&lt;/i&gt;
// Functional PHP &lt;i&gt;Rocks!&lt;/i&gt;'
```

:pencil2: **Функциональный стиль позволяет параметизировать программный код, давая возможность легко его менять, как будто вы меняете входные параметры алгоритма.**