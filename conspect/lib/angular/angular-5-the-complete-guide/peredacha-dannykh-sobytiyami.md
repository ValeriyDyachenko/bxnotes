---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: Передача данных событиями
seoDescription: Передача данных между вложенными компонентами с помощью событий в Angular5.
seoKeywords: angular, spa, EventEmitter
date: 2018-01-14 16:00:00
---
# Передача данных событиями

`EventEmitter` может не возвращать значение:

```typescript
@Output() selectedItem = new EventEmitter<void>();
```

В `app-recipe-item` по клику срабатывает `this.selectedItem.emit()`, который не передает данных, а просто сообщает о факте события. В родительском компоненте `app-recipe-list` это обрабатывается так:

```typescript
<app-recipe-item
  *ngFor="let recipeEl of recipes"
  [recipe]="recipeEl"
  (selectedItem)="onRecipeSelect(recipeEl)">
</app-recipe-item>
```

В компоненте `app-recipe-list` методом `onRecipeSelect(recipeEl)` выбрасывается объект события `recipeWasSelected`, в котором находится объект выбранного рецепта. И в вышестоящем компоненте это обрабатывается так:

```html
<div class="row">
  <div class="col-md-5">
    <app-recipe-list
    (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail
    *ngIf="selectedRecipe; else infoText"
    [recipe]="selectedRecipe"
    ></app-recipe-detail>
    <ng-template #infoText>
      <p>Please, select the item</p>
    </ng-template>  
  </div>
</div>
```

Таким образом событию можно назначать не только метод, но и сразу присвоить переменной компонента переменную события, а так же пользоваться конструкцией `*ngIf else`, для отображения компонента или заглушки.