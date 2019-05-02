---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: lang
subject: js
title: Область видимости. Scope.
seoDescription: Виды контекста и особенности работы с ним в JavaScript.
seoKeywords: var, let, const, js, scope
date: 2018-09-22 02:00:00
---
# Область видимости. Scope.

Переменные и выражения в JS существуют в определенном контексте, в котором могут быть доступны. Контексты могут быть вложены друг в друга иерархически. При этом дочерние контексты имеют доступ к родительским, но не наоборот.

Самый верхний уровень программы называется глобальным контекстом. В глобальном контексте находятся функции, которые имеют свой собственный контекст, в котором могут находиться другие функции.

В ES6 появился контекст видимости блока, который используется в таких конструкциях, как `if`, `for ... of`, `foreach`. Для его использования переменная должна быть объявлена с помощью `let` или `const`.

```js
//глобальный контекст
var foo = "foo";

//контекст дочерней функции
function context1() {
  
  console.log(foo) // "foo"
  
  //контекст дочерней функции
  function context2() {
    
    console.log(foo) 
    // undefinded из-за всплытия, в функции есть объявление var foo

    var foo = "bar"
    //переопределение с помощью var в локальной области функции

    if (true) {
      //область видимости блока
      let foo = "baz"
      console.log(foo) //"baz"
    }

  console.log(foo) //"bar"
  }
  context2();

  console.log(foo) // "foo"

  foo = "bax";
  // переопределение в глобальном контексте
}

console.log(foo); // "foo"
context1();
console.log(foo); // "bax"
```