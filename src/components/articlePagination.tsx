import React, { FC } from 'react'
import { PageRendererProps, navigate } from 'gatsby'
import styled from 'styled-components'
import {
  FaLongArrowAltRight as FaLongArrowAltRightSvg,
  FaLongArrowAltLeft as FaLongArrowAltLeftSvg,
} from 'react-icons/fa'
import { rhythm } from '../theme/typography'
import { FlatMenu } from './menu/types'
import { getParentPath, slugIsArticle, slugIsConspect } from '../utils/path'
import { getChilds } from './menu/utils/getChilds'
import { LinkStyled } from './common/linkStyled'

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

const PaginateButton = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  padding: ${rhythm(0.7)} ${rhythm(1)};
  color: ${(props) => props.theme.global.font};
  border-radius: ${rhythm(0.2)};
  background-color: ${(props) => props.theme.global.unhover};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.global.hover};
  }
  flex-grow: 1;
  margin: ${rhythm(0.5)} ${rhythm(0.5)};
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
        <PaginateButton onClick={() => navigate(firstChildSlug)}>
          <LinkStyled to={firstChildSlug}>Читать</LinkStyled>
          <FaLongArrowAltRight />
        </PaginateButton>
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
          <PaginateButton onClick={() => navigate(prevArticle.slug)}>
            <FaLongArrowAltLeft />
            <LinkStyled to={prevArticle.slug}>{prevArticle.title}</LinkStyled>
          </PaginateButton>
        )}
        {nextArticle && (
          <PaginateButton onClick={() => navigate(nextArticle.slug)}>
            <LinkStyled to={nextArticle.slug}>{nextArticle.title}</LinkStyled>
            <FaLongArrowAltRight />
          </PaginateButton>
        )}
      </Paginate>
    )
  }

  return null
}
