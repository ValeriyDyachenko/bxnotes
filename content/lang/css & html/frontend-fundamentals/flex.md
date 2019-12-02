---
title: Flex
seoDescription: Flex
seoKeywords: Flex
date: 2019-12-03 00:12:00
origin: <a rel="nofollow" href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/" target="_blank">css-tricks</a>
---
# Flex

## Container

```css
display: flex; /* or inline-flex */
flex-direction: row | row-reverse | column | column-reverse;
flex-wrap: nowrap | wrap | wrap-reverse;
flex-flow: <‘flex-direction’> || <‘flex-wrap’> /* This is a shorthand for the flex-direction and flex-wrap properties */
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
align-items: stretch | flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
align-content: flex-start | flex-end | center | space-between | space-around | space-evenly | stretch | start | end | baseline | first baseline | last baseline + ... safe | unsafe;
```

## Items

```css
order: <integer>; /* default is 0 */
flex-grow: <number>; /* default 0 */
flex-shrink: <number>; /* default 1 */
flex-basis: <length> | auto; /* default auto */
flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] /* The second and third parameters (flex-shrink and flex-basis) are optional. Default is 0 1 auto */
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```