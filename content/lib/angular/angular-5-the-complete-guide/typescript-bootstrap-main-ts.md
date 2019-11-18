---
title: TypeScript, Bootstrap, Main.ts
seoDescription: Использование TypeScript, подключение Bootstrap с помощью npm и роль файла main.ts
seoKeywords: angular, spa, bootstrap, typescript, main.ts
date: 2018-01-13 02:00:00
---
# TypeScript, Bootstrap, Main.ts

## TypeScript

Это суперсет, расширяющий возможности *javaScript* наличием *типов*, *классов*, *интерфейсов* и т.д. Браузер не умеет выполнять **TypeScript** файлы, по этому их нужно компилировать в *js*.

## Bootstrap

Рекомендуется устанавливать из командной строки командой `npm install --save bootstrap`. Из *VS Studio* командную строку можно запустить сочитанием `ctrl + ~`

В файл `.angular.cli.json` добавить стили:

```json
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "styles.css"
],
```

## Как работает Angular5

*Angular* используется для создания *SPA (Single page application)*.

`index.html` - базовая страница.

`main.ts` - скрипт, который выполняется после загрузки страницы. В этом скрипте главное: 

```js
import { AppModule } from './app/app.module'; 
platformBrowserDynamic().bootstrapModule(AppModule)
```

Таким образом загружается файл `app\app.module.ts`, который и загружает компонент на страницу.
