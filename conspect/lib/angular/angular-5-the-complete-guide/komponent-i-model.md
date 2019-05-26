---
title: Компонент и модель
seoDescription: Angilar создание обычных и вложенных компонентов через CLI. Описание модели.
seoKeywords: angular, spa, cli, component, model
date: 2018-01-14 07:00:00
---
# Компонент и модель

## Компонент

+ Создание компонента: `ng g c recipes`
+ Создание вложенного компонента: `ng g c recipes/recipe-list`
+ Дополнительные параметры: -`-spec false` (можно добавить чтобы не создавать тестовый файл, например `ng g c recipes --spec false`)

## Модель

*Модель* - это файл формата *Typescript*. Создадим файл `\app\recipes\recipe.model.ts`:

```typescript
export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, description: string, image: string) {
    this.name = name;
    this.description = description;
    this.imagePath = image;
  }
}
```