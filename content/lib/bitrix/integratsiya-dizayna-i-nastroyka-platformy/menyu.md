---
title:  Меню
description: Создание динамического меню в 1С-Битрикс.
keywords: битрикс, меню, menu_ext.php, bitrix:menu.sections
date: 2018-01-04 04:00:00
---

## Пример создания динамического меню с названиями разделов инфоблока

В разделе *Дополнительные настройки* (компонента меню) установить флажок в поле `подключать файлы с именами вида .тип_меню.menu_ext.php` и создать такой файл с содержанием:

```php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
global $APPLICATION;
$aMenuLinksExt = $APPLICATION->IncludeComponent("bitrix:menu.sections", "", Array(
    "ID" => $_REQUEST["ID"],
    "IBLOCK_TYPE" => "books",
    "IBLOCK_ID" => "5",
    "SECTION_URL" => "/catalog/phone/section.php?",
    "DEPTH_LEVEL" => "1",
    "CACHE_TYPE" => "A",
    "CACHE_TIME" => "3600"
));
$aMenuLinks    = array_merge($aMenuLinks, $aMenuLinksExt);
```