---
title:  Создание общей модели
description: Создание модели в Angular, для использования в компонентах. Короткий синтаксис в конструкторе.
keywords: angular, spa, model
date: 2018-01-14 09:00:00
---

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