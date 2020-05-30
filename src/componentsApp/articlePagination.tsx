import React, { FC } from 'react'
import { PageRendererProps } from 'gatsby'
import styled from 'styled-components'
import {
  FaLongArrowAltRight as FaLongArrowAltRightSvg,
  FaLongArrowAltLeft as FaLongArrowAltLeftSvg,
} from 'react-icons/fa'
import { rhythm } from '../componentsLibrary/theme/typography'
import { FlatMenu } from './menu/types'
import { getParentPath, slugIsArticle, slugIsConspect } from '../utils/path'
import { getChilds } from './menu/utils/getChilds'
import { Link } from './base/link'

const FaLongArrowAltRight = styled(FaLongArrowAltRightSvg)`
  margin-left: ${rhythm(0.6)};
  min-width: ${rhythm(0.5)};
  max-width: ${rhythm(0.5)};
`

const FaLongArrowAltLeft = styled(FaLongArrowAltLeftSvg)`
  margin-right: ${rhythm(0.6)};
  min-width: ${rhythm(0.5)};
  max-width: ${rhythm(0.5)};
`

const Paginate = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: start;
  margin: ${rhythm(2)} 0;
  flex-grow: 1;
`

interface Props extends PageRendererProps {
  menu: FlatMenu
}

export const ArticlePagination: FC<Props> = ({ location, menu }) => {
  const item = menu[decodeURI(location.pathname)]

  if (!item) {
    return null
  }

  if (slugIsConspect(item.slug)) {
    const firstChildSlug = getChilds(item, menu)[0].slug
    return (
      <Paginate>
        <Link view="button" size="lg" to={firstChildSlug}>
          Читать &nbsp; <FaLongArrowAltRight />
        </Link>
      </Paginate>
    )
  }

  if (slugIsArticle(item.slug)) {
    const parentConspectSlug = getParentPath(item.slug)
    const siblingArticles = getChilds(menu[parentConspectSlug], menu)
    const currentIndex = siblingArticles.findIndex(
      (article) => article.slug === item.slug
    )
    const prevArticle = currentIndex > 0 && siblingArticles[currentIndex - 1]
    const nextArticle =
      currentIndex < siblingArticles.length && siblingArticles[currentIndex + 1]

    return (
      <Paginate>
        {prevArticle && (
          <Link to={prevArticle.slug} view="button" size="lg">
            <FaLongArrowAltLeft />
            {prevArticle.title}
          </Link>
        )}
        {nextArticle && (
          <Link to={nextArticle.slug} view="button" size="lg">
            {nextArticle.title}
            <FaLongArrowAltRight />
          </Link>
        )}
      </Paginate>
    )
  }

  return null
}
