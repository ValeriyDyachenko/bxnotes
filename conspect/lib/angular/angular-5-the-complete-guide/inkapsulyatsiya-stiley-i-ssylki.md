---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: Инкапсуляция стилей и ссылки
seoDescription: Режимы инкапсуляции стилей, локальная ссылка в шаблоне Angular. Доступ к шаблону и DOM из компонента с помощью @ViewChild и @ContentChild.
seoKeywords: angular, spa, ViewEncapsulation, @ViewChild, @ContentChild
date: 2018-01-14 12:00:00
---
# Инкапсуляция стилей и ссылки

## Инкапсуляция стилей

*Ангулар* использует инкапсуляцию стилей компонентов. Стили элементов должны быть прописаны непосредственно в компонентах. Это дает возможность использовать в различных компонентах различные стили с одинаковым названием.

Инкапсуляцию можно отключить, если в декораторе компонента прописать: `encapsulation: ViewEncapsulation.None`

Варианты инкапсуляции: 
+ `ViewEncapsulation.Emulated` кроссбраузерная инкапсуляция 
+ `ViewEncapsulation.Native` инкапсуляция через shadow DOM

## Локальная ссылка в шаблоне

Любой *html* элемент может иметь на себя ссылку в шаблоне:

```html
<input 
  type="text" 
  class="form-control" 
  #serverNameInput>
```

Теперь, переменаая `serverNameInput`, будет содержать *html* код данного элемента.
Использовать эту переменную можно только в шаблоне, например:

```typescript
<button
  class="btn btn-primary"
  (click)="onAddServer(serverNameInput)">Add Server</button>
```

В компоненте нужно явно указать тип в методе:

```typescript
onAddServer(inputEl: HTMLInputElement) {
  this.serverCreated.emit({serverName: inputEl.value, serverContent: this.newServerContent});
```

## Доступ к шаблону и DOM из компонента с @ViewChild

**Данный метод НЕ рекомендуется использовать, предпочтительнее пользоваться директивами а не прямым доступом к DOM.**

В шаблоне:

```html
<input 
      type="text" 
      class="form-control" 
      #serverNameInput>
```

В компоненте:

```typescript
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef} from '@angular/core';

export class CockpitComponent implements OnInit {	
  @ViewChild('serverNameInput') serverNameInput: ElementRef;
```

Теперь значение инпута доступно через `this.serverNameInput.nativeElement.value`

## @ContentChild

Если элемент, к которому нужно получить доступ из компонента находится в теге внешнего шаблона, например:

```html
<app-server-element 
  *ngFor="let serverElement of serverElements"
  [srvElement]=serverElement>
    <p #contentParagraph>
      <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
      <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
    </p>
</app-server-element>	
```

То вместо `@ViewChild` используется `@ContentChild`. Не забудьте импортировать класс `ContentChild`. Тип переменной `ElementRef`.