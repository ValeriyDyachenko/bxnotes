---
title:  Установка TypeScript
description: Установка TypeScript.
keywords: Установка Typescript
date: 2019-11-27 00:00:00
---

## Установка Typescript

`npm add typescript -D`

## Инициализация tsconfig.json

`npx tsc --init`

Npx &ndash; это утилита для запуска пакета из node_modules, аналог `./node_modules/.bin/tsc --init`

## Опции компиляции

[Описание опций компиляции](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

TS может компилировать js файлы, при этом чать типов может быть выведена автоматически, часть может быть описана в в JSDoc.

TS может работать в разном режиме строгости.

`Undefined` и `null` по умолчанию является подтипом любого типа. Рекомендуется **strictNullCheck** установить в `true` (либо установить **strict** в `true`).

Чтобы позволить или не позволить компиляцию с ошибками в TS файлах используется параметр `"noEmitOnError`

## Packages

### tslib

По умолчанию хелперы будут определяться заново в каждом транспилированном файле, что ведет к увеличению размера сборки. Для исправления есть пакет **tslib**, который заменит определение хелпера на импорт.

Установка:

`npm install tslib`

### Webpack и стандартные пакеты

```bash
npm add webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin -D
```

### Code quality tools

Для единообразия кода и следования единым правилам можно использовать eslint.

`npm add eslint -D`

`npx eslint --init`

В IDE должна быть подключена поддержка ESLint.

Пример конфигурации *.eslintrc.js*:

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: 2,
    quotes: ["error", "single"]
  }
};
```

Так же иногдв встречается TSlint (тоже ставится как npm пакет и подключается в IDE).

Пример конфигурации *tslint.json*:

```json
{
  "rules": {
    "arrow-return-shorthand": true,
    "callable-types": true,
    "class-name": true,
    "comment-format": [true, "check-space"],
    "curly": true,
    "deprecation": {
      "severity": "warn"
    },
    "eofline": true,
    "forin": true,
    "import-blacklist": [true, "rxjs/Rx"],
    "import-spacing": true,
    "indent": [true, "spaces"],
    "interface-over-type-literal": true,
    "label-position": true,
    "max-line-length": [
      true,
      {
        "limit": 140,
        "check-strings": true,
        "check-regex": true
      }
    ],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      true,
      "error",
      "warn",
      "log",
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-empty": false,
    "no-empty-interface": true,
    "no-eval": true,
    "no-inferrable-types": [false, "ignore-params", "ignore-properties"],
    "no-misused-new": true,
    "no-non-null-assertion": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "prefer-const": true,
    "quotemark": [true, "single"],
    "radix": true,
    "semicolon": [true, "always", "ignore-bound-class-methods"],
    "trailing-comma": [
      true,
      {
        "multiline": {
          "objects": "always",
          "arrays": "always",
          "functions": "ignore",
          "typeLiterals": "always",
          "imports": "always",
          "exports": "always"
        },
        "singleline": "never",
        "esSpecCompliant": true
      }
    ],
    "triple-equals": [true, "allow-null-check"],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "unified-signatures": true,
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-output-on-prefix": true,
    "no-inputs-metadata-property": true,
    "no-outputs-metadata-property": true,
    "no-host-metadata-property": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-lifecycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true
  }
}
```

### Пакет ts-node

[github.com/TypeStrong/ts-node](https://github.com/TypeStrong/ts-node).

Пакет позволяет выполнить TypeScript код прямо в консоли.

## Config

### SourceMap

В настройках tsconfig включить sourceMap. Так же его необходимо включить в конфиге вебпака.

### Раздельная конфигурация клиента и сервера

Для различных директорий могут быть переопределены правила TS, например:

- tsconfig.client.json
- tsconfig.server.json

Пример такого файла:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "target": "esnext"
  },
  "include": ["src/server/**/*.ts"]
}
```