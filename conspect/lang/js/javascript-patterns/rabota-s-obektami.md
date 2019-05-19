---
layout: post.njk
tags: [post, postInConspect:javascript-patterns, postInSubject:js, postInSection:lang]
conspect: javascript-patterns
section: lang
subject: js
title: Объекты
seoDescription: Создание объектов в JavaScript. Рассмотрение работы конструктора.
seoKeywords: js, object, new
date: 2017-11-14 12:00:00
---
# Объекты

## Создание объекта

Литеральная запись объекта:

```js
// пустой объект
var dog = {};

// добавление свойства
dog.name = "Benji";

// добавление метода
dog.getName = function () {
 return dog.name;
};

// переопределение метода
dog.getName = function () {
  return "Fido";
};
```

Необязательно начинать с пустого объекта:

```js
var dog = {
  name: "Benji",
  getName: function () {
    return this.name;
  }
};
```

## Создание из конструктора

```js
var car = new Object();
car.goes = "far";
```

Когда конструктор `Object` вызывается с параметром, то в зависимости от типа параметра создание объекта может быть делегировано другому конструктору и будет возвращен не тот тип объекта, который вы ожидаете. Поэтому хорошим тоном считает использовать литеральную запись для создания объекта.

```js
// ВНИМАНИЕ, антипаттерн!

// пустой объект
var o = new Object();
console.log(o.constructor === Object); // true

//number объект
var o = new Object(1);
console.log(o.constructor === Number); // true
console.log(o.toFixed(2)); // "1.00"

// string объект
var o = new Object("I am a string");
console.log(o.constructor === String); // true

// обычные объекты не имеют метода substring()
// но строковые объекты имеют
console.log(typeof o.substring); // "function"

// boolean объект
var o = new Object(true);
console.log(o.constructor === Boolean); // true
```

## Кастомный конструктор функции

```js
var Person = function (name) {
    this.name = name;
    this.say = function () {
    return "I am " + this.name;
    };
};

var adam = new Person("Adam");
adam.say(); // "I am Adam"
```

Когда вызывается конструктор функции с помощью ключевого слова new, то происходит следующее:

+ Создается пустой объект, на который ссылается переменная `this`. Прототип данного объекта наследуется от прототипа функции
+ Добавляются свойства и методы объекту, на который ссылается `this`
+ Если другой объект не возвращается явно, то возвращается созданный объект, на который ссылается `this`

Таким образом, за сценой происходит что-то подобное:

```js
var Person = function (name) {
    // var this = Object.create(Person.prototype);
    // добавление свойств и методов
    this.name = name;
    this.say = function () {
    return "I am " + this.name;
    };
    // return this;
};
```

## Значение, возвращаемое конструктором

Конструктор может вернуть любой объект.

```js
var Objectmaker = function () {
  this.name = "This is it";
  // возвратим свой объект, вместо this
  var that = {};
  that.name = "And that's that";
  return that;
};

// проверим
var o = new Objectmaker();
console.log(o.name); // "And that's that"
```

Таким образом, может быть возвращен любой объект. Если возвращен не объект, а что-то другого типа, то ошибка не всплывет, но будет возвращена ссылка на `this`.