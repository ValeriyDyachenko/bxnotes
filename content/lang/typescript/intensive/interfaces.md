---
title: Типы, интерфейс и наследование
seoDescription: Типы, интерфейс и {}. Наследование. | TypeScript.
seoKeywords: Типы, интерфейс и {}. Наследование. | Typescript
date: 2019-11-27 06:00:00
---
# Типы, интерфейс и {}. Наследование.

## type, interface, и {}

Типизировать можно через `type`, `interface` или `{ }`.

```typescript
type Point = {
  x: number;
  y: number;
};

interface IPoint {
  x: number;
  y: number;
}

const point1: Point = { x: 1, y: 1 };

const point2: IPoint = { x: 1, y: 1 };

const point3: {
  x: number;
  y: number;
} = { x: 1, y: 1 };
```

Они похожи, например, класс может имплементировать как тип, так и интерфейс. Типы и интерфейсы можно смешивать с помощью объединения `&`.

Отличие в том, что интерфейс всегда описывает объект, а `type` может описать примитив. Так же `interface` _всплывает_.

## Наследование нескольких интерфейсов

```typescript
interface IStudentWorker extends IStudent, IWorker {
  // тут можно расширить или переопределить базовые интерфейсы
}
```

При мерджинге поля, которое по разному определено в наследуемых интерфейсах, может получиться что-то типа `field: string & boolean`, что идентично `never`.