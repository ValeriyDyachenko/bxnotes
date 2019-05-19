---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Паттерны создания объектов
seoDescription: Способы создания объектов в JavaScript.
seoKeywords: js, constructor
date: 2017-11-14 13:00:00
---
# Паттерны создания объектов

## Вызов конструктора без new

При вызове конструктора без `new` будет модифицирован *глобальный объект* (*window* в браузерах), и вы не получите желаемого результата.

```js
// конструктор
function Waffle() {
  this.tastes = "yummy";
}

// новый объект
var good_morning = new Waffle();
console.log(typeof good_morning); // "object"
console.log(good_morning.tastes); // "yummy"

// антипаттерн:
// забыли `new`
var good_morning = Waffle();
console.log(typeof good_morning); // "undefined"
console.log(window.tastes); // "yummy"
```

Примечание: с *ES5* и в *строгом режиме* `this` больше не указывает на глобальный объект.

## Соглашений об именовании

Имя конструктора пишется с заглавной буквы.

## Паттерн that

Создание конструктора, возвращающего объект без указания `new`.

```js
function Waffle() {
  var that = {};
  that.tastes = "yummy";
  return that;
}
```

Варианты с `new` и без `new` всегда вернут объект:

```js
var first = new Waffle(),
second = Waffle();
console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"
```

Проблема данного паттерна в том, что *прототип* будет потерян.


## Паттерн авто вызов new

```js
function Waffle() {
  if (!(this instanceof Waffle)) {
    return new Waffle();
  }
  this.tastes = "yummy";
}

Waffle.prototype.wantAnother = true;

// тест
var first = new Waffle(),
second = Waffle();
console.log(first.tastes); // "yummy"
console.log(second.tastes); // "yummy"
console.log(first.wantAnother); // true
console.log(second.wantAnother); // true
```

Вариант:

```js
if (!(this instanceof arguments.callee)) {
  return new arguments.callee();
}
```

`arguments.callee` не поддерживается с `ES5` в строгом режиме, по этому следует ограничить его использование. Данный паттерн основан на том, что объект `arguments`, содержащий параметры переданные функции, так же содержит ссылку на вызвавшую функцию в свойстве `arguments.callee`.