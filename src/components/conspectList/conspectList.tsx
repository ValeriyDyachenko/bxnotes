import React, { FC, ReactElement } from 'react'
import { PageRendererProps } from 'gatsby'
import { FlatMenu, FlatMenuItem } from '../menu/types'
import { getPathDepth, slugIsConspect, PATH_TYPE } from '../../utils/path'
import styled from 'styled-components'
import { rhythm } from '../../theme/typography'
import { declension } from '../../utils/lingvo/declension'
import { ArticleList } from '../articleList/articleList'
import { getChilds } from '../menu/utils/getChilds'
import { LinkStyled } from '../common/linkStyled'
import { FcDocument, FcAbout } from 'react-icons/fc'

const ArticleListWrapper = styled.div`
  display: block;
  font-size: 17px;
`

const Title = styled.h2`
  padding: ${rhythm(0.27)} ${rhythm(0.53)};
  margin: ${rhythm(1.53)} 0 ${rhythm(1)} -${rhythm(0.53)};
  font-weight: 300;
  font-size: ${rhythm(1.33)};
  border-bottom: 1px solid black;
`

const Category = styled.span`
  margin: ${rhythm(1.13)} 0 ${rhythm(0.66)} 0;
  font-size: ${rhythm(1)};
  font-weight: 300;
`

const ConspectItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  min-width: 100%;
  padding: 10px 27px;
  margin: 6px 0 29px 0;
  border-radius: 8px;
  border: 1px dotted ${({ theme }) => theme.global.font};
`

const ConspectItemTitle = styled.div`
  font-size: 32px;
  font-weight: 300;
  display: flex;
  align-items: center;
`

const ConspectInfo = styled.div`
  font-weight: 300;
  font-size: 20px;
  display: flex;
  align-items: center;
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

  return (
    <React.Fragment key={item.slug}>
      {depthDiff === 0 ||
      currentDepth === PATH_TYPE.CONSPECT_INSTANCE ? null : depthDiff === 1 ? (
        <Title>{item.title}</Title>
      ) : (
        <Category>{item.title}</Category>
      )}

      {currentDepth === PATH_TYPE.CONSPECT_INSTANCE ? (
        <ConspectItem>
          <LinkStyled to={item.slug}>
            <ConspectItemTitle>
              <FcDocument />
              &nbsp;
              {item.title}
            </ConspectItemTitle>
          </LinkStyled>
          <ArticleListWrapper>
            <ArticleList
              pathname={item.slug}
              menu={menu}
              title={'Новые статьи:'}
              cnt={3}
            />
          </ArticleListWrapper>
          <ConspectInfo>
            <FcAbout />
            &nbsp;
            {item.items.length}{' '}
            {declension(item.items.length, ['статья', 'статьи', 'статей'])}
            {lastArticleUpdateDate &&
              `, обновлено ${new Date(
                Number(lastArticleUpdateDate)
              ).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`}
          </ConspectInfo>
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
  location: PageRendererProps['location']
  menu: FlatMenu
}> = ({ location, menu }) => {
  if (
    getPathDepth(location.pathname) >= PATH_TYPE.CONSPECT_INSTANCE ||
    location.pathname === '/'
  ) {
    return null
  }
  const item = menu[decodeURI(location.pathname)]
  if (!item) {
    return null
  }
  return createConspectListJSX({
    item,
    menu,
    pathname: decodeURI(location.pathname),
  })
}
