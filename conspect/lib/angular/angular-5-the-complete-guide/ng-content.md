---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: ng-content
seoDescription: Использование тега ng-content и размещения верстки из шаблона в теге вызова компонента в Angular5.
seoKeywords: angular, spa, ng-content
date: 2018-01-14 13:00:00
---
# ng-content

*Angular* позволяет разместить верстку в теге подключения компонента.

В теге компонента разместим часть кода, который хотим передать в шаблон:

```html/3-6
<app-server-element 
*ngFor="let serverElement of serverElements"
[srvElement]=serverElement>
  <p>
  <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
  <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
  </p>
</app-server-element>
```

В шаблоне компонента `app-server-element`, подсвеченный контент будет выведен в теге `ng-content`:

```html
<h1>Server element</h1>
<ng-content></ng-content>
```