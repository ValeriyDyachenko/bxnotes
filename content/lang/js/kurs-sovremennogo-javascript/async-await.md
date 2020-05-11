---
title:  Async/Await
description: Преимущество Asinc/Await функций. Последовательное и конкурентное выполнение кода. Запуск неизвестного числа Promise функций.
keywords: js, async, await, promise
date: 2018-09-22 15:00:00
---

Рассмотрим Promise функцию, которая вычисляет число увеличенное на 1 через 1 секунду:

```js
function plusOneAfter1Second(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(n + 1);
    }, 1000);
  });
}
```

Допустим, нужно произвести цепочку последовательных вычислений с доступом к промежуточным результатам вычислений. Чтобы лучше понять причину ввода дополнительного синтаксиса **Async/Await** рассмотрим, как бы данная задача решалась с помощью Promise.

Такой код работать не будет:

```js
var a = plusOneAfter1Second(6)
var b = plusOneAfter1Second(a)
var c = plusOneAfter1Second(b)
console.log([a, b, c]); //[Promise, Promise, Promise]
```

С помощью цепочки Promise мы можем последовательно преобразовать входные данные, но в финальной функции, при таком подходе, нельзя использовать промежуточные результаты, только конечный:

```js
plusOneAfter1Second(6)
    .then(n1 => plusOneAfter1Second(n1))
    .then(n2 => plusOneAfter1Second(n2))
    .then(n3 => plusOneAfter1Second(n3))
    .then((n1, n2, n3) => console.log([n1, n2, n3])) //[10, undefined, undefined]
```
Для того, чтобы получить промежуточные результаты, придется использовать малопонятную конструкцию вида:

```js
function addFrom(a){
    return new Promise(resolve => {
        plusOneAfter1Second(a).then((b) => {
            plusOneAfter1Second(b).then((c) => {
                plusOneAfter1Second(c).then((d) => {
                    resolve(console.log([a, b, c, d]));
                })
            })
        })
    });
}
console.log(addFrom(6)); //[6, 7, 8, 9]
```

Для решения данной проблемы и более удобной работы с Promise, был введен синтаксис Async/Await. Так как Async/Await работает с Promise, мы можем использовать изначальную функцию, возвращающую Promise:

```js
async function chainAsync(n) {
  const a = await plusOneAfter1Second(n);
  const b = await plusOneAfter1Second(a);
  const c = await plusOneAfter1Second(b);
  return [n, a, b, c];
}

chainAsync(5).then(result => {
  console.log(result); //[5, 6, 7, 8]
});
```

Данный синтаксис намного удобнее, чем пример с Promise выше. Таким образом, Async/Await функции делают код чище, лаконичней и понятнее.

## Конкурентные функции

При использовании await важно правильно спроектировать программу, разделив её на блоки, которые должны выполняться последовательно и параллельно.

Принцип данного разделения в том, чтобы сгруппировать зависимые части программы в async функции. В итоге должны получиться несколько независимых друг от друга async функций, которые могут выполняться конкурентно, так как их работа не зависит друг от друга.

```js
async function selectCarColor() {
    const colors = await getCarColors()
    const chosenColor = chooseColor(colors)
    await saveColor(chosenColor)
  }

async function selectCarType() {
    const types = await getCarTypes()
    const chosenType = chooseCarType(types)
    await saveType(chosenType)
}

(async () => {
    const colorPromise = selectCarColor() // без await функции
    const typePromise = selectCarType()   // выполняются параллельно
    const color = await colorPromise
    const type = await typePromise
    buildCar()
})()

// Последнюю функцию можно переписать так: 

(async () => {
    Promise.all([selectCarColor(), selectCarType()]).then(buildCar)
})()
```

Таким образом, функции `selectCarColor()` и `selectCarType()` выполняются параллельно, а не последовательно. Далее программа ожидает их успешного завершения и запускает финальную функцию `buildCar()`.

## Запуск неизвестного числа Promise

Задачу, когда есть неизвестное число элементов, каждый из которых нужно передать в асинхронную функцию, легко решить с помощью метода `Promise.all()`. Данный метод ожидает конкурентное завершение массива *Promise* функций.

```js
async function doAsyncWork(items) {
  const count = items.length
  const promises = []
  for (var i = 0; i < count; i++) {
    const myPromise = asyncCall(items[i])
    promises.push(myPromise)
  }
  await Promise.all(promises)
}

// Или так:
async function doAsyncWork(items) {
  const promises = items.map((item) => asyncCall(item))
  await Promise.all(promises)    // async call
}
```

Если нужно выполнить Promise функции последовательно, а не конкурентно:

```js
async function doAsyncWork(items) {
  for (const item of items) {
      await asyncCall(item)
  }
}
```