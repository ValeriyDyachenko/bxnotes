---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide]
conspect: angular-5-the-complete-guide
section: angular
title: Связывание свойств и событий
seoDescription: Создание кастомных событий и их обработчиков. Импорт свойств родительского компонента.
seoKeywords: angular, spa, event, @Input(), @Output()
date: 2018-01-14 11:00:00
---
# Связывание свойств и событий

## Связывание свойств

Элемент, который использует *внешнее свойство*, должен содержать его описание и *декоратор* `@Input()`:

```typescript
import { Component, OnInit, Input } from '@angular/core';

export class ServerElementComponent implements OnInit {
  @Input() element: {type: string, name: string, content: string};
  //..
}
```

В данном примере связывается *свойство* (объект с ключами *type*, *name*, *string*) с переменной родительского компонента. Имя переменной в родительском компоненте в данном случае должно быть `element`.

В декоратор `@Input()` можно передать аргумент, который свяжет переменную с внешним именем:

```typescript
@Input('srvElement') element: {type: string, name: string, content: string};
```

Это используется, когда родительский копонент передает данные дочернему компоненту, например, внутри `*ngFor`:

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <app-child *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
    </app-child>
  `
})
```

## Кастомные события

Компонент откуда всплывает событие:

```typescript
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent:string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent:string}>();

  newServerName = '';
  newServerContent = '';

  onAddServer() {
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }
}
```

Данный компонент выкидывает наружу объекты `serverCreated` и `blueprintCreated`.

Связывание объекта события в шаблоне родительского компонента:

```html
<app-cockpit 
  (serverCreated)="onServerAdded($event)"
  (blueprintCreated)="onBlueprintAdded($event)">
</app-cockpit>
```

**Синтаксис события `(event)="method()"` нужно писать в теге компонента, в котором event всплывает, `method()` это метод данного компонента.**

Компонент приложения, в котором обрабатывается событие:

```typescript
export class AppComponent {
    serverElements = [{type: 'server', name : 'fedora', content: 'secret'}];
    onServerAdded(serverData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
            type: 'server',
            name: serverData.serverName,
            content: serverData.serverContent
        });
    }
    onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
            type: 'blueprint',
            name: blueprintData.serverName,
            content: blueprintData.serverContent
        });
    }
}
```

Происходит следующее: 

**Внутренний компонент выкидывает наружу объект события, внешний компонент биндит к нему свой метод, который производит действия над объектом события.**

*Алиас (псевдоним события)* может быть задан строковым аргументом декоратора `@Output()`:

```typescript
@Output('newName') serverCreated = new EventEmitter<{serverName: string, serverContent:string}>();
```