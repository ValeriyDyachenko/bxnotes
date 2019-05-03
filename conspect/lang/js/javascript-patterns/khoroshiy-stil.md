---
layout: post.njk
tags: [post, postInConspect:javascript-patterns]
conspect: javascript-patterns
section: lang
subject: js
title: Хороший стиль
seoDescription: Следование хорошим практикам сделает JS код чище и поможет предотвратить возможные ошибки и трудноуловимые баги.
seoKeywords: js, switch, compare, eval(), setInterval(), setTimeout(), parseInt()
date: 2017-11-14 10:00:00
---
# Хороший стиль

## switch

Break после каждого `case`, и `default` в конце.

```js
var inspect_me = 0,
result = '';
switch (inspect_me) {
  case 0:
    result = "zero";
    break;
  case 1:
    result = "one";
    break;
  default:
    result = "unknown";
}
```

## Сравнение

Использовать явное сравнение `===` и `!==`, для избегания приведения типов

```js
var zero = 0;

if (zero === false) {
  // не выполнится
}

// антипаттерн
if (zero == false) {
  // выполнится...
}
```

## eval

Избегайте `eval`, когда есть такая возможность

```js
// антипаттерн
var property = "name";
alert(eval("obj." + property));

// предпочтительно
var property = "name";
alert(obj[property]);
```

Выбирайте конструктор функции, вместо `eval`. Либо оберните `eval` функцией, чтобы не создавать глобальных переменных.

```js
console.log(typeof un); // "undefined"
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"

var jsstring = "var un = 1; console.log(un);";
eval(jsstring); // "1"

jsstring = "var deux = 2; console.log(deux);";
new Function(jsstring)(); // "2"

jsstring = "var trois = 3; console.log(trois);";
(function () {
eval(jsstring);
}()); // "3"

console.log(typeof un); // "number"
console.log(typeof deux); // "undefined"
console.log(typeof trois); // "undefined"  
```

`Eval` может модифицировать переменные вне своей области. Используйте `Function` (`new Function` и `Function` идентичны), как более безопасный вариант.

```js
(function () {
  var local = 1;
  eval("local = 3; console.log(local)"); // 3
  console.log(local); // 3
}());

(function () {
  var local = 1;
  Function("console.log(typeof local);")(); // undefined
}());
```

## setInterval(), setTimeout()

```js
// антипаттерн
setTimeout("myFunc()", 1000);
setTimeout("myFunc(1, 2, 3)", 1000);

// предпочтительно
setTimeout(myFunc, 1000);
setTimeout(function () {
  myFunc(1, 2, 3);
}, 1000);
```

## parseInt()

Используйте параметр для указания системы счисления.

```js
var month = "06",
    year = "09";
month = parseInt(month, 10);
year = parseInt(year, 10);

//Альтернативный вариант:
+"08" // результат 8
```