---
title: Композиция
seoDescription: Композиция в JavaScript?
seoKeywords: js, composition
date: 2019-07-11 00:00:00
---
# Композиция

> Если вы используете цепь промисов &nbsp; вы уже используете композицию.

```js
new Promise(resolve => setTimeout(resolve, 1500))
  .then(() => 300)
  .then((v) => v - 100)
  .then(console.log)
```

Пример функциональной композиции:

```js
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
};

const g = n => n + 1;
const f = n => n * 2;

const doStuff = x => {
  const afterG = g(x);
  trace('after g')(afterG);
  const afterF = f(afterG);
  trace('after f')(afterF);
  return afterF;
};

doStuff(20);
```

Еще пример:

```js
const compose = (f, g) => x => f(g(x));

const double = n => n * 2;
const inc = n => n + 1;

const transform = compose(double, inc);

transform(3); // 8
```

> Композиция имеет множество форм. Суть разработки софта &nbsp; это композиция.
