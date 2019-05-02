---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Директива ngFor
seoDescription: Вывод данных в цикле с помощью директивы ngFor.
seoKeywords: angular, spa, ngFor
date: 2018-01-14 06:00:00
---
# Директива ngFor

В файле `\app\servers\servers.component.html`:

Заменим:

```html
<app-server></app-server>
<app-server></app-server>
```

На:

```html
<app-server *ngFor="let server of servers"></app-server>
```

В файле `\app\servers\servers.component.ts` определим переменную `servers`:

```typescript
servers = ['Test1', 'Test2'];
serverName = 'NewServer';

onServerCreate() {
  this.servers.push(this.serverName);
  this.serverStatus = "Server is ON";
  this.serverCreated = true;
}
```
Теперь, блоки `app-server` будут генерироваться автоматически, из списка.

Получить номер итерации можно так: 

```typescript
*ngFor="let server of servers; let i = index"
```