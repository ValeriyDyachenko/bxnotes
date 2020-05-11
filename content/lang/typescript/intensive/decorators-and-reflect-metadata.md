---
title:  Декораторы и reflect-metadata
description: Декораторы и пакет reflect-metadata | TypeScript.
keywords: Декораторы и пакет reflect-metadata | Typescript
date: 2019-11-27 15:00:00
---

*Декораторы* дают возможность декларативно модифицировать класс и его члены.

Например, так:

```typescript
// написав декоратор:
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

// можно применять его для трансформаций: 
@classDecorator // <-- это декоратор
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));
```

О видах *декораторов* почитайте [соответствующий раздел документации](https://www.typescriptlang.org/docs/handbook/decorators.html). В этом разделе так же описан интересный пакет **reflect-metadata**, который позволяет получать некоторую информацию о типах прямо в *runtime*.

Для использования *декораторов*, в *tsconfig.json* нужно включить опцию **experimentalDecorators**.

В *definition file* **es5**, можно увидеть следующие декораторы (почаще заглядывайте в *definition файлы*, там много интересного):

```typescript
declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;

declare type PropertyDecorator = (
  target: Object,
  propertyKey: string | symbol
) => void;

declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

declare type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;
```

Вы можете использовать эту информацию как шпоргалку, чтобы вспомнить сигнатуру того, или иного декоратора.