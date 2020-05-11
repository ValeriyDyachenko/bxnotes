---
title:  Generic
description: Generic | TypeScript.
keywords: Generic | Typescript
date: 2019-11-27 08:00:00
---

Generic - это аргумент для типа. Как у функции есть аргумент, так и у типа может быть аргумент.

Generic types работают с интерфейсами, типами, алиасами, функциями, классами

```typescript
interface IAccount<ID> {
    id: ID; // допустим, в зависимости от бд id может быть либо числом, либо строкой
    name: string
}

const admin = IAccount<string> = {
    id: 'kfdsjlJKLlkdf332df',
    name: 'root',
}
```

Здесь мы сказали, что интерфейс **IAccount** принимает некий тип, и присваивает его полю **id**. Как видим, передав подходящий тип, теперь можно динамически гибко описывать новые типы.

Ограничение generic типов **extends**:

```typescript
interface IAccount<ID extends number | string> {
  id: ID; // допустим, в зависимости от бд id может быть либо числом, либо строкой
  name: string;
}
```

По умолчинию:

```typescript
interface IAccount<ID = string> {
  id: ID; // допустим, в зависимости от бд id может быть либо числом, либо строкой
  name: string;
}
```

Пример с расширением generic type и значением по умолчанию:

```typescript
interface IAccount<GeneralInfo extends { isOnline: boolean }, ID = string> {
  id: ID;
  name: string;
  info: GeneralInfo;
}
```

Пример generic type для функции:

```typescript
function getProperty<Obj, Key extends keyof Obj>(obj: Obj, key: Key) {
  return obj[key];
}

getProperty({ name: "Vasiliy" }, "name");
```

## Condition type

```typescript
// T extends U ? X : N

type notUndefined<T> = T extends undefined | null ? never : T;

const notUnd: notUndefined<string | undefined | null> = "abcd";
// корректно, строка есть в Generic и строка не undefined или null.
```

Тип, который возьмет возвращаемый тип функции, которая является первой в массиве:

```typescript
const arr: [() => boolean, string] = [() => true, "qwerty"];

type FirstType<T> = T extends [infer U, ...unknown[]]
  ? // infer это захват типа, был Tuple type, мы захватили его первый элемент
    U extends (...args: any[]) => infer R
    ? R
    : never
  : never;

const bool: FirstType<typeof arr> = true;
```

Тип выведенный из возвращаемого значения фйнкции или ее аргументов (кроме аргументов, являющихся функцией):

```typescript
type NonFunction<T> = T extends Function ? never : T;
type FunctionParamsAndReturn<T> = T extends (...args: infer Args) => infer R
  ? NonFunction<Args[keyof Args]> | R
  : never;
function fn(_a: string, _b: boolean): number {
  return 1;
}
const c: FunctionParamsAndReturn<typeof fn> = 1; // OK
const c1: FunctionParamsAndReturn<typeof fn> = "asd"; // OK
const c2: FunctionParamsAndReturn<typeof fn> = true; // OK
const c3: FunctionParamsAndReturn<typeof fn> = Symbol(); // NO
```

## Ограничение Generic

Описывая **generic** типы, вы можете ограничить их тип, используйте для этого ключевое слово ```extends```:

```typescript
// T extends Y

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Теперь мы знаем, что у arg есть метод kength
    return arg;
}
```

Еще пример:

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```