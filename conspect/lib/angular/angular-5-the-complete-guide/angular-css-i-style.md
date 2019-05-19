---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: Angular CSS и Style
seoDescription: Создание динамических стилей и классов приложения.
seoKeywords: angular, spa, ngStyle, ngClass
date: 2018-01-14 05:00:00
---
# Angular CSS и Style

## ngStyle динамические стили

Сформируем в конструкторе компонента варианты значений, в зависимости от которых назначим стиль `backgroundColor` у элемента.

`\app\server\server.component.ts`:

```typescript
constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
}
```

`constructor() `- метод конструктор в *TypeScript*

`\app\server\server.component.html`:

```html
<p [ngStyle]="{backgroundColor: getColor()}">
  {{ 'Server' }} id is {{ getServerID() }} and status is {{ serverStatus }}
</p>
```

Название директивы - `ngStyle`, квадратные скобки ипользуются для связывания.

`\app\server\server.component.ts`:

```typescript
getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
}
```

таким образом, директива `ngStyle` связывается с функцией, которая возвращает цвет для `backgroundColor`

Вместо `{backgroundColor: getColor()}` можно написать `{'background-color': getColor()}`. Это *js* object. Ключ - название свойства. Вариант с *КэмелКейс* ангуляровский синтаксис, но в кавычках можно вписать и традиционный *css* вариант написания.