---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: События и жизненный цикл
seoDescription: Жизненный цикл приложения и события в Angular5.
seoKeywords: angular, spa, events
date: 2018-01-14 14:00:00
---
# События и жизненный цикл

В ходе выполнения приложения происходят различные изменения и процессы, которые составляют *жизненный цикл приложения*. *Angular* позволяет запускать определенный код, когда наступает какое-либо событие.

Часто используемые события:

+ `ngOnChanges`
+ `ngOnInitngDoCheck`
+ `ngAfterContentInit`
+ `ngAfterContentChecked`
+ `ngAfterViewInit`
+ `ngAfterViewChecked`
+ `ngOnDestroy`

Хорошей практикой является применение *интерфейсов* используемых *событий*:

```typescript
import { Component, OnInit, OnChanges, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

export class CockpitComponent implements OnInit, ngOnChanges {
    //...
}
```

`ngOnChanges` принимает *аргумент*, импортируйте `SimpleChanges` из `@angular/core` и укажите *тип объекта* в *методе*

```typescript
ngOnChanges(changes: SimpleChanges) {
  console.log(changes);
}
```