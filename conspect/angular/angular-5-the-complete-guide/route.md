---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Route
seoDescription:  Работа с роутером и ссылками в Angualr5.
seoKeywords: angular, spa, route, routerLinkActive
date: 2018-01-14 23:00:00
---
# Route

## Route (роутинг)

В модуле:

```typescript
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'servers', component: ServersComponent},
];

imports: [
  //...
  RouterModule.forRoot(appRoutes)
],
```

В `app.component.html`:

```typescript
<div class="row">
  <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
    <router-outlet></router-outlet>
  </div>
</div>
```

## Router links

Для ссылок роутера есть специальное свойство `routerLink`, которое в отличие от `href` не перезагружает страницу:

```html
<li role="presentation" class="active"><a routerLink="/">Home</a></li>
<li role="presentation"><a routerLink="/servers">Servers</a></li>
<li role="presentation"><a routerLink="/users">Users</a></li>
```

или:

```html
<li role="presentation"><a [routerLink]="['/users']">Users</a></li>
```

## Виды ссылок

+ /link - абсолюный путь
+ link или ./link - относительный путь
+ ../../link - относительный путь с указанием вернуться на предыдущий уровень 2 раза

## Стили ссылок роутера

```html
<li 
  role="presentation" 
  routerLinkActive="active"
  [routerLinkActiveOptions]="{exact: true}">
  <a routerLink="/">Home</a>
</li>
<li 
  role="presentation"
  routerLinkActive="active">
  <a routerLink="/servers">Servers</a>
</li>
```

Свойство `routerLinkActive` применяет указанный класс к активной ссылке. 
Свойство `[routerLinkActiveOptions]="{exact: true}"` применяется к ссылке на главную страницу `'/'`, эта опция говорит о том, что совпадение *url* должно быть точным, иначе любая ссылка, содержащая `/` будет расценена как домашняя и пункт `Home` будет всегда активным.