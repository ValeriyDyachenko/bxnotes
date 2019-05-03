---
layout: post.njk
tags: [post, postInConspect:javascript-patterns]
conspect: javascript-patterns
section: lang
subject: js
title: ECMAScript 5
seoDescription: Строгий режим в ECMAScript 5.
seoKeywords: js, es5
date: 2017-11-14 01:00:00
---
# ECMAScript 5

Наиболее значимое нововведение в 5 версии ECMAScript это `strict mode` (строгий режим), который удаляет из языка некоторые особенности, делая программы проще и надежнее.

Вы можете использовать `strict mode` как в области видимости функций, так и в глобальном, или в начале строки, передаваемой в `eval()`.

```js
function my() { 
  "use strict"; 
  // остальная часть функции 
}
```

В дальнейшем планируется использование строго режима, как единственно возможного.