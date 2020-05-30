import React, { FC, ReactElement } from 'react'
import { FlatMenu, FlatMenuItem } from '../menu/types'
import { getPathDepth, slugIsConspect, PATH_TYPE } from '../../utils/path'
import styled from 'styled-components'
import { declension } from '../../utils/lingvo/declension'
import { getChilds } from '../menu/utils/getChilds'
import { Link } from '../base/link'
import { FcAbout } from 'react-icons/fc'
import { List } from '../../componentsLibrary/components/list'
import { Title } from '../../componentsLibrary/baseComponents/title'
import { rhythm } from '../../componentsLibrary/theme/typography'

const ConspectItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  min-width: 100%;
  padding: 0px 27px 2px;
  margin: 0 0 35px 0;
  border-radius: 8px;
  box-shadow: 0 0 19px 0px rgba(0, 0, 0, 0.3);
`

const ArticlesCnt = styled.div`
  font-weight: 300;
  font-size: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    display: none;
  }
`

const TitleWrapper = styled.div`
  font-weight: 300;
  font-size: 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const Space = styled.div`
  :not(:first-of-type) {
    margin-top: ${rhythm(1)};
  }
`

const createConspectListJSX = ({
  item,
  menu,
  pathname,
}: {
  item: FlatMenuItem
  menu: FlatMenu
  pathname: string
}): ReactElement => {
  const lastArticleUpdateDate =
    slugIsConspect(item.slug) &&
    getChilds(item, menu)[item.items.length - 1].date
  const currentDepth = getPathDepth(item.slug)
  const depthDiff = currentDepth - getPathDepth(pathname)

  const articleLinks: null | ReactElement[] = (() => {
    if (!item.slug) {
      return null
    }
    if (getPathDepth(item.slug) !== PATH_TYPE.CONSPECT_INSTANCE) {
      return null
    }
    let articles = menu[item.slug]?.items
      .map((slug) => menu[slug])
      .sort((a, b) => a.date - b.date)
    if (!articles) {
      return null
    }
    const ARTICLES_CNT = 3
    articles = articles.reverse()
    const restArticlesCnt = articles.length - ARTICLES_CNT
    articles = articles.splice(0, ARTICLES_CNT)
    const articleLinks = articles.reduce(
      (a, v) =>
        a.concat(
          <Link key={v.slug} to={v.slug} view="button" size="sm">
            {v.title}
          </Link>
        ),
      [] as ReactElement[]
    )
    if (restArticlesCnt > 0) {
      articleLinks.push(
        <Link
          key={menu[item.slug].slug}
          to={menu[item.slug].slug}
          view="outline"
          size="sm"
        >
          и еще {restArticlesCnt}{' '}
          {declension(restArticlesCnt, ['статья', 'статьи', 'статей'])}
        </Link>
      )
    }
    return articleLinks
  })()

  return (
    <React.Fragment key={item.slug}>
      {depthDiff === 0 ||
      currentDepth === PATH_TYPE.CONSPECT_INSTANCE ? null : currentDepth ===
        PATH_TYPE.CATEGORY_COMMON ? (
        <>
          <Space />
          <Title renderAs="h2" size="md" weight={300}>
            {item.title}
          </Title>
        </>
      ) : (
        <Title size="sm" weight={300}>
          {item.title}
        </Title>
      )}

      {currentDepth === PATH_TYPE.CONSPECT_INSTANCE ? (
        <ConspectItem>
          <TitleWrapper>
            <Link to={item.slug} size="lg">
              <Title size="md" weight={300}>
                {item.title}
              </Title>
            </Link>
            <ArticlesCnt>
              <FcAbout />
              &nbsp;
              {item.items.length}&nbsp;
              {declension(item.items.length, ['статья', 'статьи', 'статей'])}
            </ArticlesCnt>
          </TitleWrapper>
          {articleLinks && <List>{articleLinks}</List>}
          {lastArticleUpdateDate && (
            <Title size="sm" weight={300}>
              обновлено{' '}
              {new Date(Number(lastArticleUpdateDate)).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Title>
          )}
        </ConspectItem>
      ) : null}
      {currentDepth < PATH_TYPE.CONSPECT_INSTANCE &&
        item.items.map((slug) => {
          const item = menu[slug]
          return item ? createConspectListJSX({ item, menu, pathname }) : null
        })}
    </React.Fragment>
  )
}

export const ConspectList: FC<{
  slug: string
  menu: FlatMenu
}> = ({ slug, menu }) => {
  const item = menu[slug]
  if (!item) {
    return null
  }
  return createConspectListJSX({
    item,
    menu,
    pathname: decodeURI(slug),
  })
}
