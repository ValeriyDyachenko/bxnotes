---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Route продолжение
seoDescription:  Параметры роутера, фрагмент, родительский роутинг, редирект в Angular5.
seoKeywords: angular, spa, route, fragment, redirect
date: 2018-01-15 02:00:00
---
# Route продолжение

## Передача параметров и фрагментов запроса

Формирование ссылки вида `/servers/2/edit?allowEdit=1#loading`:

```html
<a
  [routerLink] = "['/servers', server.id, 'edit']"
  [queryParams] = "{allowEdit: '1'}"
  fragment = 'loading'
  *ngFor="let server of servers">
  {{ server.name }}
</a>
```

Программно:

```typescript
constructor(private router: Router) { }

  this.router.navigate(
    [
      '/servers',
      id,
      'edit'
    ], 
    {
      queryParams: {allowEdit: '1'},
      fragment: 'loading'
    }
  );
```

## Получение параметров url

```typescript
//подключить класс
import { ActivatedRoute } from '@angular/router';

//инициализировать элемент класса
constructor(private route: ActivatedRoute) { }

//получить параметры и фрагмент (не реактивно)
this.route.snapshot.queryParams
this.route.snapshot.fragment

//подписаться (реактивно)
this.route.queryParams.subscribe(...);	 
this.route.fragment.subscribe(...);
```

## Родительский роутинг

Дочерние роутинги создаются следующим образом. В `app.module.ts`:

```typescript
{path: 'servers', component: ServersComponent, children: [
  {path: ':id', component: ServerComponent},
  {path: ':id/edit', component: EditServerComponent},
]},
```

## Пример использования параметров запроса

В шаблоне есть кнопка на редактирование данного элемента:

```html
<button 
  class="btn btn-primary" 
  (click)="onEdit()">
    Edit Server
</button>
```

Обработчик данного события выглядит так:

```typescript
onEdit() {
  this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
}
```

`queryParamsHandling` важный параметр, который позволяет сохранять параметры *url* при переходе.

Компонент редактирования при инициализации подписывается на изменение параметров, и на основании параметров *uri* определяет значение своей переменной:

```typescript
ngOnInit() {
  this.route.queryParams.subscribe(
    (queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1';
    }
  );
  //...
}
```

## Редирект

Рассмотрим редирект на примере *404 страницы*. Создадим настройку редиректа, нужно чтобы он находится в самом низу путей (параметры роутера в модуле) и совпадал с любым адресом. Таким образом, если запрос не соответствует запросам описанным выше, то он будет перенаправлен на *страницу 404*:

```typescript
const appRoutes: Routes = [
  //...
  {path: 'page404', component: Page404Component},
  {path: '**', redirectTo: '/page404'},
];
```

`**` в примере выше означает соответствие чему угодно. Эта последовательность полезна для создания *404 страниц* или редиректа к другим роутам.