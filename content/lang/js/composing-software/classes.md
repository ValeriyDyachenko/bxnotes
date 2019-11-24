---
title: Композиция и классы
seoDescription: Композиция и классы
seoKeywords: js, композиция, классы
date: 2019-09-16 00:00:00
---
# Композиция наследования в классах:

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
