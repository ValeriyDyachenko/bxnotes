---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: Работа с компонентами
seoDescription: Порядок выполнения компонентов в 1С-Битрикс. Работа с параметрами. Кеширование компонентов.
seoKeywords: битрикс, component.php, result_modifier.php, template.php, component.php, $arResult
date: 2018-01-05 00:00:00
---
# Работа с компонентами

## Порядок выполнения компонента

+ `component.php` до вызова шаблона
+ `result_modifier.php` перед вызовом шаблона
+ `template.php`
+ `component.php` после вызова шаблона

## .parameters.php

Файл `.parameters.php` в папке шаблона расширяет параметры компонента. Если мы добавили параметры в комплексный компонент, то необходимо в файле, в котором комплексный компонент подключает простые компоненты передавать установленный параметр в вызов простого компонента:

```php
"OUR_PARAMENTR" => $arParams["OUR_PARAMENTR"];
```

## Кеширование $arResult

В `component.php` (ключи `$arResult`, которые нужно закешировать): 

```php
$this->SetResultCacheKeys(array("NAME","ID"));
```

В result_modifier: 

```php
$cp = $this->__component;
$cp ->SetResultCacheKeys(array("AUTHOR"));
```