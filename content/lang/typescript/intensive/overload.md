---
title:  Перегрузки
description: Перегрузки | TypeScript.
keywords: Перегрузки | Typescript
date: 2019-11-27 11:00:00
---

Сигнатура имплементации всегда последняя и обобщает предыдущие сигнатуры.

```typescript
function summ(a: number, b: string): string;
function summ(a: number, b: number, c: string): string;
function summ(a: string, b: number): string;
function summ(...args: (string | number)[]): number {
  let result = 0;
  for (let n of args) {
    result += Number(n);
  }
  return result;
}
```

Это позволяет ограничить варианты использования функции, например, в примере выше, мы разрешили 2 или 3 аргумента с определенным порядком.