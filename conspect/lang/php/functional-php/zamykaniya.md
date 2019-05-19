---
layout: post.njk
tags: [post, postInConspect:functional-php, postInSubject:php, postInSection:lang]
conspect: functional-php
section: lang
subject: php
title: Замыкания
seoDescription: Динамические замыкания в PHP и возможности их применения.
seoKeywords: php, Closure, callback, use, bindTo()
date: 2017-11-08 14:00:00
---
# Замыкания

Замыкания в *PHP* отличаются от замыканий в *Java Script*. В *PHP* необходимо явно указывать, к каким переменным будет разрешен доступ:

```php
function concatWith(string $a): callable {
  return function (string $b) use ($a): string {
    return $a . $b;
  };
}
```

У класса `Closure` есть метод `bindTo()`, с помощью которого можно реализовать динамическое связывание:

```php
class OneNumber {
    public $one = 1;
}
$changeOneNumber = function($callback) {
  return  $callback($this->one);
};
$double = function($x) {
    return 2 * $x;
};
$testOne = new OneNumber;
$testOneChanger = $changeOneNumber->bindTo($testOne);
echo $testOneChanger($double); // print 2
```

:pencil2: **Динамическое связывание позволяет подмешать дополнительное поведение к существующему объекту. Например, можно реализовывать фильтрацию не методом класса, а с помощью замыкания. В некоторых случаях, это подобно использованию Trait.**