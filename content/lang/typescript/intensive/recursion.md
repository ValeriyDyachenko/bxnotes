---
title: Рекурсия
seoDescription: Рекурсия | TypeScript.
seoKeywords: Рекурсия | Typescript
date: 2019-11-27 10:00:00
---
# Рекурсия

Есть рекурсивное меню:

```js
const list = [
  {
    title: "Животные",
    items: [
      {
        title: "Млекопитающие",
        items: [
          { title: "Коровы" },
          { title: "Ослы" },
          { title: "Собаки" },
          { title: "Тигры" }
        ]
      }
    ]
  }
];
```

Его тип и функцию построения можно описать так:

```typescript
interface IListItem {
  readonly title: string;
  readonly item?: IListItem[];
}

function generateMenu(list: IListItem[]): string {
  let output: string = "<ul>";
  for (const item of list) {
    const items: IListItem[] | undefined = item.items;
    output += `<li><a class=${items ? "title" : ""}>${item.title}</a>`;
    if (items) {
      output += generateMenu(items);
    }
    output += "</li>";
  }
  output += "</ul>";
  return output;
}
```