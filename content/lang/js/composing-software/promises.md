---
title:  Композиция промисов
description: Композиция промисов в JavaScript.
keywords: js, промисы, promise, compose, композиция
date: 2019-09-16 04:00:00
---

Функция может вернуть *промис*, назовем такую функцию &ndash; *фабрикой промисов*. Как и <a href="/conspect/lang/js/composing-software/composition/">обычные синхронные функции</a>, *фабрики промисов* можно композировать, хотя реализация будет отличаться.

Композировать будем через ```compose```. Принцип ```compose```, похож на ```pipe```, с той разницей, что композиция выполняется справа налево, а в случае с ```pipe``` она выполнялась бы слева направо.

Чтобы лучше понять специфику композиции асинхронных функций, рассмотрим оба варианта &ndash; ```compose``` для синхронных и асинхронных функций.

## Compose для синхронных функций

### composeSync

```js
const composeSync = (...funcs) => value => 
  funcs.reduceRight((accum, func) => func(accum), value);
```

Обратите внимание на ```reduceRight```, если бы вместо него мы использовали ```reduce```, то получили бы ```pipe```.

Пример:

```js
const composeSync = (...funcs) => value => 
  funcs.reduceRight((accum, func) => func(accum), value);

const minusOne = n => n - 1;
const addTwo = n => n + 2;
const multipleTwo = n => n * 2;
const calc = composeSync(minusOne, addTwo, multipleTwo);
calc(2) // 5
```

## Compose для промисов

### composePromises

```js
const composePromises = (...promiseFabrics) => (
  promiseFabrics.reduce((f, g) => value => g(value).then(f));
);
```

Интересно, что в отличие от синхронного примера, ```composePromises``` не возвращает функцию, которая возвращает результат редьюсера. Вместо этого, сразу возвращается результат работы редьюсера. Магия в том, что этот редьюсер возвращает функцию, а не переменную. 

Из-за асинхронной природы *промисов*, для построения композиционной цепочки недостаточно просто передать результат выполнения в последующую функцию, как это было с синхронными функциями в примере выше. Вместо этого, редьюсер на каждом шаге возвращает функцию, которая выполняет *промис* текущего шага и через ```then``` отложенно запускает функцию, полученную на предыдущем шаге редьюсера.

Пример:

```js
const composePromises = (...promiseFabrics) => (
  promiseFabrics.reduce((f, g) => value => g(value).then(f))
);

const minusOne = n => Promise.resolve(n - 1);
const addTwo = n => Promise.resolve(n + 2);
const multipleTwo = n => Promise.resolve(n * 2);

const calculate = composePromises(minusOne, addTwo, multipleTwo);

calculate(2).then(console.log); // 5
```

### Редьюсер для промисов

Чтобы понять, как происходит композиция *промисов*, разложим работу редьюсера по шагам:

```js
const step1 = n => Promise.resolve(n - 1).then(undefined);
const step2 = n => Promise.resolve(n + 2).then(step1);
const step3 = n => Promise.resolve(n * 2).then(step2);
step3(2).then(console.log); // 5
```

Фактически, после объединения шагов получим: 

```js
const calculate = n => Promise
  .resolve(n * 2)
  .then(
    n => Promise.resolve(n + 2).then(
      n => Promise.resolve(n - 1).then(
        undefined
      )
    )
  )

calculate(2).then(console.log); // 5
```

В ```then``` первого шага передается ```undefined```. Это происходит от того, что в редьюсере не задано начальное значение. *Промисы* в *JavaScript* пропускают любое значение, кроме функции, как будто ничего не было:  

```js
Promise.resolve(10)
  .then(55) // будет пропущено, так как не является коллбеком
  .then(n => n + 1)
  .then(console.log) // 11
```

## Заключение

В обоих случаях, композиция реализуется с помощью ```reduce```.

В синхронной версии редьюсер аккумулирует непосредственно результат вычисления.

В версии с *промисами*, аккумулируется функция. На каждом шаге редьюсера, ранее вычисленная функция, вкладывается как обратный вызов в ```then```.