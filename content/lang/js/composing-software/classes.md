---
title: Композиция через наследование
seoDescription: Композиция и классы в JavaScript
seoKeywords: JavaScript, js, композиция, классы, наследование
date: 2019-09-16 00:00:00
---
# Композиция через наследование:

Композиция в контексте класса, означает расширение базовых свойств класса, свойствами родительского класса. Реализуется такая композиция через наследование:

```js
class Foo {
  constructor () {
    this.a = 'a'
  }
}

class Bar extends Foo {
  constructor (options) {
    super(options);
    this.b = 'b'
  }
}

const myBar = new Bar(); // {a: 'a', b: 'b'}
```
