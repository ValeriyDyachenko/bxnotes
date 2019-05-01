---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: This
seoDescription: Как работает this в JavaScript.
seoKeywords: js, this, scope, bind, apply, call
date: 2018-09-22 05:00:00
---
# This

В данной статье рассматривается работа с `this`. Будут изучены различные кейсы употребления `this` и их особенности. Понимание работы `this` очень важно для понимания языка JavaScript.

## Строгий и не строгий режим

`This` работает по разному в зависимости от того, включен или нет строгий режим.

В глобальном контексте `this` указывает на глобальный объект, не зависимо от строгости режима.

В функциональном контексте `this` указывает на контекст, откуда функция вызвана. Если функция вызвана из глобального контекста, то в нестрогом режиме `this` укажет на глобальный объект, а в строгом режиме будет иметь значение `undefined`, если не имеет явного присваивания в процессе выполнения.

```js
var baz = "im baz from global";

const foo = {
  baz: "im baz from object foo",
  bar: function() {
    return this.baz;
  }
}

const testBaz = foo.bar;

console.log(testBaz()); 
// выведет "im baz from global".
// так как функция, возвращающая this.baz,
// вызвана из глобального контекста, то
// this указывает на объект window и 
// функция возвращает window.baz 

console.log(foo.bar()); 
// выведет "im baz from object foo"
// так как вызов произошел из контекста объекта foo
// у которого собственное свойство foo.baz
```

## Call, apply

Функции `call` и `apply` позволяют указать контексту, на что должно указывать его `this`.

```js
var foo = "baz"
// свойство глобального объекта window.foo

const myObject = {foo: "bar"};
// контекст myObject со свойством foo

function getFoo() {
  return this.foo;
}

console.log(getFoo());  
// вызываем из глобального контекста, 
// this указывает на глобальный объект (window). 
// напечатается "baz"

// не смотря на вызов из глобального контекста, 
// мы можем явно указать на что должно ссылаться this
// в данном случае на контекст объекта myObject:
console.log(getFoo.call(myObject)); // bar
console.log(getFoo.apply(myObject)); // bar
```

Используя `call` и `apply` можно передать аргументы в вызываемую функцию. Отличие `call` от `apply` в том, как эти аргументы можно передать. Для call аргументы нужно передавать отдельно, а `apply` принимает их массивом.

```js
function say(one, two, three) {
  return `${this.foo}${this.bar} ${one} ${two} ${three}!`;
}

const lang = {
  foo: "Java",
  bar: "Script"
}

const standard = {
  foo: "ECMA",
  bar: "Script"
}

let phrase = say.call(lang, "is", "the", "best");
console.log(phrase) 
// JavaScript is the best!

let similarPhrase = say.apply(standard, ["is", "the", "best"]);
console.log(similarPhrase)
// ECMAScript is the best!
```

## Bind

`Function.prototype.bind` возвращает копию функции, заменяя при этом упоминающиеся в ней `this` на объект, указанный в аргументе. На функции, возвращенной методом `bind`, нельзя использовать `bind` еще раз.

```js
function getName() {
  return this.name;
}

const name = "Global"

// привяжем функцию к глобальному объекту
const bindedGetName = getName.bind(window);

const localName = {
  name: "Local"
}

localName.getName = bindedGetName;

console.log(
  localName.getName() // "Global"
);

console.log(
  bindedGetName.apply(localName) // "Global"
);
```

## Стрелочные функции. Arrow functions.

В момент вызова стрелочной функции, её `this` привязывается к контексту, откуда функция вызывается. После этого, `this` не может быть переопределен.

```js
var baz = "global context"

const foo = {
  baz: "foo context",
  bar: function() {
    return () => this;
  }
};

const initNow = foo.bar();
const initLater = foo.bar;

console.log(
  initNow().baz 
  // "foo context", так как стрелочная функция была 
  // проинициализирована из контекста foo и указывает на него.
);

console.log(
  initLater()().baz 
  // "global context", так как стрелочная функция не была 
  // проинициализирована из контекста foo,
  // а запущена позднее из глобального контекста
);
```

Попробуем изменить `this` у стрелочной функции из примера выше:

```js
initLater().apply(foo).baz
// выведет "global context", привязка не сработала
```

Изменить `this` стрелочной функции после её инициализации уже нельзя. Но можно изменить `this` внешней функции, которая не является стрелочной, и таким образом, стрелочная функция примет её `this` в момент инициализации:

```js
initLater.apply(foo)().baz 
// "foo context"
```

## Метод объекта

`This` функции, вызываемой из ключа объекта, указывает на данный объект (это не относится к стрелочным функциям, т.к. при инициализации их `this` уже привязан к внешнему контексту).

```js
const f = function() {
  return this.foo;
}

const o = {
  foo: "o foo",
  f: f
};

o.f() // вернет "o foo"
```

## Цепочка прототипов

`This` Функции, вызванной из контекста объекта и найденной в прототипе данного объекта, указывает на контекст объекта, в котором была вызвана, а не найдена.

```js
const proto = {
  foo: function() {
    return this.bar;
  },
  bar: "bar proto"
};

const o = new Object(proto);
o.bar = "bar o";
o.foo(); // "bar o"
```

## Геттер и Сеттер.

Геттер и сеттер, работаю с `this` аналогично, как и вызов функции из ключа объекта. Их `this` будет указывать на контекст объекта, в котором происходит их вызов.

```js
function foo() {
  return this.bar;
}

const o = {
  bar: "baz"
};

Object.defineProperty(
  o, 
  'foo', 
  {
    get: foo, 
    enumerable: true, 
    configurable: true
  }
);

console.log(
  o.foo // "baz" 
);
```

## Конструктор

`This` функции, вызываемой как конструктор, будет привязан к создаваемому объекту.

```js

function MakeTrueBar() {
  this.bar = true;
}

const foo = new MakeTrueBar();
console.log(foo.bar) // true
```

## Обработчик событий DOM

В функции, обрабатывающей событие DOM, `this` указывает на DOM элемент, который вызвал событие. Некоторые браузеры не поддерживают данное соглашение, если обработчик был назначен динамически и при этом не через `addEventListener`.

Нужно помнить о том, что используя `addEventListener` у обработчика события, `this` будет указывать на DOM элемента. Чтобы использовать другой контекст, необходимо явно это указать.

```html
<button id="btn1">btn1</button>
<button id="btn2">btn2</button>

<script>
  var foo = {
    foo: 'bar',
    bar: function() {
        console.log(this.foo);
    }
  };
  const button1 = document.getElementById("btn1");
  const button2 = document.getElementById("btn2");
  button1.addEventListener('click', foo.bar); // undefined
  button2.addEventListener('click', foo.bar.bind(foo)); // bar
</script>
```

## Инлайновый вызов обработчика

`This` инлайнового обработчика указывает на данный DOM элемент.

```html
<button onclick="this.remove();">
  Удалить эту кнопку
</button>
```

Это правило не действует, если `this` используется внутри функции:

```html
<script>
  var foo = "bar";
</script>

<button onclick="(function(){console.log(this.foo);})()"> 
<!--при клике выведет свойство window.foo-->
  print global foo
</button>
```
