---
title:  Route и статика
description:  Как передать статичные данные в компонент с помощью настроек роута.
keywords: angular, spa, route, data
date: 2018-01-15 06:00:00
---

Статичные данные можно передать в `Route` с помощью ключа `data`:

```typescript
{
  path: 'page404', 
  data: {message: 'error 404'}, 
  component: Page404Component,
}
```

Шаблон компонента: 

```html
<h3>{{message}}</h3>
```

Компонент:

```typescript
export class Page404Component implements OnInit {
  message: string;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.message = data['message'];
      }
    );
  }
}
```