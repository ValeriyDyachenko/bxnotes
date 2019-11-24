---
title: Контейнеры, функторы, списки и потоки
seoDescription: Контейнеры, функторы, списки и потоки в JavaScript.
seoKeywords: js, контейнеры, функторы, списки, потоки
date: 2019-09-16 03:00:00
---
# Контейнеры, функторы, списки и потоки

Функтор, это некий контейнер у которого есть интерфейс, позволяющий применить функцию для трансформации его внутреннего значения.

Таким образом, Array в JavaScript это функтор:

```js
[1,2,3].map(x => x * 2)
```

Массив, это список чего-то.

Список, существующий во времени, это поток.  


## Curry

```js
// Tiny, recursive autocurry
const curry = (f, arr = []) => (...args) => (
  a => a.length === f.length ?
    f(...a) :
    curry(f, a)
)([...arr, ...args]);

const add3 = curry((a, b, c) => a + b + c);
add3(1, 2, 3); // 6
add3(1, 2)(3); // 6
add3(1)(2, 3); // 6
add3(1)(2)(3); // 6
```





```js
const reduce = (reducer, initial, arr) => {
  // shared stuff
  let acc = initial;
  for (let i = 0, { length } = arr; i < length; i++) {
    // unique stuff in reducer call
    acc = reducer(acc, arr[i]);
    // more shared stuff
  }
  return acc;
};

reduce((acc, curr) => acc + curr, 0, [1,2,3]); // 6

const filter = (fn, arr) => reduce((acc, curr) => 
  fn(curr) ? acc.concat([curr]) : acc, [], arr
);

const censor = words => filter(
  word => word.length !== 4,
  words
);

censor(['oops', 'gasp', 'shout', 'sun']);
```



## What is a curried function?
A curried function is a function that takes multiple arguments one at a time.


## What is a partial application?
A partial application is a function which has been applied to some, but not yet all of its arguments.
Partial applications can take as many or as few arguments a time as desired.
All curried functions return partial applications, but not all partial applications are the result of curried functions.
The unary requirement for curried functions is an important feature.

## What is point-free style?
Point-free style is a style of programming where function definitions do not make reference to the function’s arguments.

This gets interesting as a mechanism for generalization and specialization. The returned function is
just a specialized version of the more general add() function. We can use add() to create as many
specialized versions as we want

Data last functions are convenient for function composition, because they can be easily used in
point-free style.

```js
const inc10 = add(10);
const inc20 = add(20);

inc10(3); // => 13
inc20(3); // => 23
```


## Why do we curry?
The algebra definition:
(f ◦ g)(x) = f(g(x))
Can be translated into JavaScript:
const compose = (f, g) => x => f(g(x));




```js
const flip = fn => a => b => fn(b)(a);
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

const trace = value => label => {
  console.log(`${ label }: ${ value }`);
  return value;
};
const flippedTrace = flip(trace);

const g = n => n + 1;
const f = n => n * 2;

const h = pipe(
  g,
  flippedTrace('after g'),
  f,
  flippedTrace('after f'),
);

h(20);
```


## Abstraction is simplification.
“Simplicity is about subtracting the obvious and adding the meaningful.”

The process of abstraction has two main components:
Generalization is the process of finding similarities (the obvious) in repeated patterns, and hiding
the similarities behind an abstraction.

Specialization is the process of using the abstraction, supplying only what is different (the
meaningful) for each use case.


## Abstraction through composition

You could say that f defines a relationship between A and B:
f : A → B

Likewise, we could define another function, g, which defines a relationship between B and C:
g : B → C

This implies another function h which defines a relationship directly from A to C:
h : A → C




## Reduce is Versatile

```js
const map = (fn, arr) => arr.reduce((acc, item, index, arr) => {
  return acc.concat(fn(item, index, arr));
}, []);

const filter = (fn, arr) => arr.reduce((newArr, item) => {
  return fn(item) ? newArr.concat([item]) : newArr;
}, []);

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```


## Build Your Own Functor

simple example of a functor:

```js
const Identity = value => ({
  map: fn => Identity(fn(value))
});
```

Identity takes a value and returns an object with a .map() method. The .map() method takes
a function and returns the result of applying the function to the value inside the Identity. The
returned value is wrapped inside another Identity. Functor maps always return an instance of the
same functor type: Array on the left? Array on the right. Stream on the left? Stream on the right.
Promise on the left? Promise on the right, and so on.

> Functional programming is all about composing tiny functions to create higher level abstractions.

What if you want a generic map that works with any functor? You could partially apply arguments
to create new mapping functions that work with any mappable type!

```js
// import curry from 'lodash/fp/curry';
// OR
// import curry from 'ramda/curry';
// OR use this magic spell:
const curry = (f, arr = []) => (...args) => (
  a => a.length === f.length ?
  f(...a) :
  curry(f, a)
)([...arr, ...args]);

const Identity = value => ({
  map: fn => Identity(fn(value))
});

const map = curry((fn, mappable) => mappable.map(fn));
const log = x => console.log(x);

const double = n => n * 2;
const mdouble = map(double);
Functors & Categories 91

mdouble(Identity(4)).map(log); // 8
mdouble([4]).map(log); // 8
```


## Monads

A monad is a way of composing functions that require context in addition to the return value.

Monads are a way to compose type lifting functions: g: a => M(b), f: b => M(c). To accomplish
this, monads must flatten M(b) to b before applying f(). In other words, functors are things you can
map over. Monads are things you can flatMap over

• Function composition composes functions of type a => b
• Functor map composes functions of type a => b in a functor context: Functor(a).map(a => b) returns Functor(b).
• Monad flatMap composes functions of type a => Monad(b) in a monad context: Monad(a).flatMap(a => M(b)) returns Monad(b). FlatMap maps and flattens in one operation

In other words:
• Functions can compose: a => b => c becomes a => c
• Functors can compose functions with context: given F(a) and two functions, a => b => c, return F(c).
• Monads can compose type lifting functions: a => M(b), b => M(c) becomes a => M(c)

But what do “flatten” and “map” and “context” mean?
• Map means, “apply a function to an a and return a b”.
• Context is the computational detail of the monad. The functor or monad supplies some
computation to be performed during the mapping process, such as iterating over a list of things,
or waiting for a future value to resolve. The point of functors and monads is to abstract that
context away so we don’t have to worry about it while we’re composing operations. Mapping
inside the context means that you apply a function from a => b (for functors) or a => Monad(b)
(for monads) to the values inside the context, and return new values of type b wrapped inside
the same kind of context. Observables on the left? Observables on the right: Observable(a) =>
Observable(b). Arrays on the left side? Arrays on the right side: Array(a) => Array(b).
• Type lift means to lift a type into a context, wrapping values inside a data type that supplies
the computational context a => M(a).
• Flatten can be used to unwrap an extra layer of context that might be added by applying a
type lifting function using a functor map operation. If you map a function of type a => M(a)
with the functor map operation, it will return a value of type M(M(b)). Flatten unwraps the
extra layer of context: M(M(a)) => M(a). Monads are not required to directly expose a flatten
operation. It happens automatically inside flatMap.
• FlatMap is the operation that defines a monad. It combines map and flatten into a single operation used to compose type lifting functions (a => M(b)).

Example of a functor context in JavaScript:

```js
const x = 20; // Some data of type `a`
const f = n => n * 2; // A function from `a` to `b`
const arr = Array.of(x); // The type lift.
// JS has type lift sugar for arrays: [x]

// .map() applies the function f to the value x
// in the context of the array.
const result = arr.map(f); // [40]
```

In this case, Array is the context, and x is the value we’re mapping over. But what if we have a
function that takes a value and returns an array of values? For example, this echo() function will
take a value and repeat it n times:

```js
const echo = n => x => Array.from({ length: n }).fill(x);

console.log(
[1, 2, 3].map( echo(3) )
// [[1, 1, 1], [2, 2, 2], [3, 3, 3]]
);
```

That’s fine if that’s what you’re looking for, but what if you want an array of numbers instead of
an array of arrays of numbers? FlatMap to the rescue!

```js
// Map `f` in `arr`, then flatten with [].concat:
const flatMap = (f, arr) => [].concat(...arr.map(f));

const echo = n => x => Array.from({ length: n }).fill(x);

console.log(
flatMap( echo(3), [1, 2, 3])
// => [1, 1, 1, 2, 2, 2, 3, 3, 3]
);
```

## What Monads are Made of

A monad is based on a simple symmetry:
• of: A type lift a => M(a)
• map: The application of a function a => M(b) inside the monad context, which yields M(M(b))
• flatten: The unwrapping of one layer of monadic context: M(M(b)) => M(b)

```js
const Monad = value => ({
  flatMap: f => f(value),
  map (f) {
    return this.flatMap(a => Monad.of(f(a)));
  }
});
Monad.of = x => Monad(x);

Monad(21).map(x => x * 2).map(x => console.log(x))
```


## Promise composition

```js
const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
};

const composePromises = (...ms) => (
  ms.reduce((f, g) => x => g(x).then(f))
);

const f = n => Promise.resolve(n - 1);
const g = n => Promise.resolve(n + 2);
const h = n => Promise.resolve(n * 2);

const j = composePromises(f, g, h);

j(2).then(trace('Promise composition'));
// Promise composition: 5
```

## Mix the flatMap method into a curried function

```js
const composeM = method => (...ms) => (
  ms.reduce((f, g) => x => g(x)[method](f));
);
```

Now we can write the specialized implementations like this:

```js
const composePromises = composeM('then');
const composeMap = composeM('map');
const composeFlatMap = composeM('flatMap');
```


## The Monad Laws

Left and right identity laws: of then f = f = f then of

Identity Laws: A monad is a functor. A functor is a morphism between two category objects, A → B. The morphism
is represented by an arrow between objects. In addition to the arrow we explicitly see between
objects, each object in a category also has an arrow back to itself. In other words, for every object A
in a category, there exists an arrow A → A. That arrow is known as the identity arrow. It’s frequently
drawn as an arrow that loops back to the origin object.

Associativity: Associativity just means that it doesn’t matter where we put the parenthesis when we compose. For
example, if you’re adding, a + (b + c) is the same as (a + b) + c.


example:

```js
const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
};

// Identity monad
const Id = value => ({
  // Functor mapping
  // Preserve the wrapping for .map() by
  // passing the mapped value into the type
  // lift:
  map: f => Id.of(f(value)),

  // Monad chaining
  // Discard one level of wrapping
  // by omitting the .of() type lift:
  flatMap: f => f(value),

  // Just a convenient way to inspect
  // the values:
  toString: () => `Id(${ value })`
});

// The type lift for this monad is just
// a reference to the factory.
Id.of = Id;

const g = n => Id(n + 1);
const f = n => Id(n * 2);

const x = 20;

// Left identity
// unit(x).flatMap(f) ==== f(x)
trace('Id monad left identity')([
  Id(x).flatMap(f),
  f(x)
]);
// Id monad left identity: Id(40), Id(40)

// Right identity
// m.flatMap(unit) ==== m
trace('Id monad right identity')([
  Id(x).flatMap(Id.of),
  Id(x)
]);
// Id monad right identity: Id(20), Id(20)

// Associativity
// m.flatMap(f).flatMap(g) ====
// m.flatMap(x => f(x).flatMap(g)
trace('Id monad associativity')([
  Id(x).flatMap(g).flatMap(f),
  Id(x).flatMap(x => g(x).flatMap(f))
]);
// Id monad associativity: Id(42), Id(42)
```

## OOP

What is essential to OOP?
• Encapsulation
• Message passing
• Dynamic binding (the ability for the program to evolve/adapt at runtime)

What is non-essential?
• Classes
• Class inheritance
• Special treatment for objects/functions/data
• The new keyword
• Polymorphism
• Static types
• Recognizing a class as a “type”

# Three Different Forms of Object Composition

## Aggregation
Aggregation is when an object is formed from an enumerable collection of subobjects.

• Arrays
• Maps
• Sets
• Graphs
• Trees
– DOM nodes (a DOM node may contain child nodes)
– UI components (a component may contain child components)

```js
const objs = [
  { a: 'a', b: 'ab' },
  { b: 'b' },
  { c: 'c', b: 'cb' }
];

const collection = (a, e) => a.concat([e]);
const a = objs.reduce(collection, []);
console.log(
  'collection aggregation',
  a,
  a[1].b,
  a[2].c,
  `enumerable keys: ${ Object.keys(a) }`
);
// collection aggregation
// [{"a":"a","b":"ab"},{"b":"b"},{"c":"c","b":"cb"}]
// b c
// enumerable keys: 0,1,2
```

## Concatenation
Concatenation is when an object is formed by adding new properties to an existing object

• Plugins are added to jQuery.fn via concatenation
• State reducers (e.g., Redux)
• Functional mixins

```js
const objs = [
  { a: 'a', b: 'ab' },
  { b: 'b' },
  { c: 'c', b: 'cb' }
];

const concatenate = (a, o) => ({...a, ...o});
const c = objs.reduce(concatenate, {});
console.log(
  'concatenation',
  c,
  `enumerable keys: ${ Object.keys(c) }`
);
// concatenation { a: 'a', b: 'cb', c: 'c' } enumerable keys: a,b,c
```

## Delegation
Delegation is when an object forwards or delegates to another object.

```js
const objs = [
  { a: 'a', b: 'ab' },
  { b: 'b' },
  { c: 'c', b: 'cb' }
];

const delegate = (a, b) => Object.assign(Object.create(a), b);
const d = objs.reduceRight(delegate, {});

console.log(
  'delegation',
  d,
  `enumerable keys: ${ Object.keys(d) }`
);

// delegation { a: 'a', b: 'ab' } enumerable keys: a,b
console.log(d.b, d.c); // ab c
```


# Factory

```js
const createUser = ({ userName, avatar }) => ({
  userName,
  avatar,
  setUserName (userName) {
    this.userName = userName;
    return this;
  }
});
```

# Mixins

## What are mixins?

Mixins are a form of object composition, where component features get mixed into a composite object so that properties of each mixin become properties of the composite object.

## What is functional inheritance?

Functional inheritance is the process of inheriting features by applying an augmenting function
to an object instance.

```js
// Base object factory
function base(spec) {
  const that = {}; // Create an empty object
  that.name = spec.name; // Add it a "name" property
  return that; // Return the object
}

// Construct a child object, inheriting from "base"
function child(spec) {
  const that = base(spec); // Create the object through the "base" constructor
  that.sayHello = function() { // Augment that object
    return 'Hello, I\'m ' + that.name;
  };
  return that; // Return it
}

// Usage
const result = child({name: 'a functional object'});
console.log(result.sayHello()); // 'Hello, I'm a functional object'
```

## What is a functional mixin?

Functional mixins are composable functions which mix new properties or behaviors into existing
objects.

```js
const withConstructor = constructor => o => ({
    // create the delegate [[Prototype]]
    __proto__: {
        // add the constructor prop to the new [[Prototype]]
        constructor
    },
    // mix all o's props into the new object
    ...o
});

const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
// or `import pipe from 'lodash/fp/flow';`

// Set up some functional mixins
const withFlying = o => {
    let isFlying = false;
    return {
        ...o,
        fly() {
            isFlying = true;
            return this;
        },
        land() {
            isFlying = false;
            return this;
        },
        isFlying: () => isFlying
    }
};

const withBattery = ({capacity}) => o => {
    let percentCharged = 100;
    return {
        ...o,
        draw(percent) {
            const remaining = percentCharged - percent;
            percentCharged = remaining > 0 ? remaining : 0;
            return this;
            Factory
            Functions
            138
        },
        getCharge: () => percentCharged,
        getCapacity() {
            return capacity;
        }
    };
};

const createDrone = ({capacity = '3000mAh'}) => pipe(
    withFlying,
    withBattery({capacity}),
    withConstructor(createDrone)
)({});

const myDrone = createDrone({capacity: '5500mAh'});

console.log(`
can fly: ${myDrone.fly().isFlying() === true}
can land: ${myDrone.land().isFlying() === false}
battery capacity: ${myDrone.getCapacity()}
battery status: ${myDrone.draw(50).getCharge()}%
battery drained: ${myDrone.draw(75).getCharge()}%
`);

console.log(`
constructor linked: ${myDrone.constructor === createDrone}
`);
```

## Composing Functional Mixins

```js
const flying = (o) => {
  let isFlying = false;

  return Object.assign({}, o, {
    fly() {
      isFlying = true;
      return this;
    },

    isFlying: () => isFlying,

    land() {
      isFlying = false;
      return this;
    },
  });
};


const quacking = (quack) => (o) => Object.assign({}, o, {
  quack: () => quack,
});

const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
// OR import pipe from `lodash/fp/flow`;

const createDuck = (quack) => pipe(
    flying,
    quacking(quack)
)({});

const duck = createDuck('Quack!');

console.log(duck.fly().quack());
```


# Composable Custom Data Types

In JavaScript, the easiest way to compose is function composition, and a function is just an object
you can add methods to. In other words, you can do this:

```js
const t = value => {
    const fn = () => value;

    fn.toString = () => `t(${value})`;

    return fn;
};

const someValue = t(2);

console.log(
    someValue.toString() // "t(2)"
);
```

This is a factory that returns instances of a numerical data type, t. But notice that those instances
aren’t simple objects. Instead, they’re functions, and like any other function, you can compose them.
Let’s assume the primary use case for it is to sum its members. Maybe it would make sense to sum
them when they compose.

The following code won’t work yet, because we haven’t finished building our type, so for now just
imagine you have a value of the type, t(0). That value is itself a function, and when you pass another
value of the same type into the returned function, it will add the two values together and return the
summed value of the same type. In other words:


```js
console.log(
    t(3)(t(5)).toString() // t(8)
);
```

Before we implement the needed changes, let’s establish some rules (axioms):
• Identity: t(x)(t(0)) ≡ t(x)
• Associativity: t(a)(t(b))(t(c)) ≡ t(a)(t(b)(t(c))

And we can translate those into a simple kind of unit test:

```js
const assert = ({given, should, actual, expected}) => {
    if (actual.toString() !== expected.toString()) {
        throw new Error(`
            NOT OK: Given ${given}, should ${should}
            Expected: ${expected}
            Actual: ${actual}
        `);
    }

    console.log(`OK: Given ${given}, should ${should}`);
};
```

```js
// test 1
const given = 'a value `t(x)` composed with `t(0)`';
const should = 'be equivalent to `t(x)`';
const x = 20;
const actual = t(x)(t(0));
const expected = t(x);

assert({
    given,
    should,
    actual,
    expected,
});
```

```js
// test 2
const given = 'a value `t(x)` composed with `t(1)`';
const should = 'be equivalent to `t(x + 1)`';
const x = 20;
const actual = t(x)(t(1));
const expected = t(x + 1);

assert({
    given,
    should,
    actual,
    expected,
});

```

These tests will fail at first:

```
NOT OK: a value t(x) composed with t(0) ==== t(x)
Expected: t(20)
Actual: 20
```

When you put it all together, it looks like this:

```js
const t = value => {
    const add = n => t(value + n);

    return Object.assign(add, {
        toString: () => `t(${value})`,
        valueOf: () => value
    });
};
```

And then the tests pass:

"OK: a value t(x) composed with t(0) ==== t(x)"
"OK: a value t(x) composed with t(1) ==== t(x + 1)"


Now you can compose values of t() with function composition:

```js
// Compose functions from top to bottom:
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);

// Sugar to kick off the pipeline with an initial value:
const add = (...fns) => pipe(...fns)(t(0));

const sum = add(
    t(2),
    t(4),
    t(-1)
);

console.log(sum.toString()) // t(5)
```


# Lenses

A lens is a composable pair of pure getter and setter functions which focus on a particular field
inside an object, and obey a set of axioms known as the lens laws.

The getter takes a whole and returns the part of the object:
// view = whole => part

setters are pure functions, setter takes a whole, and a value to set the part to, and returns a new whole with the part updated
// set = whole => part => whole

## Lens Laws

The lens laws are algebraic axioms which ensure that the lens is well behaved.

1. view(lens, set(lens, value, store)) ≡ value — If you set a value into the store, and
immediately view the value through the lens, you get the value that was set.
2. set(lens, b, set(lens, a, store)) ≡ set(lens, b, store) — If you set a lens value to a
and then immediately set the lens value to b, it’s the same as if you’d just set the value to b.
3. set(lens, view(lens, store), store) ≡ store — If you get the lens value from the store,
and then immediately set that value back into the store, the value is unchanged.

```js
// Pure functions to view and set which can be used with any lens:
const view = (lens, store) => lens.view(store);
const set = (lens, value, store) => lens.set(value, store);

// A function which takes a prop, and returns naive
// lens accessors for that prop.
const lensProp = prop => ({
    view: store => store[prop],
    // This is very naive, because it only works for objects:
    set: (value, store) => ({
        ...store,
        [prop]: value
    })
});

// An example store object. An object you access with a lens
// is often called the "store" object:
const fooStore = {
    a: 'foo',
    b: 'bar'
};

const aLens = lensProp('a');
const bLens = lensProp('b');

// Destructure the `a` and `b` props from the lens using
// the `view()` function.
const a = view(aLens, fooStore);
const b = view(bLens, fooStore);
console.log(a, b); // 'foo' 'bar'

// Set a value into our store using the `aLens`:
const bazStore = set(aLens, 'baz', fooStore);

// View the newly set value.
console.log(view(aLens, bazStore)); // 'baz'
```

We can apply a function to the value of focus in a lens

```js
const over = (lens, f, store) => set(lens, f(view(lens, store)), store);
const uppercase = (x) => x.toUpperCase();

console.log(
    over(aLens, uppercase, store) // { a: "FOO", b: "bar" }
);
```


# Transducers

A transducer is a composable higher order reducer. It takes a reducer as input, and returns another
reducer.

Compare Transducers with native .map  (native .map is fine for small lists like this, but there are some potential problems):
1. This only works for arrays.
2. Each time you use the dot chaining syntax on an array, JavaScript builds up a whole new intermediate array before moving onto the next operation in the chain. With transducers, you can stream through the complete pipeline without building up intermediate collections between them, saving lots of time and memory churn.
3. Transducers can potentially work with any transport data type: Write an operator once, use it anywhere that supports transducers.

For handle stream you can use one two possibilites

+ Pull: lazy evaluation
+ Push: eager evaluation

A pull API waits until a consumer asks for the next value. A good example in JavaScript is an
Iterable, such as the object produced by a generator function. Nothing happens in the generator
function until you ask for the next value by calling .next() on the iterator object it returns.
A push API enumerates over the source values and pushes them through the tubes as fast as it can.
A call to array.reduce() is a good example of a push API. array.reduce() takes one value at a

time from the array and pushes it through the reducer, resulting in a new value at the other end. For
eager processes like array reduce, the process is immediately repeated for each element in the array
until the entire array has been processed, blocking further program execution in the meantime.
Transducers don’t care whether you pull or push. Transducers have no awareness of the data
structure they’re acting on. They simply call the reducer you pass into them to accumulate new
values.

reducer = (accumulator, current) => accumulator
transducer = reducer => reducer

Or, to spell it out:
transducer = ((accumulator, current) => accumulator) => ((accumulator, current) => accumulator)

Generally speaking though, most transducers will need to be partially applied to some arguments
to specialize them. For example, a map transducer might look like this:

map = transform => reducer => reducer

Or more specifically:
map = (a => b) => step => reducer

In other words, a map transducer takes a mapping function (called a transform) and a reducer (called
the step function), and returns a new reducer. 

```js
const compose = (...fns) => (x) => fns.reduceRight((y, f) => f(y), x);

const map = (f) => (step) => (a, c) => step(a, f(c));

const filter = (predicate) => (step) =>
  (a, c) => predicate(c) ? step(a, c) : a;

const isEven = (n) => n % 2 === 0;

const double = (n) => n * 2;

const doubleEvens = compose(
    filter(isEven),
    map(double)
);

const arrayConcat = (a, c) => a.concat([c]);

const xform = doubleEvens(arrayConcat);

const result = [1, 2, 3, 4, 5, 6].reduce(xform, []); // [4, 8, 12]

console.log(result);
```

By default, most transducers should pass the init() call to the next transducer in the pipeline, because we don’t know the transport data type, so we can’t produce a valid initial value for it. Here is a less naive implementation of the map transducer:

```js
const map = f => next => transducer({
  init: () => next.init(),
  result: a => next.result(a),
  step: (a, c) => next.step(a, f(c))
});
```


# Elements of JavaScript Style

## Make the function the unit of composition. One job for each function.

In JavaScript, there are three kinds of functions:
• Communicating functions: Functions which perform I/O.
• Procedural functions: A list of instructions, grouped together.
• Mapping functions: Given some input, return some corresponding output.

If your function is for I/O, don’t mix that I/O with mapping (calculation).
If your function is for mapping, don’t mix it with I/O. By definition, procedural functions violate
this guideline. Procedural functions also violate another guideline: Avoid a succession of loose
statements.


## Omit needless code

Concise code is critical in software because more code creates more surface area for bugs to hide in.
Less code = fewer places for bugs to hide = fewer bugs.

```js
function secret(message) {
  return function() {
    return message;
  };
};

```

Can be reduced to:
```js
const secret = msg => () => msg;
```

## Omit needless variables

The problem is that the human brain has a limited number of resources available in working memory, and each variable must be stored as a discrete quanta, occupying one of the available working memory slots.

For this reason, experienced developers learn to eliminate variables that don’t need to exist.

```js
const getFullName = ({firstName, lastName}) => {
    const fullName = firstName + ' ' + lastName;
    return fullName;
};

// vs…

 const getFullName = ({firstName, lastName}) => (
     firstName + ' ' + lastName
 );
```

When you compose two functions together, you eliminate the need to create a variable to hold the
intermediary value between the two function applications.

with points:
```js
const g = n => n + 1;
const f = n => n * 2;

const incThenDoublePoints = n => {
    const incremented = g(n);
    return f(incremented);
};

incThenDoublePoints(20); // 42
```

without points:
```js
const g = n => n + 1;
const f = n => n * 2;

const compose2 = (f, g) => x => f(g(x));

const incThenDoublePointFree = compose2(f, g);

incThenDoublePointFree(20); // 42
```

## Use active voice

Name things as directly as possible:
• myFunction.wasCalled() is better than myFunction.hasBeenCalled()
• createUser() is better than User.create()
• notify() is better than Notifier.doNotification()
Name predicates and booleans as if they are yes or no questions:
• isActive(user) is better than getActiveStatus(user)
• isFirstRun = false; is better than firstRun = false;
Name functions using verb forms:
• increment() is better than plusOne()
• unzip() is better than filesFromZip()
• filter(isActive, array) is better than activeItemsFromArray(isActive, array)

Event handlers and lifecycle methods are an exception to the verb rule because they’re used as
qualifiers; instead of expressing what to do, they express when to do it. They should be named so
that they read, “<when to act>, <verb>”.
• element.onClick(handleClick) is better than element.click(handleClick)
• component.onDragStart(handleDragStart) is better than component.startDrag(handleDragStart)


## Avoid a succession of loose statements

Consider the following sequence:

```js
const drawUserProfile = ({userId}) => {
  const userData = loadUserData(userId);
  const dataToDisplay = calculateDisplayData(userData);
  renderProfileData(dataToDisplay);
};
```

This function is really handling three different things: loading data, calculating view state from
loaded data, and rendering.

In most modern front-end application architectures, each of these concerns is considered separately.
By separating these concerns, we can easily mix and match different functions for each concern.

Another problem with this function is that you can’t simply calculate the data to be displayed and
generate the markup without first loading the data. What if you’ve already loaded the data? You
end up doing work that you didn’t need to do in subsequent calls.

## Keep related code together

Grouped by type:
```
 .
 ├── components
 │ ├── todos
 │ └── user
 ├── reducers
 │ ├── todos
 │ └── user
 └── tests
 ├── todos
 └── user
 ```

Grouped by feature:
```
 .
 ├── todos
 │ ├── component
 │ ├── reducer
 │ └── test
 └── user
 ├── component
 ├── reducer
 └── test
 ```

When you group files together by feature, you avoid scrolling up and down in your file list to find
all the files you need to edit to get a single feature working.
Colocate files related by feature.

## Put statements and expressions in positive form

+ isFlying is better than isNotFlying
+ late is better than notOnTime


## If Statements

```js
if (err) return reject(err);
// do something...
```

…is better than:

```js
if (!err) {
  // ... do something
} else {
  return reject(err);
}
```

• if (missingValue) is better than if (!hasValue)
• if (anonymous) is better than if (!user)
• if (isEmpty(thing)) is better than if (notDefined(thing))


## Avoid null and undefined arguments in function calls.

Don’t require function callers to pass undefined or null in place of an optional parameter. Prefer
named options objects instead:

```js
const createEvent = ({
     title = 'Untitled',
     timeStamp = Date.now(),
     description = ''
 }) => ({title, description, timeStamp});

// later...
const birthdayParty = createEvent({
    title: 'Birthday Party',
    description: 'Best party ever!'
});
```

…is better than:

```js
const createEvent = (
    title = 'Untitled',
    timeStamp = Date.now(),
    description = ''
) => ({title, description, timeStamp});

// later...
const birthdayParty = createEvent(
    'Birthday Party',
    undefined, // This was avoidable
    'Best party ever!'
);
```

## Use parallel code for parallel concepts.

There are few problems in applications that have not been solved before. We end up doing the same
things over and over again. When that happens, it’s an opportunity for abstraction. Identify the
parts that are the same, and build an abstraction that allows you to supply only the parts that are
different. This is exactly what libraries and frameworks do for us.


# Mocking is a Code Smell

TDD should lead to better design

A code smell does not mean that something is definitely wrong, or that something must be fixed
right away. It is a rule of thumb that should alert you to a possible opportunity to improve something.

A mock is a test double that stands in for real implementation code during the unit testing process.

Unit tests test individual units (modules, functions, classes) in isolation from the rest of the program.

Code coverage refers to the amount of code covered by test cases.


How do we remove tight coupling?
1. Use pure functions as the atomic unit of composition, as opposed to classes, imperative
procedures, or mutating functions.
2. Isolate side-effects from the rest of your program logic. That means don’t mix logic with I/O
(including network I/O, rendering UI, logging, etc…).
3. Remove dependent logic from imperative compositions so that they can become declarative
compositions which don’t need their own unit tests. If there’s no logic, there’s nothing
meaningful to unit test.

## Use pure functions

```js
// Not pure
const signInUser = user => user.isSignedIn = true;

const foo = {
    name: 'Foo',
    isSignedIn: false
};

// Foo is mutated
console.log(
    signInUser(foo), // true
    foo // { name: "Foo", isSignedIn: true }
);


// Pure
const signInUser = user => ({...user, isSignedIn: true});

const foo = {
    name: 'Foo',
    isSignedIn: false
};

// Foo is not mutated
console.log(
    signInUser(foo), // { name: "Foo", isSignedIn: true }
    foo // { name: "Foo", isSignedIn: false }
);
```


## Isolate side-effects from the rest of your program logic

There are several strategies that can help you isolate side-effects from the rest of your program logic.
Here are some of them:
1. Use pub/sub to decouple I/O from views and program logic. Rather than directly triggering
side-effects in UI views or program logic, emit an event or action object describing an event or
intent.
2. Isolate logic from I/O e.g., compose functions which return promises using asyncPipe().
3. Use objects that represent future computations rather than directly triggering computation
with I/O, e.g., call() from redux-saga⁷¹ doesn’t actually call a function. Instead, it returns an
object with a reference to a function and its arguments, and the saga middleware calls it for
you. That makes call() and all the functions that use it pure functions, which are easy to unit
test with no mocking required

### pub/sub

Pub/sub is short for the publish/subscribe pattern. In the publish/subscribe pattern, units don’t
directly call each other. Instead, they publish messages that other units (subscribers) can listen to.
Publishers don’t know what (if any) units will subscribe, and subscribers don’t know what (if any)
publishers will publish.

## Isolate logic from I/O

Remember: Logic and I/O are separate concerns. Logic is thinking. Effects are actions.
Think before you act!

## Use objects that represent future computations

The strategy used by redux-saga is to use objects that represent future computations. The idea is
similar to returning a monad, except that it doesn’t always have to be a monad that gets returned.
Monads are capable of composing functions with the chain operation, but you can manually chain
functions using imperative-style code, instead.

