---
layout: post.njk
tags: [post, postInConspect:how-linux-works]
conspect: how-linux-works
section: os
subject: unix
title: Директории
seoDescription: Создание и удаление директорий в Linux.
seoKeywords: linux, cd, mkdir, rmdir
date: 2018-08-05 02:00:00
---
# Директории

Путь, который не начинается с символа `/` называется относительным.

Перемещение по каталогам:
```bash
cd
```

Создать каталог:
```bash
mkdir
```

Удалить каталог (если каталог не пуст он не удалится):
```bash
rmdir 
```

*Принудительное рекурсивное* (*recursive*, *force*) удаление всего что находится в каталоге (**не используйте эту команду с джокерными символами \*** ): 
```bash
rm -rf dirname
``` 