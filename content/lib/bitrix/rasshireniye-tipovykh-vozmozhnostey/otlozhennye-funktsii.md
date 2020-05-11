---
title:  Отложенные функции
description: Отложенные функции Битрикса, примеры SetViewTarget(), EndViewTarget(). Обработка вывода с помощью события OnEpilog.
keywords: битрикс, AddBufferContent(), SetViewTarget(), EndViewTarget(), ShowViewContent(), OnEpilog
date: 2018-01-05 04:00:00
---

## AddBufferContent

Метод `$APPLICATION->AddBufferContent()` будет выполнен в прологе, а возвращенное значение вставлено в месте вызова.

Пример функции, которая возвращает значение заданного свойства страницы:

```php
function myShowProperty($property_id, $default_value = false) {
  global $APPLICATION;
  $APPLICATION->AddBufferContent(
    Array(
      &$APPLICATION,
      "GetProperty"
    ), 
      $property_id, 
      $default_value
  );
}
```

Пример использования данной функции в `header.php`:

```php
  $propertyNames = [
    'title',
    'description',
    'keywords'
  ];
  foreach ($propertyNames as $property) {
    echo "свойство {$property} имеет значение " . myShowProperty($property);
  }
```

Во время выполнения различных компонентов, данные свойства могут неоднократно перезаписываться на новые значения. Но так как отложенная функция будет выполнена в эпилоге, то в данном *html* коде отобразятся актуальные значения. Это возможно за счет того, что весь *html* вывод буферизуется битриксом, а в буфере система оставляет пустые места. Перед выдачей страницы браузеру выполняются отложенные функции, и их вывод подставляется в эти подготовленные пустые места.

## SetViewTarget(), EndViewTarget(), ShowViewContent()

`header.php`:

```html
<h1>
  <?= $APPLICATION->ShowTitle(); ?>
  <? $APPLICATION->ShowViewContent('news_detail'); ?>
</h1>
```

шаблон компонента:

```php
<?
  $this->SetViewTarget('news_detail');
?>
<noindex>
  <a 
    rel="nofollow" 
    class="h1-head fancy" 
    href="/develop/change_cover_type.php">
      <?= $arDataFilter["NAME"] ?>
  </a>
</noindex>
<?
  $this->EndViewTarget();
?>
```

## SetViewTarget в эпилоге компонента

```php
$this->__template->SetViewTarget("my_target");
//... html вывод 
$this->__template->EndViewTarget(); 
```

## Событие OnEpilog

Событие `OnEpilog` позволяет обработать *html* перед выдачей в браузер. Так работает антивирус в Битриксе, удаляя вредоносный js.