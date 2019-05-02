---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Observable
seoDescription:  Stream и работа с Observable в Angular5.
seoKeywords: angular, spa, route, observable
date: 2018-01-15 08:00:00
---
# Observable

## Observable

`Observable` - это название механизма, который используется в *Angular* для программирования асинхронных потоков данных в декларативном стиле. `Observable` является синонимом термина `stream`. К асинхронным потокам данных обычно относятся такие концепции, как *события*, *http запросы* и *триггеры* в коде.

Данный механизм позволяет создавать объекты, инициирующие асинхронные потоки (*stream* или *observable*) и объекты, которые за ними наблюдают (*observer*).

Над *observable* можно производить различные операции, например, их можно создавать, комбинировать и фильтровать. Более того практически все что угодно может быть потоком. Потоковое программирование это очень гибкая концепция, позволяющая реализовывать необходимую логику минимальным количеством кода.

Для расширенной реализации *observable* в *Angular* используется сторонняя библиотека *Reactive Extensions* (*RxJS*).

Работа с потоками стоится на двух объектах - *observable* и *observer*. Эти методы представляет один и тот же объект, что делает удобным реализацию данного механизма в виде сервиса.

Observableимеет 3 состояния: 
+ обработка данных
+ успешное завершение обработки
+ ошибка обработки

## Interval

`rxjs/Rx` - дает дополнительные возможности для `Observable`. Создадим объект класса `Observable`, который будет отправлять и принимать сообщения. Для отправки сообщений используем метод `interval()`, который отправляет последовательные числа от нуля через заданный промежуток времени. Для приема сообщений используем метод `subscribe()`, в который передадим `callback`, выводящий каждое сообщение в консоль.

```typescript
	import { Component, OnInit } from '@angular/core';
	import { Observable } from 'rxjs/Observable';
	import 'rxjs/Rx';
	
	//...
	export class HomeComponent implements OnInit {
	//...
	  ngOnInit() {
	    const obsExample = Observable.interval(1000);
	    obsExample.subscribe( num => console.log(num) );
	  }
	}
```

## Создание своего Observable

У класса Observable есть метод `create()`, который создает новый экземпляр `Observable`.

```typescript
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';
//...
  const myObservable = Observable.create((observer: Observer<string>) => {
    setTimeout(() => {
      observer.next('first package');
    }, 2000);
    setTimeout(() => {
      observer.next('second package');
    }, 4000);
    setTimeout(() => {
      // observer.error('this does not work');
      observer.complete();
    }, 5000);
    setTimeout(() => {
      observer.next('third package');
    }, 6000);
  });

  myObservable.subscribe(
    (data: string) => { console.log(data); },
    (error: string) => { console.log(error); },
    () => { console.log('completed'); }
  );
```