---
title:  формы
description: формы | React.
keywords: формы | React
date: 2020-01-19 01:00:00
---

Простую форму можно сделать на стейте. Но сложная форма реализует дополнительную логику &ndash; валидацию, варнинги, правила, кондишены, кастомные поля. Без помощи сторонних библиотек реализовать сложную форму с нуля будет проблематично.

## redux-form vs final-form

Библиотеки похожи, от одного автора. Переход с одной на другую не составит труда.

*Redux-form* обычно не приветствуется, так как нецелесообразно хранить данные обычной формы в стейте. Но бывают исключения, например, если это приложение типа CRM, которое должно оркестрировать множество взаимодействующих форм.

## formik

Простой и напоминает *redux-form*. Работает через *контекст*, это набор компонент с простым API. <a href="https://jaredpalmer.com/formik/docs/overview">Документация *formik*</a>.

Пример:

```js
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

function SignUpForm(props) {
  return (
    <div>
      <h2>Sign Up</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          email: <Field name="email" type="email" />
          password:{' '}
          <Field
            name="password"
            type="password"
            validate={(value) =>
              !value ? 'Password is a required field' : undefined
            }
          />
          <ErrorMessage name="password" />
          <button type="submit">sign up</button>
        </Form>
      </Formik>
    </div>
  )
}
```

## UI библиотеки

[UI библиотеки](https://www.npmtrends.com/rebass-vs-antd-vs-material-ui-vs-react-bootstrap-vs-reactstrap) часто предлагают свою философию по работе с формами.
