---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: js
title: Let, const, var.
seoDescription: Объявление переменных с помощью var, let, const.
seoKeywords: var, let, const, js
date: 2018-09-22 03:00:00
---
# Let, const, var

В ES5 переменные декларировались с помощью `var`. Переменные объявленные таким образом, могут быть переопределены в области блока, так как относятся к области видимости функции, а не блока.

```js
var foo = "foo";

if (foo === "foo") {
  var foo = "baz";
  console.log(foo); //baz
} 

console.log(foo); //baz
```

В ES6 появились два новых способа декларирования переменных, с помощью `const` и `let`, которые позволяют создавать переменные области видимости блока.

```js
let foo = "foo";

if (foo === "foo") {
  let foo = "baz";
  console.log(foo); //baz
} 

console.log(foo); //foo
```

Отличие `let` от `const` в том, что переменная декларированная с помощью `let` может быть переопределена, то есть может быть изменен ее указывать на другой объект в памяти.

```js
let foo = "bar";
foo = "baz";
console.log(foo); //baz
```

В случае декларирования переменной с помощью `const` её последующее переопределение невозможно.

```js
const foo = "bar";
foo = "baz"; //TypeError: Assignment to constant variable.
```

Ошибка возникает, так как переменной присваивается ссылка на другой объект в памяти. Но это не означает, что объект, на который указывает переменная не может быть модифицирован.

```js
const foo = {prop: "bar"};
foo.prop2 = "baz";
console.log(foo); //{prop: "bar", prop2: "baz"}
```

С помощью `let` и `const` переменная может быть объявлена только единственный раз. Попытка последующей декларации переменной с таким же именем вызовет ошибку.

```js
let foo = "foo";
let foo = "bar";
//Uncaught SyntaxError: Identifier 'foo' has already been declared

const foo = "foo";
const foo = "bar";
//Uncaught SyntaxError: Identifier 'foo' has already been declared
```

При декларации с помощью `var` данное правило не действует:

```js
var foo = "foo";
var foo = "bar";
console.log(foo); //bar
```