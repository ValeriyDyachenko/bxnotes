---
title: Mapping
seoDescription: Mapping | TypeScript.
seoKeywords: Mapping | Typescript
date: 2019-11-27 09:00:00
---
# Mapping

Пример реализации мэппинга для получения `not read only` типов из `readonly`:

```typescript
type NotReadonly<T> = {
  -readonly [P in keyof T]: T[P];
};

type Acc = {
  readonly firstName: string;
  readonly age: number;
};

let acc: NotReadonly<Acc> = {
  firstName: "Vasili",
  age: 33
};

acc.firstName = "Vasiliy";
acc.age = 32;
```

Исключение поля из интерфейса:

```typescript
interface FullName {
  first: string;
  last: string;
}
type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
type FirstName = Without<FullName, "last">;
```