---
title:  Компоненты
description: Создание собственных простых и комплексных компонентов в 1С-Битрикс.
keywords: битрикс, компоненты
date: 2018-01-05 05:00:00
---

## Создание компонента

С перечнем компонентов можно ознакомиться в [пользовательской документации](https://dev.1c-bitrix.ru/api_help/iblock/index.php).

Для ускорения разработки берем стандартный компонент и дорабатываем. Шаги:

+ Копируем компонент в свой *namespace*
+ Редактируем `description.php`
+ Редактируем `lang файлы`
+ Редактируем `parameters.php`
+ Редактируем `component.php`
+ Редактируем `template.php`

## Создание комплексного компонента

### Файловая структура

`.parameters.php` - используется для настройка простых компонентов и ЧПУ.

`component.php` - принцип работы:
+ Проверка ЧПУ или неЧПУ
+ Дефолтные значения для обоих режимов
+ Парсинг URL
+ Определение какой файл подключить
+ Получение значений переменных
+ Подключение шаблона

Переменные комплексного компонента могут переопределяться во входных параметрах компонента.

### $arDefaultUrlTemplates404

`$arDefaultUrlTemplates404` содержит пути по умолчанию для *ЧПУ* режима.

```php
$arDefaultUrlTemplates404 = array(
  "list" => "index.php",
  "element" => "#ELEMENT_ID#.php"
);
```

    
### $arDefaultVariableAliases404

$`arDefaultVariableAliases404` содержит псевдонимы по умолчанию (для не ЧПУ режима называются `$arDefaultVariableAliase`).

В случае, если необходимо, чтобы в HTTP запросе (в адресе) переменная называлась по другому, можно задать псевдоним этой переменной, а при работе компонента восстанавливать значение переменной из псевдонима.

```php
$arDefaultVariableAliases404 = array(
  "element" => array(
    "SECTION_ID" => "SID"
  )
);
```
 
Параметр `SID`, благодаря псевдонимам интерпретируется в переменную `SECTION_ID`:

```php
array(
  "element" => "#IBLOCK_ID#/#ELEMENT_ID#.php?SID=#SECTION_ID#"
);
```

### $arComponentVariables

`$arComponentVariables` задает список переменных, которые компонент может принимать в HTTP запросе и которые могут иметь псевдонимы. Каждый элемент массива является именем переменной.

```php
$arComponentVariables = array(
  "IBLOCK_ID",
  "ELEMENT_ID"
);
 ```

   
### Параметры

```php
$arParams["SEF_MODE"]
```

значение `Y` или `N`

Данный параметр определяет режим *ЧПУ*.

## Методы комплексного компонента

### ::MakeComponentUrlTemplates

```php
array CComponentEngine::MakeComponentUrlTemplates(
  $arDefaultUrlTemplates404, 
  $arParams["SEF_URL_TEMPLATES"]
);
  ```
  
Метод объединяет массив по умолчанию шаблонов путей и шаблоны путей, которые были переданы во входных параметрах компонента в один массив. При этом, если в `$arParams["SEF_URL_TEMPLATES"]` определён шаблон какого-либо пути, то он переопределяет шаблон по умолчанию этого пути.

### ::MakeComponentVariableAliases

```php
array CComponentEngine::MakeComponentVariableAliases(
  $arDefaultVariableAliases404, 
  $arParams["VARIABLE_ALIASES"]
);
```
  
Метод объединяет массив по умолчанию псевдонимов переменных и псевдонимы переменных, которые были переданы во входных параметрах компонента в один массив. При этом, если псевдоним некоторой переменной определён и в массиве по умолчанию, и во входных параметрах, то возвращается псевдоним из входных параметров.

### ::ParseComponentPath

```php
array CComponentEngine::ParseComponentPath(
  $arParams["SEF_FOLDER"], 
  $arUrlTemplates, $arVariables
);
```
  
Метод на основании параметра `$arParams["SEF_FOLDER"]` и массива шаблонов путей (который вернул метод `MakeComponentUrlTemplates`) определяет, какому шаблону пути соответствует запрошенный адрес.

Если шаблон был найден, возвращается его код, иначе возвращается пустая строка.

Кроме того, в переменной `$arVariables` возвращается массив переменных компонента, который был восстановлен из шаблона пути без параметров. Например, если массив шаблонов путей (который получился из массива `$arDefaultUrlTemplates404` после переопределения всех или части шаблонов через входные параметры компонента) имеет вид:

```php
$arUrlTemplates = array(
  "list" => "index.php",
  "element" => "#IBLOCK_ID#/#ELEMENT_ID#.php?SID=#SECTION_ID#"
);
```
  
Если входной параметр `SEF_FOLDER` равен `/company/news/`, а запрошенный адрес равен `/company/news/15/7653.php?SID=28`, то метод `ParseComponentPath` вернет строку `element` (код соответствующего шаблона), а массив `$arVariables` будет иметь вид:

```php
$arVariables = array(
  "IBLOCK_ID" => 15,
  "ELEMENT_ID" => 7653
);
```
  
### ::InitComponentVariables

```php
CComponentEngine::InitComponentVariables(
  $componentPage, 
  $arComponentVariables, 
  $arVariableAliases, 
  $arVariables
);
```
  
Метод восстанавливает переменные из `$_REQUEST` c учётом их возможных псевдонимов и возвращает их в переменной `$arVariables`.

+ `$componentPage` - код шаблона, который вернул метод ParseComponentPath и которому соответствует запрошенный адрес;
+ `$arComponentVariables` - массив переменных, которые компонент может принимать в HTTP запросе и которые могут иметь псевдонимы;
+ `$arVariableAliases` - массив псевдонимов (который вернул метод `MakeComponentVariableAliases`);

В случае работы компонента не в режиме ЧПУ, в метод `InitComponentVariables` первым параметром передается значение `False`.

### Подключение шаблона в режиме ЧПУ

```php
$this->IncludeComponentTemplate(
  array(
    "FOLDER" => $arParams["SEF_FOLDER"],
    "URL_TEMPLATES" => $arUrlTemplates,
    "VARIABLES" => $arVariables,
    "ALIASES" => $arVariableAliases
  ),
  $componentPage
);
```

Еще [примеры](https://dev.1c-bitrix.ru/api_help/main/reference/ccomponentengine/initcomponentvariables.php) (с ЧПУ и без ЧПУ).