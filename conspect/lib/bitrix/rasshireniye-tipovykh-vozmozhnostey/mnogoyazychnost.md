---
layout: post.njk
tags: [post, postInConspect:rasshireniye-tipovykh-vozmozhnostey, postInSubject:bitrix, postInSection:lib]
conspect: rasshireniye-tipovykh-vozmozhnostey
section: lib
subject: bitrix
title: Многоязычность
seoDescription: Настройка многоязычности на сайтах 1С-Битрикс. Организация нескольких языковых версий на одном сайте.
seoKeywords: битрикс, многоязычность
date: 2018-01-05 10:00:00
---
# Многоязычность

## Настройки многоязычности

### Выбор языка для сайта

`Настройки -> Настройки продукта -> Сайты -> Список сайтов`.

### Подключение языка

`Настройки -> Настройки продукта -> Языки интерфейса`.

### Инфоблоки

Для каждой языковой версии может быть создан свой инфоблок.

### Компонент для переключения сайтов 

`bitrix:main.site.selector`.

### Мультиязычные инфоблоки

Создаются свойства для разных языков, например, `DESCRIPTION_TEXT` и `EN_DESCRIPTION_TEXT` и в языковых версиях используются шаблоны компонента, отображающие нужные поля.

## Многоязычность на одном сайте

### Файл dbconn.php:

```php
session_register("LANG_UI");
if (isset($_REQUEST['lang_ui'])) {
    $_SESSION["LANG_UI"] = ($_REQUEST['lang_ui'] == 'en' ? 'en' : 'la');
}
if (!isset($_REQUEST['lang']) && isset($_SESSION["LANG_UI"])) {
    define(LANGUAGE_ID, $_SESSION["LANG_UI"]);
}
```

### Файл header.php:

```php
?><script>
    function action_lang() {
        window.location = '?lang_ui=' + document.getElementsByName('Lang')[0].value;
    }
</script>
```

### Вывод переключателя в шаблоне сайта

```php
echo CLanguage::SelectBox('Lang', $_SESSION["LANG_UI"], '', 'action_lang()');
```

### Мультиязычное меню

Создается копия текущего шаблона для второй языковой версии сайта. В настройках сайта подставляется второй шаблон по php условию `$_SESSION["LANG_UI"]=='la'`. Создаются различные типы меню для языковых версий В кастомизированном языковом шаблоне подключается компонент, настроенный под соответствующий для языка тип меню.

### Особенности

Для второго сайта можно создать собственный `init.php` по пути `bitrix/php_interface/s2/init.php`.