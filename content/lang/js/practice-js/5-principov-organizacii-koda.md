---
title: 5 принципов организации кода
seoDescription: 5 принципов организации кода.
seoKeywords: js
date: 2019-06-25 22:37:00
origin: <a rel="nofollow" href="https://blog.risingstack.com/node-hero-node-js-project-structure-tutorial/" target="_blank">Node Hero - Node.js Project Structure Tutorial</a>
---
# 5 принципов организации кода

## 1. Организуйте код по фичам, не по ролям.


:heavy_check_mark:
```
.
├── product
|   ├── index.js
|   ├── product.js
|   └── product.hbs
├── user
|   ├── index.js
|   ├── user.js
|   └── user.hbs
```

<br/>

:x:
```
.
├── controllers
|   ├── product.js
|   └── user.js
├── models
|   ├── product.js
|   └── user.js
├── views
|   ├── product.hbs
|   └── user.hbs
```

## 2. Не храните логику в index.js.

Используйте ```index.js``` только для экспорта функциональности:

```product/index.js```:
```js
let product = require('./product')

module.exports = {
  create: product.create
}
```

## 3. Размещайте тестовые файлы рядом с файлами, которые они тестируют.

Это поможет лучше документировать код, т.к. тестовые файлы описывают, что должно происходить.

Дополнительные тесты храните отдельно.

```
.
├── test
|   └── setup.spec.js
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
├── user
|   ├── index.js
|   ├── user.js
|   ├── user.spec.js
|   └── user.hbs
```

## 4. Используйте config директорию

Храните в ```config``` директории файлы конфигурации.

```
.
├── config
|   ├── index.js
|   └── server.js
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
```

## 5. Храните npm скрипты в отдельной директории

```
.
├── scripts
|   ├── syncDb.sh
|   └── provision.sh
├── product
|   ├── index.js
|   ├── product.js
|   ├── product.spec.js
|   └── product.hbs
```
