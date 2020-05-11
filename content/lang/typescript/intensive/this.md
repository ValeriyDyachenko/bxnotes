---
title:  Типизация контекста
description: Типизация контекста | TypeScript.
keywords: Типизация контекста | Typescript
date: 2019-11-27 12:00:00
---

`this` позволяет типизировать контекст вызова, например:

```typescript
function getFullName(
  this: { name: string; surname: string },
  inUpperCase = false
): string {
  const fullName = `${this.name} ${this.surname}`;
  return inUpperCase ? fullName.toUpperCase() : fullName;
}

let account = {
  name: "Ihor",
  surname: "Nepipenko",
  getFullName
};

account.getFullName();
```

Таким образом, для того, чтобы использовать данную функцию, в контексте объекта должны присутствовать `name` и `surname`, иначе TS выбросит ошибку.