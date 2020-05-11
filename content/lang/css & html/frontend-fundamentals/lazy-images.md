---
title:  Ленивые изображения
description: Ленивые изображения
keywords: Ленивые изображения
date: 2019-12-03 00:03:00
origin: <a rel="nofollow" href="https://developer.mozilla.org/ru/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images" target="_blank">MDN</a>, <a rel="nofollow" href="https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video" target="_blank">Google developers</a>
---

## Img

1) Принцип простой, у изображений по умолчанию в ```src``` находится некое превью, когда элемент оказываются во *viewport*, то ```src``` (и иногда ```srcset```) заполняются с помощью *js*:

```html
<img  class="lazy" 
      src="placeholder-image.jpg"
      data-src="image-to-lazy-load-1x.jpg"
      data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x"
      alt="I'm an image!">
```

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

Как вариант, можно использовать *css* свойство ```background-image``` для ленивой загрузки, добавляя класс `.active` элементу в нужный момент:

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

## Атрибут srcset

Атрибут ```srcset``` превращает обычный ```img``` в "умный" компонент, который покажет нужное изображение на нужном разрешении. Это работает так - браузер смотрит на sizes и понимает какой ширины изображение требуется, затем смотрит в ```srcset``` и выбирает наиболее подходящее по размеру. В старых браузерах сработает только то, что в атрибуте ```src```.

```html
<img srcset="elva-fairy-320w.jpg 320w,
             elva-fairy-480w.jpg 480w,
             elva-fairy-800w.jpg 800w"
     sizes="(max-width: 320px) 280px,
            (max-width: 480px) 440px,
            800px"
     src="elva-fairy-800w.jpg" alt="Elva dressed as a fairy">
```

Можно подобрать картинку под плотность пикселей:

```html
<img  srcset="elva-fairy-320w.jpg,
            elva-fairy-480w.jpg 1.5x,
            elva-fairy-640w.jpg 2x"
      src="elva-fairy-640w.jpg" alt="Elva dressed as a fairy">
```

## Picture

```Srcset``` позволяет браузеру определить наиболее подходящее под разрешение пользователя изображение. Но иногда стоит другая задача - показывать не оптимальное, а строго определенное изображение на нужном разрешении (это могут быть совершенно разные изображения). В таком случае поможет тег ```picture```:

```html
<picture>
  <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
  <source media="(min-width: 800px)" srcset="elva-800w.jpg">
  <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva">
</picture>
```