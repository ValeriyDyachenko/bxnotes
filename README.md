# Bxnotes | bxnotes.ru

## О чем

Bxnotes &ndash; это информационная площадка для разработчиков. Здесь вы найдете краткие конспекты книг, курсов, статей и личный опыт.

## Контрибьюторы ✨

 Спасибо всем, кто помогает проекту развиваться!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/ValeriyDyachenko"><img src="https://avatars0.githubusercontent.com/u/26274813?v=4" width="100px;" alt=""/><br /><sub><b>Valeriy Dyachenko</b></sub></a><br /><a href="https://github.com/ValeriyDyachenko/bxnotes/commits?author=ValeriyDyachenko" title="Code">💻</a> <a href="#design-ValeriyDyachenko" title="Design">🎨</a> <a href="#content-ValeriyDyachenko" title="Content">🖋</a></td>
    <td align="center"><a href="http://lemix.net"><img src="https://avatars1.githubusercontent.com/u/1058743?v=4" width="100px;" alt=""/><br /><sub><b>marsgpl</b></sub></a><br /><a href="#maintenance-marsgpl" title="Maintenance">🚧</a> <a href="https://github.com/ValeriyDyachenko/bxnotes/commits?author=marsgpl" title="Code">💻</a></td>
    <td align="center"><a href="https://ingodwetrust.ru"><img src="https://avatars1.githubusercontent.com/u/43764701?v=4" width="100px;" alt=""/><br /><sub><b>Denis</b></sub></a><br /><a href="#ideas-zlocate" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-zlocate" title="Content">🖋</a></td>
    <td align="center"><a href="https://paulcodeman.github.io"><img src="https://avatars2.githubusercontent.com/u/27310867?v=4" width="100px;" alt=""/><br /><sub><b>Pavel</b></sub></a><br /><a href="#content-paulcodeman" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/zikfrid"><img src="https://avatars3.githubusercontent.com/u/14260015?v=4" width="100px;" alt=""/><br /><sub><b>zikfrid</b></sub></a><br /><a href="#content-zikfrid" title="Content">🖋</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## Как это работает?

Контент сайт bxnotes.ru генерируется из директории ```content```.

Движок сайта находится в директории ```_server```.

При коммите в мастер, сайт bxnotes.ru пересобирается.

## Как происходит сборка сайта?

Для сборки используется движок статических сайтов <a href="https://www.11ty.io/" target="_blank">eleventy</a>. 

На основе директории ```content``` строится меню, страницы, навигация по сайту. 

Файлы формата markdown переводятся в html.

## Структура и содержание директории ```content```

Структура директорий ```content```:
1) секция
2) тема
3) конспект
4) статья конспекта

Файлы ```index.md``` содержат информацию о родительской директории для генерации тайтлов и сео тегов.

В директории нижнего уровня находятся посты в md формате.

## Запуск dev сервера и редактирование сайта

1. Установить NodeJS
2. Форкнуть и клонировать репозиторий
3. ```yarn install``` (установить зависимости)
4. ```yarn dev``` (запустить dev сервер)
5. Открыть в браузере ```http://localhost:8080```
6. Отредактировать нужную информацию в директории ```content```

## Вопросы и предложения

https://github.com/ValeriyDyachenko/bxnotes/issues
