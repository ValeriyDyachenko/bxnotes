---
title: Assertion, typeof, keyof
seoDescription: Assertion, typeof, keyof | TypeScript.
seoKeywords: Assertion, typeof, keyof | Typescript
date: 2019-11-27 03:00:00
---
# Assertion, typeof, keyof

## Явное утверждения (кастинг, assertion) типа через as и <>

`<someType>` перед сущностью и `as someType` после сущности это одно и тоже. Таким образом `e.target as HTMLInputElement` равносильно `<HTMLInputElement>e.target`. Это утверждение обязывает TS считать объект указанным типом. Таким образом, можно уточнять типы по ходу кода, которые TS не имеет возможности вычислить сам. Так же `as const` позволяет сделать переменную **readonly**.

## typeof

`typeof` - это захват типа. Захват происходит из области кода в область типов.

`typeof` от `const` дает литеральное значение переменной.

`Typeof` от `let` дает тип переменной.

```typescript
let userAccount = {
  name: "Vasiliy"
};

let user2: typeof userAccount = {
  name: "Igor"
};
```

Пример `typeof` от enum:

```typescript
enum Action {
  Top = 0,
  Right = 2
}

let direction: keyof typeof Actions = "Top";
```

Полезно применять, когда уже определена переменная с каким-то типом, чтобы не описывать повторно этот же тип:

```typescript
const someElement: "foo" | "bar" = "bar";
const anotherElement: typeof someElement = "foo";
```

## keyof

Литерально перечисляет ключи.

```typescript
interface Something {
  prop: number;
}

const func = (): keyof Something => "prop";
```