---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Unsubscribe
seoDescription:  Пример отписки в ngOnDestroy().
seoKeywords: angular, spa, unscribe
date: 2018-01-15 09:00:00
---
# Unsubscribe

Для отписки от события, используется метод `unsubcribe()` класса `Subscription`. 

Пример реализации отписки в методе `ngOnDestroy()`:

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';
//...
export class HomeComponent implements OnInit, OnDestroy {
  customSubscription: Subscription;
  constructor() { }
  ngOnInit() {
    const myObservable = Observable.create((observer: Observer<string>) => {
      //...
    });

    this.customSubscription = myObservable.subscribe(
      //...
    );
  }

  ngOnDestroy() {
    this.customSubscription.unsubscribe();
  }
}
```