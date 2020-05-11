---
title:  Классы
description: Классы | TypeScript.
keywords: Классы | Typescript
date: 2019-11-27 13:00:00
---

## Базовый пример

```typescript
interface IPoint {
  x: number;
  sum(): number;
}

class BasePoint implements IPoint {
  private z: number = 3;

  //короткий вариант записи
  public constructor(public readonly x: number, protected y: number) {}

  public sum(): number {
    return this.x + this.y + this.z;
  }
}

class Point extends BasePoint {
  public constructor(x: number, y: number) {
    super(x, y);
  }
}

const p = new Point(2, 2);
```

## Singleton

```typescript
class Singleton {
    private static _instance: Singleton;

    private constructor() {
        public static getInstance(): Singleton {
        if (!Singleton._instance) {
            Singleton._instance = new Singleton();
        }
        return Singleton._instance;
    }
}

const inst1: Singleton = Singleton.getInstance();
const inst2: Singleton = Singleton.getInstance();
const inst3: Singleton = Singleton.getInstance();
```

## Абстрактный класс

Абстрактный класс может иметь как абстрактные, так и реализованные методы.

```typescript
interface IPoint {
  x: number;
  y: number;

  sum(): number;
}

abstract class BasePoint implements IPoint {
  public abstract x: number;
  public abstract y: number;

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public abstract sum(): number;
}

class Point extends BasePoint {
  public constructor(public x: number, public y: number) {
    super();
  }

  public sum(): number {
    return this.x + this.y;
  }
}

const point: Point = new Point(1, 2);
point.getX(); // 1
point.sum(); // 3
```