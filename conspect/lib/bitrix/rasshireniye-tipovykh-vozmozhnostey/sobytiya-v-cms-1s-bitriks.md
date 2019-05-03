---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: События в CMS 1С-Битрикс
seoDescription: Обработка событий в CMS 1С-Битрикс и решение типовых задач.
seoKeywords: битрикс, AddEventHandler, OnBeforeIBlockElementUpdate, OnBeforeEventAdd, OnBeforeUserAdd
date: 2018-01-05 03:00:00
---
# События в CMS 1С-Битрикс

## Принцип обработки событий

Обработчики события могут быть определены в файле `/bitrix/php_interface/init.php` с помощью функции `AddEventHandler()`. Функция `AddEventHandler()` принимает следующие аргументы:

+ ID модуля
+ Имя события
+ Обработчик события. Массив с именем класса и метода, либо строка с именем функции.

## Обязательный символьный код. Событие OnBeforeIBlockElementUpdate.

Напишем обработку, которая запретит создавать новый элемент инфоблока без указания у него символьного кода.

```php   
AddEventHandler("iblock", "OnBeforeIBlockElementUpdate", Array(
    "MyClass",
    "OnBeforeIBlockElementUpdateHandler"
));
class MyClass
{
    // создаем обработчик события "OnBeforeIBlockElementUpdate"
    function OnBeforeIBlockElementUpdateHandler(&$arFields)
    {
        if (strlen($arFields["CODE"]) <= 0) {
            global $APPLICATION;
            $APPLICATION->throwException("Введите символьный код. (ID:" . $arFields["ID"] . ")");
            return false;
        }
    }
} 
```

`$arFields` имеет следующую структуру для свойств:

```php
"PROPERTY_VALUES" => array( 
    int1 => array( 
        int2 => array( 
            "VALUE" => "some value" 
        )
    )
); 
```

Где:

+ `int1` - id свойства в инфоблоке
+ `int2` - это id записи в базе данных, которая хранит в себе значение свойства.

Когда мы делаем распечатку полей с помощью `CIBlockElement::GetList()`, то эти значения так же присутствуют в ней -  `id записи БД` хранится в ключе `"PROPERTY_VALUE_ID"`.


Таким образом, становится возможным изменять и проверять значения свойств, например, на событие `OnBeforeIBlockElementUpdate` и подобные ему.

Для этого необходимо вызвать `CIBlockElement::GetList()` и узнать названия ключей, передаваемых в переменной `&$arFields`, а именно, `id свойства` и `id записи в БД`.

## Сохранение данных вебформы в инфоблок

Используем событие `OnBeforeEventAdd`, которое срабатывает перед `CEvent::Send()`. В нем проверяем тип почтового события, подключаем модуль инфоблоков, создаем объект `CIBlockElement` и используем его метод `Add()`.

## Отмена действия системы, на примере отмены регистрации.

Событие `OnBeforeUserAdd`.

Проверяем условие, создаем исключение 

```php
$APPLICATION->ThrowException("Что-то сделано не верно"); 
return false;
```