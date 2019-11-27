---
title: Mixins
seoDescription: Mixins | TypeScript.
seoKeywords: Mixins | Typescript
date: 2019-11-27 14:00:00
---
# Mixins

Миксин - это функция, которая:

1) принимает конструктор,
2) декларирует класс, расширяющий конструктор,
3) добавляет классу новые поля,
4) возвращает класс.

Базовый миксин:

```typescript
type Constructor = new (...args: any[]) => {};

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class Timestamped extends Base {
    timestamp = Date.now();
  };
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const TimestampedUser = Timestamped(User);

const user = new TimestampedUser("John Doe");

console.log(user.name);
console.log(user.timestamp);
```

Миксин с конструктором:

```typescript
type Constructor = new (...args: any[]) => {};

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tag: string | null;

    constructor(...args: any[]) {
      super(...args);
      this.tag = null;
    }
  };
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const TaggedUser = Tagged(User);
const user = new TaggedUser("John Doe");

user.name = "Jane Doe";
user.tag = "janedoe";
```

Миксин с методами:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const ActivatableUser = Activatable(User);
const user = new ActivatableUser("John Doe");
console.log(user.isActivated);
user.activate();
console.log(user.isActivated);
```

Композиция миксинов:

```typescript
const SpecialUser = Activatable(Tagged(Timestamped(User)));
const user = new SpecialUser("John Doe");
```