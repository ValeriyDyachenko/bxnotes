---
layout: post.njk
tags: [post, postInConspect:angular-5-the-complete-guide, postInSubject:angular, postInSection:lib]
conspect: angular-5-the-complete-guide
section: lib
subject: angular
title: HostListener и HostBinding
seoDescription: Использование декораторов HostListener и HostBinding для реагирования на события и работы со стилями в Angular5.
seoKeywords: angular, spa, @HostListener, @HostBinding
date: 2018-01-14 18:00:00
---
# HostListener и HostBinding

Декоратор `@HostListener` принимает в качестве аргумента имя события и позволяет запустить определенную функцию в тот момент, когда указанное событие наступит для данного элемента.

```typescript
import { 
    //...
    HostListener 
} from '@angular/core';
//...
    @Directive({
    selector: '[appBetterHilight]'
    })
    export class BetterHilightDirective implements OnInit {
        //...
        @HostListener('mouseenter') onmouseenter() {
            this.renderer.setStyle(this.elRef.nativeElement, 'color', 'red');
        }

        @HostListener('mouseleave') onmouseleave() {
            this.renderer.setStyle(this.elRef.nativeElement, 'color', 'black');
        }
    }
```

`Renderer2.setStyle` не плох для работы со стилями, но есть способ проще. Декоратор `@HostBinding` позволяет связать свойство с внутренней переменной.

```typescript
import { 
  //..., 
  HostBinding 
} from '@angular/core';

@Directive({
  selector: '[appBetterHilight]'
})
export class BetterHilightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transperent'; 
  //...
  @HostListener('mouseenter') onmouseenter() {
    this.backgroundColor = 'red';
  }
  @HostListener('mouseleave') onmouseleave() {
    this.backgroundColor = 'yellow';
  }
}
```