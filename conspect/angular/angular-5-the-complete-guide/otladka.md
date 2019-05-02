---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Отладка
seoDescription: Инструменты отладки Angular 5.
seoKeywords: angular, spa, отладка, augury
date: 2018-01-14 10:00:00
---
# Отладка

Для отладки ошибки в скрипте нужно поставить *breakpoint* (в *chrome* он ставится кликом на номер строки кода) и обновить страницу. Это можно сделать несколькими способами:

+ в консоли разработчика перейти во вкладку *source* и кликнуть по файлу `main.bundle.js`. Данный способ не удобен, так как этот файл может быть слишком большим
+ во вкладке *source* раскрыть `webpack://`, выбрать папку проекта и необходимый файл
+ Отладка расширением [Augury](https://augury.angular.io/). Расширение позволяет увидеть структуру проекта, и может быть полезно при отладке.