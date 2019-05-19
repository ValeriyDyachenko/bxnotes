---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey, postInSubject:bitrix, postInSection:lib]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: Гаджеты
seoDescription: Создание собственных гаджетов в CMS 1С-Битрикс.
seoKeywords: битрикс, гаджеты
date: 2018-01-05 07:00:00
---
# Гаджеты

## Определение

Гаджет - это элемент для вывода данных. Они выводятся компонентом `bitrix:desktop`.

Отличия от компонентов:

+ нет шаблонов
+ две группы настроек - общие и отдельные для каждого пользователя

## Расположение

`/bitrix/gadgets` - системные в пространстве имен bitrix, кастомные в своем

## Структура гаджета

+ .description.php - файл описания;
+ .parameters.php - файл с настройками;
+ файл index.php, который содержит исполняемый код, реализующий задачу гаджета;
+ языковые файлы в папке /lang/;
+ другие служебные файлы и папки;

## .description.php:

### Структура `.description.php`:

```php
$arDescription = Array(
  "NAME" => GetMessage("GD_WORKFLOW_NAME"),
  "DESCRIPTION" => GetMessage("GD_WORKFLOW_DESC"),
  "ICON" => "",
  "GROUP" => Array(
    "ID" => "personal"
  ),
  "SU_ONLY" => false,
  "SG_ONLY" => false,
  "BLOG_ONLY" => false,
  "AI_ONLY" => false
);
```

### Ключи `.description.php`:

Параметр | Описание
--- | --- | ---
NAME | Название
DESCRIPTION | Описание
ICON | Иконка (указать путь)
GROUP | Группа, к которой относится гаджет. Указание группы определяет где в выпадающем списке гаджетов он будет показан
SU_ONLY | Только для подключения у пользователя
SG_ONLY | Только для подключения в группах
BLOG_ONLY | Только для подключения в блогах
ICON | Иконка (указать путь)
AI_ONLY | Только для подключения в административном разделе
NOPARAMS | Нет параметров

## .parameters.php

```php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
if (!CModule::IncludeModule("iblock"))
    return false;
$arIBlocks = array(
    "" => GetMessage("GD_PRODUCTS_EMPTY")
);
$dbIBlock  = CIBlock::GetList(
  array(
    "SORT" => "ASC",
    "NAME" => "ASC"
  ), 
  array(
    "CHECK_PERMISSIONS" => "Y"
  )
);
while ($arIBlock = $dbIBlock->GetNext()) {
    $arIBlocks[$arIBlock["ID"]] = "[" . $arIBlock["ID"] . "] " . $arIBlock["NAME"];
}
$arParameters = Array(
    "PARAMETERS" => Array(
        "IBLOCK_ID" => Array(
            "NAME" => GetMessage("GD_PRODUCTS_IBLOCK_ID"),
            "TYPE" => "LIST",
            "VALUES" => $arIBlocks,
            "MULTIPLE" => "N",
            "DEFAULT" => '',
            "REFRESH" => "Y"
        )
    ),
    "USER_PARAMETERS" => Array(
        "ELEMENT_COUNT" => array(
            "NAME" => GetMessage("GD_PRODUCTS_ELEMENT_COUNT"),
            "TYPE" => "STRING",
            "DEFAULT" => '5'
        ),
        "SHOW_UNACTIVE_ELEMENTS" => array(
            "NAME" => GetMessage("GD_PRODUCTS_SHOW_UNACTIVE"),
            "TYPE" => "CHECKBOX",
            "MULTIPLE" => "N",
            "DEFAULT" => "N"
        )
    )
);
```

## index.php (заодно пример класса CPageCache)

```php
<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
    die();
// INPUT PARAMS
$arGadgetParams["IBLOCK_ID"] = intval($arGadgetParams["IBLOCK_ID"]);
if ($arGadgetParams["IBLOCK_ID"] <= 0) {
    return false;
}
  
$arGadgetParams["ELEMENT_COUNT"] = intval($arGadgetParams["ELEMENT_COUNT"]);
if ($arGadgetParams["ELEMENT_COUNT"] <= 0) {
    $arGadgetParams["ELEMENT_COUNT"] = 5;
}
$arGadgetParams["SHOW_UNACTIVE_ELEMENTS"] = $arGadgetParams["SHOW_UNACTIVE_ELEMENTS"] != "N";
$arNavParams = array(
    "nPageSize" => $arGadgetParams["ELEMENT_COUNT"]
);
//CACHE
$obCache   = new CPageCache;
$cacheTime = 5 * 60;
$cacheId   = $arGadgetParams["IBLOCK_ID"] 
    . $arGadgetParams["ELEMENT_COUNT"] 
    . $arGadgetParams["ELEMENT_COUNT"];
if ($obCache->StartDataCache($cacheTime, $cacheId, "/")) {
    if (!CModule::IncludeModule("iblock")) {
        ShowError(GetMessage("IBLOCK_MODULE_NOT_INSTALLED"));
        return;
    }
    $arSelect = array(
        "ID",
        "ACTIVE",
        "DATE_CREATE",
        "IBLOCK_ID",
        "DETAIL_PAGE_URL",
        "NAME",
        "PREVIEW_PICTURE"
    );
    $arFilter = array(
        "IBLOCK_ID" => $arGadgetParams["IBLOCK_ID"],
        "CHECK_PERMISSIONS" => "Y"
    );
    if (!$arGadgetParams["SHOW_UNACTIVE_ELEMENTS"])
        $arFilter["ACTIVE"] = "Y";
    $arSort = array(
        "DATE_CREATE" => "DESC"
    );
    $rsElement = CIBlockElement::GetList($arSort, $arFilter, false, $arNavParams, $arSelect);
    while ($arElement = $rsElement->GetNext()) { ?> 
      <div style="margin-bottom: 10px;">
        <div style="float: left; width: 50px; margin-right: 10px">
          <a href="<?= $arElement['DETAIL_PAGE_URL'] ?>">
            <?= CFile::ShowImage($arElement['PREVIEW_PICTURE'], 50, 50) ?>
          </a>
        </div>
        <a href="<?= $arElement['DETAIL_PAGE_URL'] ?>">
          <?= $arElement['NAME'] ?>
        </a>
        <br/>
        <small><?= $arElement['DATE_CREATE'] ?></small>
        <div style="clear: both;"></div>
      </div> <?
    }
    $obCache->EndDataCache();
}
```