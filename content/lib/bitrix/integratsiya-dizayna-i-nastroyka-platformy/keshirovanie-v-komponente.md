---
title:  Кеш компонента
description: Использование кеша компонентов, сохранение ключей кеша в $arResult, кейс использования CPhpCache для вызова компонента снаружи кешированной области
keywords: битрикс, кеширование, CBitrixComponent, StartResultCache(), setResultCacheKeys(), CPhpCach
date: 2018-01-04 03:00:00
---

## Методы класса CBitrixComponent

+ Для старта кеширования в компоненте используется метод` StartResultCache()`.
+ За установку ключей, которые кешируются, отвечает метод `SetResultCacheKeys()`.
+ За вызов шаблона `IncludeComponentTemplate()`.

## Метод StartResultCache()

Метод `StartResultCache()` вызывается из объекта компонента.

```php
if ($this->StartResultCache()) {
    //Кеша нет. Получаем arResult, устанавливаем ключи, включаем шаблон
}
```

Если кеш есть, то `StartResultCache()` выведет *html* и воспроизведет `$arResult`, вернув `false`, иначе выполнит блок в фигурных скобках.

Если нет вызова шаблона `$this->IncludeComponentTemplate()`, то нужно вызвать `$this->endResultCache()`;

```php
// Проверка и инициализация входных параметров
if ($arParams["ID"] <= 0) {
  $arParams["ID"] = 10;
}  
// $this->StartResultCache() отобразит страницу и установит $arResult, 
// либо сгенерирует новый кеш и подключи компонент,
// если кеш устарел
if ($this->StartResultCache()) {
  // Запрос данных и заполнение $arResult
  $arResult = array(
  "ID" => rand(1, 100)
  );
  for ($i = 0; $i < 5; $i++)
  $arResult["FIELDS"][] = rand(1, 100);
  // Если выполнилось какое-то условие, то кешировать
  // данные не надо
  if ($arParams["ID"] < 10)
  $this->AbortResultCache();
  // Подключить шаблон вывода
  $this->IncludeComponentTemplate();
}
// Установить заголовок страницы с помощью отложенной
// функции
$APPLICATION->SetTitle($arResult["ID"]);
```

Если генерация кеша должна зависеть от дополнительных данных, например, *группы пользователя*:

```php
// кеш должен зависеть от групп пользователей, которым принадлежит посетитель
if ($this->StartResultCache(false, $USER->GetGroups())) {
  // Валидного кеша нет. Выбираем данные из
  // базы в $arResult и подключаем компонент
}
```

[Подробнее о StartResultCache](https://dev.1c-bitrix.ru/api_help/main/reference/cbitrixcomponent/startresultcache.php).

`Метод setResultCacheKeys()` - определяет какие ключи $arResult попадут в кеш.

```php
CBitrixComponent::setResultCacheKeys($arResultCacheKeys); 
```

`$arResultCacheKeys` - это список ключей массива `$arResult`, которые должны кэшироваться.

## Класс CPhpCache

Методы:

+ `StartDataCache`
+ `EndDataCache`
+ `InitCache`
+ `GetVars`

Класс `CPhpCache` используется для кеширования *PHP* переменных и *HTML* результата выполнения скрипта.

Пример, реализованный с помощью `CPhpCache`, когда вызов шаблона вынесен из кешированной области, чтобы в нем были возможны вызовы других компонентов:

```php
$cache_id = $some_value;
$obCache  = new CPHPCache;
if ($obCache->InitCache($arParams['CACHE_TIME'], $cache_id, '/')) {
    $vars     = $obCache->GetVars();
    $arResult = $vars['arResult'];
} elseif ($obCache->StartDataCache()) {
    // выполняются некоторые действия...
    $obCache->EndDataCache(array(
        'arResult' => $arResult
    ));
}
```