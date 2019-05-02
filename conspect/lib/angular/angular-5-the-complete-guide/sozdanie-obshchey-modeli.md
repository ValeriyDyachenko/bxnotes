---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: Создание общей модели
seoDescription: Создание модели в Angular, для использования в компонентах. Короткий синтаксис в конструкторе.
seoKeywords: angular, spa, model
date: 2018-01-14 09:00:00
---
# Создание общей модели

В директории `app` создадим папку `shared`, и в ней файл `indigrients.model.ts`:

```typescript
export class Indigrient {
  public name: string;
  public amount: number;

  constructor (name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
```

Данный код можно заменить на короткий вариант:

```typescript
export class Indigrient {
  constructor (public name: string, public amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
```