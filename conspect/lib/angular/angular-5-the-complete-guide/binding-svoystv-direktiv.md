---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: Binding свойств директив
seoDescription: Привязка входных и вторичных свойств директивы атрибута в Angular5.
seoKeywords: angular, spa, binding
date: 2018-01-14 19:00:00
---
# Binding свойств директив

Базовый вариант:

```html
<p appBetterHilight [defaultColor]="'green'" [highLightColor]="'yellow'">
  basic highlight style
</p>
```

Имя директивы может быть пропущено, если оно совпадает с именем входной переменной:

```typescript
@Input('appBetterHilight') highLightColor: string = 'red';
```

```html
<p 
  [appBetterHilight]="'yellow'" 
  [defaultColor]="'green'"
>
  basic highlight style
</p>
```

Существует сокращенный вариант написания имен без скобок:

```html/2
<p 
  [appBetterHilight]="'yellow'" 
  defaultColor='green'
>
  basic highlight style
</p>
```
