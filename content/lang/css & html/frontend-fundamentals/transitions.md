---
title:  Transition
description: Transition
keywords: Transition
date: 2019-12-03 00:05:00
origin: <a rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" target="_blank">MDN</a>
---

```css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | timing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to 2 properties */
transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;

/* Global values */
transition: inherit;
transition: initial;
transition: unset;
```