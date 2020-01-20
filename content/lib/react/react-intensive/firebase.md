---
title: firebase
seoDescription: firebase | React.
seoKeywords: firebase | React
date: 2020-01-19 02:00:00
---
# firebase

Облачное решение, позволяет использовать готовую инфраструктуру от *google* без собственного сервера.

```src/services/api.js``` (слой для абстракции):

```js
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from '../config'

class ApiService {
  constructor(fbConfig) {
    firebase.initializeApp(fbConfig)
    this.fb = firebase
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService(firebaseConfig)
```

```config.js``` (конфигурация для *firebase*):

```js
export const appName = 'fb-client'

export const firebaseConfig = {
    apiKey: "*******************************",
    authDomain: "**********.firebaseapp.com",
    databaseURL: "https://**********.firebaseio.com",
    projectId: "***********",
    storageBucket: "*********.appspot.com",
    messagingSenderId: "**********",
    appId: "**********",
    measurementId: "***********"
}
```

*Redux-saga* позволяет [подписаться на websocket](https://bxnotes.ru/conspect/lib/react/react-intensive/saga/#%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D0%BF%D0%BE-%D1%81%D0%BE%D0%BA%D0%B5%D1%82%D0%B0%D0%BC) события *firebase* и синхронизировать с ними стейт приложения.
