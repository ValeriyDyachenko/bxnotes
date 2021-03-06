---
title:  Встроенная документация
description: Встроенная документация Linux.
keywords: linux, man, --help, -h
date: 2018-08-05 07:00:00
---

## man

Документация по команде:
```bash
man commandName
```

Поиск в документации по ключевому слову:
```bash
man -k keyword
```

Разделы интерактивного руководства:

Раздел | Описание
--- | ---
1 |	Команды пользователя
2 |	Системные вызовы
3 |	Документация к высокоуровневой программной библиотеке Unix
4 |	Интерфейс устройств и информация о драйверах
5 |	Описание файлов (файлы конфигурации)
6 |	Игры
7 |	Форматы файлов, условные обозначения и кодировки
8 |	Системные команды и серверы

Можно уточнять в каком разделе смотреть ключевое слово, например:
```bash
man 1 passwd 
# или
man 5 passwd
```

## --help

У некоторых команд есть аргумент `--help` или `-h`, который выводит помощь по команде.

Источник — How Linux Works: