---
layout: post.njk
tags: [post, postInConspect:kurs_sovremennogo_javascript]
conspect: kurs_sovremennogo_javascript
section: lang
subject: js
title: Компоновщик
seoDescription: Обзор паттерна "Компоновщик" и его реализация в JavaScript.
seoKeywords: js, компоновщик, паттерны
date: 2018-09-22 10:00:00
---
# Компоновщик

Компоновщик является структурным паттерном, который позволяет работать с объектами древовидной структуры как с одним целым, предоставляя универсальный интерфейс и избавляя клиентский код от необходимости обращаться непосредственно к каждому элементу дерева.

Для использования паттерна "Компоновщик" нужна древовидная структура данных и общий интерфейс, который реализовывают листья и узлы дерева. Листья должны реализовать методы интерфейса, а узлы должны итерировать свои дочерние элементы и применять к ним запрошенный метод. Таким образом, паттерн "Компоновщик" позволяет рекурсивно применить необходимый метод ко всему дереву.

Рассмотрим пример, в котором мы создадим дерево, отображающее вложенную структуру html документа. В нашем дереве теги будут узлами, а значения тегов - листьями. Затем мы реализуем интерфейс, позволяющий собрать значения всех узлов и листьев в массив.

```js
// интерфейс узлов и листьев
class Component {
    constructor() {
        this.value = "";        // значения листьев и узлов
        this.elements = [];     // элементы узла
        this.traversed = []     // элементы, которые обошел итератор
    }
    getResult() {               // метод, который должны поддерживать листья и узлы
        throw "getResult method must be defined";
    }
}

// узел
class Composite extends Component {
    // в конструкторе устанавливается название узла,
    // которое обязательно должно быть указано
    constructor(value) {
        if (typeof value === "undefined") {
            throw "value must be defined";
        }
        super();    // в js нужно вызывать родительский конструктор, 
                    // если в дочернем классе используется конструктор
        this.value = value;            

    }
    // добавление узла
    add(element) {
        if (!element instanceof Component) {
            throw "wrong type, must be Component";
        }
        this.elements.push(element);
    }
    // итерация дочерних элементов
    getResult(agregator) {
        this.elements.forEach(element => {
            if (element instanceof Leaf) {
                agregator.push("лист " + this.value + ", имеющий значение '" + element.getResult() + "'");
            } else {
                if (this.traversed.indexOf(this) < 0) {
                    agregator.push("узел " + this.value);
                }
                this.traversed.push(this);
                element.getResult(agregator);
            }
        });
    }
}

// лист
class Leaf extends Component {
    constructor(value) {
        if (typeof value === "undefined") {
            throw "value must be defined";
        }
        super();
        this.value = value;
    }
    getResult() {
        return this.value;
    }
}

// Построим дерево, отображающее следующую html структуру:
// <html>
//     <head>
//         <body>
//             <div>
//                 <h1>Курс JavaScript Bxnotes</h1>
//                 <p>
//                     Hello Composite!
//                 </p>
//             </div>
//         </body>
//    </head>
// </html>

// создадим узлы
const html = new Composite("html");
const head = new Composite("head");
const body = new Composite("body");
const div = new Composite("div");
const h1 = new Composite("h1");
const p = new Composite("p");

// создадим листья
const h1_value = new Leaf("Курс JavaScript Bxnotes");
const p_value = new Leaf("Hello, Composite!");

// получим структуру из узлов и листьев
p.add(p_value);
h1.add(h1_value);
div.add(h1);
div.add(p);
body.add(div);
head.add(body);
html.add(head);

// с помощью паттерна "Компоновщик" получим описание html дерева
const result = [];
html.getResult(result);
console.log(result);
// будет выведен массив: 
// [
//  "узел html", 
//  "узел head", 
//  "узел body", 
//  "узел div", 
//  "лист h1, имеющий значение 'Курс JavaScript Bxnotes'", 
//  "лист p, имеющий значение 'Hello, Composite!'"
// ]
```

В данном примере показано, что паттерн "Компоновщик" может успешно применяться если требуется рекурсивно обойти древовидную структуру и запустить в каждом элементе дерева определенный метод.