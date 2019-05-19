---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey, postInSubject:bitrix, postInSection:lib]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: Решение типовых задач
seoDescription: Получение полей и свойств связанных элементов с помощью параметров компонентов и с помощью API Битрикса. Получения значений связанных элементов в шаблоне компонента. Примеры решения типовых задач.
seoKeywords: битрикс
date: 2018-01-05 02:00:00
---
# Решение типовых задач

## Параметры компонента

Пример вывода *поля привязанного элемента* с помощью настройки параметров компонента: `параметры компонента -> настройка списка`, в пункт *Поля* вводим `PROPERTY_PROPNAME.PREVIEW_TEXT`.

Подробнее в [документации](http://dev.1c-bitrix.ru/api_help/iblock/classes/ciblockelement/getlist.php).

Чтобы получить *значения свойств* *привязанных элементов*  - `PROPERTY_.PROPERTY_`.

## CIBlockElement::GetList()

Рассмотрим пример получения информации о привязанном элементе в шаблоне компонента.

В `result_modifier.php` формируем массив вида `$arResult["OUR_PROP"][$elementId] = array(//...)`. Формируем данный массив отдельным запросом вне цикла, т.е сначала собираем массив `id`, затем передаем его в `GetList`, а полученный объект обходим с помощью функции `GetNext`, формируя массив `$arResult["OUR_PROP"][$elementId] = array(//...)`.

Известен `id` привязанного элемента - `$arResult["ITEMS"][//number]["PROPERTY"]["PROP_NAME_LINKED_EL"]["VALUE"]` и можно соотнести его с `$arResult["OUR_PROP"][$item["PROPERTY"]["PROP_NAME_LINKED_EL"]["VALUE"]]`, проверяем есть ли такой ключ и если есть выводим необходимую информацию.

## Примеры API
 
### Выбрать элементы с отсутствующим значением

В `GetList()` укажем `$arFilter` с `"PROPERTY_SOME" => false`.

### Выбрать элементы с установленным значением

В `GetList()` укажем `$arFilter` с `"!PROPERTY_SOME" => false`.

### Подключить модуль

```php
CModule::IncludeModule("iblock");
```

Возвращает `true`, если модуль установлен, иначе - `false`.

### Работа с CIBlockResult. 

`CIBlockElement::GetList` - возвращает объект класса  `CIBlockResult`. При переборе рекомендуется использовать метод  `GetNextElement`, который возвращает объект класса  `_CIBElement` с методами  `GetFields`,  `GetProperties`,  `GetProperty`, `GetGroups`. Это более гибко, чем просто получить массив с помощью `GetNext`.

### Получить id администраторов сайта

```php
CUser::GetList(//..)
```

В `$arFilter` укажем `"GROUPS_ID" => array(1);`

### Константа сайта 

Хранится в php константе `SITE_ID`.

### Подключение php файла в init.php:

```php
$path = $_SERVER["DOCUMENT_ROOT"] . "/bitrix/php_interface/include/my_file.php";
if (file_exists($path)) {
    require_once($path);
}
```