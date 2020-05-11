import React, { FC } from 'react'
import { FlatMenu } from '../menu/types'
import { getPathDepth, PATH_TYPE } from '../../utils/path'
import { declension } from '../../utils/lingvo/declension'
import styled from 'styled-components'
import { LinkStyled } from '../common/linkStyled'

const ArticleListWrapper = styled.div`
  margin: 15px 0 38px;
`

const Title = styled.div`
  font-size: 21px;
  font-weight: 300;
`

const ArticleLink = styled(LinkStyled)`
  background-color: ${({ theme }) => theme.global.unhover};
  border: 1px solid ${({ theme }) => theme.global.unhover};
  border-radius: 15px;
  margin: 5px 4px;
  padding: 3px 13px;
  white-space: nowrap;
  display: inline-block;
`

const MoreArticlesLink = styled(ArticleLink)`
  background-color: ${({ theme }) => theme.global.background};
  border: 1px dotted ${({ theme }) => theme.global.font};
`

export const ArticleList: FC<{
  pathname: string
  menu: FlatMenu
  cnt?: number
  title?: string
  reversed?: boolean
}> = ({
  pathname,
  menu,
  cnt = 5,
  reversed = true,
  title = 'Последние статьи:',
}) => {
  if (!pathname) {
    return null
  }
  if (getPathDepth(pathname) !== PATH_TYPE.CONSPECT_INSTANCE) {
    return null
  }
  let articles = menu[pathname]?.items
    .map((slug) => menu[slug])
    .sort((a, b) => a.date - b.date)

  if (!articles) {
    return null
  }
  if (reversed) {
    articles = articles.reverse()
  }
  const restArticlesCnt = articles.length - cnt
  articles = articles.splice(0, cnt)
  return (
    <ArticleListWrapper>
      <Title>{title}</Title>
      {articles.map((item, i) => (
        <ArticleLink key={item.slug} to={item.slug}>
          {item.title}
        </ArticleLink>
      ))}
      {restArticlesCnt > 0 && (
        <MoreArticlesLink to={menu[pathname].slug}>
          и еще {restArticlesCnt}{' '}
          {declension(restArticlesCnt, ['статья', 'статьи', 'статей'])}
        </MoreArticlesLink>
      )}
    </ArticleListWrapper>
  )
}
