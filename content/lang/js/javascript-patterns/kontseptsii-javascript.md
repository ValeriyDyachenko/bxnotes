---
title:  Концепции JavaScript
description: Обзор языка программирования Java Script, и чем он отличается от языков программирования, основанных на классах.
keywords: js, number, string, boolean, null, undefined, prototype
date: 2017-11-14 00:00:00
---

## Объектно ориентированный

В *JS* только 5 примитивных типов не являются объектами: `number`, `string`, `boolean`, `null` и `undefined`. Но `number`, `string` и `boolean` имеют представляющие их объекты, в которые они могут быть сконвертированы *js интерпретатором*.

Функции так же являются объектами со свойствами и методами.

Что же такое объект? Объект - это набор именованных свойств.

Есть два основных типа объектов `Native`, предоставляемые стандартом *ECMAScript* и `Host`, предоставляемые средой, например, *браузером*.

## Без классов

В *JS* вы работаете только с объектами. Вы создаете пустой объект, когда вам это потребуется и добавляете к нему члены. Вы составляете объекты добавлением примитивов, функций или других объектов к нему как их свойства. Паттерн композиция, это то, что постоянно происходит в *js*.

## Прототипы

Далее, прототипы будут рассмотрены подробнее, пока остановимся на том, что `prototype` - это объект, который имеет каждая функция.

## Окружение

Для запуска программ, написанных на *JavaScript* необходимая среда. Обычно, но не всегда, это *браузер*. Среда предоставляет специальные `host` объекты, которые не определены в спецификацией языка.