---
title: Типы
seoDescription: Некоторые типы | TypeScript.
seoKeywords: Некоторые типы | Typescript
date: 2019-11-27 04:00:00
---
# Некоторые типы

## Object, object и {}

`object` (с маленькой буквы) означает любой не примитивный тип.

`Object` (с заглавной буквы) означает интерфейс общий для всех объектов JS:

```typescript
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
  hasOwnProperty(v: PropertyKey): boolean;
  isPrototypeOf(v: Object): boolean;
  propertyIsEnumerable(v: PropertyKey): boolean;
}
```

`{}` позволяет обозначить объект с определенным набором ключей, или пустой объект.

## Any и unknown

`unknown` более строгий тип, чем `any`, запрещает делать вызовы и обращаться к полям.

## Void

Обозначает, что функция ничего не возвращает, можно использовать и `undefinded`, но `void` ближе к классическим языкам и вызывает меньше шока при миграции с них на TS.

## []

Можно описать массив, в котором должно быть определенное число некоторых типов:

```typescript
const arr = ([number, string, string] = [1, "a", "b"]);
```