---
title: Тестирование
seoDescription: Тестирование | TypeScript.
seoKeywords: Тестирование | Typescript
date: 2019-11-27 16:00:00
---
# Тестирование

Рассмотрим применение такого стека:

```
npm install jasmine-core @types/jasmine karma karma-chrome-launcher karma-jasmine karma-typescript karma-mocha-reporter puppeteer -D
```

Будем тестировать эту функцию *src/function.ts*:

```typescript
/// <reference lib="es2015" />
export function sum(...values: (string | number)[]): number {
  return values.reduce((acc: number, next: string | number) => {
    if (!isString(next)) {
      return (acc += next);
    }
    return (acc += Number.isNaN(parseInt(next)) ? 0 : parseInt(next));
  }, 0);
}

function isString(param: string | number): param is string {
  return typeof param === "string";
}
```

Тест выглядит так *src/function.spec.ts*:

```typescript
import { sum } from "./function";

describe("Sum function", () => {
  it("should return right value", () => {
    expect(sum(1, 2, 3)).toEqual(6);
    expect(sum("1", "2", "3")).toEqual(6);
    expect(sum()).toEqual(0);
    expect(sum(0, 1, 2)).toEqual(3);
    expect(sum(0, "1", 2)).toEqual(3);
  });
});
```

Настроим карму - *karma.conf.js*:

```javascript
const process = require("process");
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = config => {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    plugins: [
      require("karma-jasmine"),
      require("karma-typescript"),
      require("karma-chrome-launcher"),
      require("karma-mocha-reporter")
    ],
    files: [{ pattern: "./src/**/!(index).ts" }],
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },
    reporters: ["mocha", "karma-typescript"],
    browsers: ["ChromeHeadless"],
    logLevel: config.LOG_INFO,
    singleRun: true,
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.spec.json",
      reports: {
        html: "coverage",
        text: ""
      }
    }
  });
};
```

*tsconfig.spec.json*:

```json
{
  "extends": "./tsconfig.json",
  "sourceMap": true
}
```