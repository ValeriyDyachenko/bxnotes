---
title:  Специальные возможности
description: Readonly, ReadonlyArray, as const, |, &, Type Guardian | TypeScript.
keywords: Readonly, ReadonlyArray, as const, |, &, Type Guardian | Typescript
date: 2019-11-27 05:00:00
---

## Readonly

```typescript
const test: {
  readonly foo: string;
  readonly bar?: string;
} = {
  foo: "bar"
};

test.foo = "baz"; // TS error
```

## ReadonlyArray

Тип массива, который нельзя менять.

## as const

Позволяет создавать **readonly** типы, например:

```typescript
const arr: [number] = [1] as const;
```

## | и &

Логическое **и** и **или** для создания более сложных типов.

```typescript
let line: string | number = 123;
let user: { name: string } & { age: number } = { name: "Igor", age: 33 };
```

Стоит помнить, что У **|** и **&** разный приоритет.

## Type Guardian с интерфейсами

Если объект может реализовываться несколькими интерфейсами, то можно проверить наличие специфического поля в интерфейсе, чтобы узнать, какой интерфейс представляет объект:

```typescript
interface Interface1 {
    someField: string;
}

interface Interface2 {
    anotherField: string;
}

let object: Interface1 | Interface2;

// TS определит тип как Interface1 | Interface2
object = {
    someField: 'foo';
}

if ("someField" in object) {
    // тут TS уже знает, что объект типа Interface1.
}
```

## Type guard is

Если есть функция, которая возвращает `boolean`, а мы хотим ее использовать для **type guardian**, то функция должна возвращать не `boolean`, а **is тип**, например:

```typescript
function isString(s: number | string): is string {
    return typeof s === 'string'
}
```