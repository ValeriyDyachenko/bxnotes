---
title: Обязательные параметры
seoDescription: Обязательные параметры в JavaScript.
seoKeywords: js
date: 2019-07-06 11:00:00
origin: <a rel="nofollow" href="https://gist.github.com/MarkTiedemann/17ebf5b38b5b7566478de7f623e1defd" target="_blank">An Easier Way to Enforce Required Parameters in ES6</a>
---
# Обязательные параметры

Если в качестве дефолтного параметра указать функцию, бросающую ошибку, то явное указание данного параметра станет обязательным, иначе произойдет выброс ошибки.

```js
const throwIfMissing = p => { throw new Error(`Missing parameter: ${p}`) }
const foo = (mustBeProvided = throwIfMissing`mustBeProvided`) => {}
foo() // ==> Error: Missing parameter: mustBeProvided
```

Пример использования данного подхода:

```js
const x = require('throw-if-missing')

const login = ({ username = x`username`, password = x`password` } = {}) => {}
login({ username: 'C-3PO' }) // ==> Error: Missing password
```

<br />

### P.S.

Вы могли заметить, в примере выше такой код:

```js
x`username`
```

Это <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates" target="_blank">Tagged templates</a>. Вместо этого, можно было бы написать:

```js
x('username')
```

Но автор использовал **Tagged templates**, чтобы сэкономить 2 символа и сделать код более лаконичным.
