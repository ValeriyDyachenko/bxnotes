---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: lang
subject: js
title: Строитель
seoDescription: Обзор паттерна "Строитель" и его реализация в JavaScript.
seoKeywords: js, строитель, паттерны
date: 2018-09-22 08:00:00
---
# Строитель

Строитель относится к порождающим паттернам.

Используется для создания объектов со сложными состояниями. Упрощает процесс создания таких объектов за счет использования строителей. А так же имеет дополнительный слой абстракции - директора, который управляет строителями.

Рассмотрим следующий пример. Допустим, на сайте присутствует баннер. В зависимости от размера окна, в котором отображается сайт, баннер имеет разные характеристики: ширину, высоту, изображение. Со временем могут появиться новые характеристи, это следует учесть, чтобы сделать легко обслуживаемый код. Решим задачу с помощью паттерна "Строитель".

Для начала создадим класс баннера.

```js
class Banner {
    constructor(params) {
        this.url = params.url;
        this.lowResImg = params.lowResImg;
        this.highResImg = params.highResImg;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    setImg(img) {
        this.currentImg = img;
    }
    render() {
        let banner = document.getElementById("banner");
        banner.style.width = this.width + "px";
        banner.style.height = this.height + "px";
        banner.setAttribute('src', this.currentImg);
        banner.setAttribute('data-url', this.url);
        document.body.appendChild(banner);
    }
}
```

В нашем примере, класс Banner имеет метод `render()`, который получает элемент с `id="banner"` и отрисовывает его в зависимости от параметров.
Теперь создадим базовый строитель и реализации строителей для низкого и высокого разрешения.

```js
class BuilderBanner {
    constructor(params) {
        this.banner = new Banner(params);
    }
    renderBanner() {
        this.banner.render();
    }
}


class BuilderLowResBanner extends BuilderBanner {
    setWidth(width) {
        this.banner.setWidth(320);
    }
    setHeight(height) {
        this.banner.setHeight(100);
    }
    setImg(img) {
        this.banner.setImg(this.banner.lowResImg);
    }
}


class BuilderHighResBanner extends BuilderBanner {
    setWidth(width) {
        this.banner.setWidth(820);
    }
    setHeight(height) {
        this.banner.setHeight(400);
    }
    setImg(img) {
        this.banner.setImg(this.banner.highResImg);
    }
}
```

Осталось реализовать директора, для управления строителями.

```js

class DirectorBanner {
    constructor(builder) {
        if (! builder instanceof BuilderBanner) {
            throw "not builder object passed";
        }
        this.builder = builder;
    }
    constructBanner() {
        this.builder.setWidth();
        this.builder.setHeight();
        this.builder.setImg();
    }
    renderBanner() {
        this.builder.renderBanner();
    }
}
```

Теперь можно написать реализацию работы с данными классами. Так выглядит клиентский код:

```js
initBanner(); 
// первичная инициализация

window.onresize = () => initBanner(); 
// перерисовка при масштабировании страницы

//функция инициализации:
function initBanner() {
    const bannerParams = {
        url: "/some-page.html",
        lowResImg: "awesome-mob.jpeg",
        highResImg: "avesome-desc.jpeg"
    };
    let bulder = window.innerWidth > 819 
        ? new BuilderHighResBanner(bannerParams)
        : new BuilderLowResBanner(bannerParams);
    let director = new  DirectorBanner(bulder);
    director.constructBanner();
    director.renderBanner();
}
```

Можно было бы всю логику реализовать без разбивки на классы. Тогда не пришлось бы создать несколько уровней абстракции в виде классов баннера, строителей, и директора. Возможно, мы бы в таком случае потратили меньше времени на реализацию данной задачи. Но паттерны окупаются в долгосрочном периоде. В реальных задачах данных больше, а структуры сложнее. 

В неструктурированном коде сложно разобраться и поддерживать. Паттерн "Строитель" значительно упрощает клиентскую часть кода, при этом его классы и методы имеют ясное назначение и в них будет легко разобраться и внести необходимые изменение даже спустя длительное время.