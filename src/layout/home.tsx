import React, { FC } from 'react'
import { PageRendererProps } from 'gatsby'
import { LastArticlesOfConspect, NormalizedMdCommon } from '../../gatsby-node'
import { LinkStyled } from '../components/common/linkStyled'
import { Helmet } from 'react-helmet'
import { Ul } from '../components/menu/styled'
import styled from 'styled-components'

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const UnderlineLink = styled(LinkStyled)`
  font-weight: 300;
  font-size: 25px;
  margin: 10px 0 10px;
  display: block;
  text-decoration: underline;
`

const Link = styled(LinkStyled)`
  font-weight: 300;
  font-size: 25px;
`

const LinkBox = styled(LinkStyled)`
  background-color: ${({ theme }) => theme.global.unhover};
  display: inline-block;
  font-weight: 300;
  font-size: 25px;
  padding: 5px 10px;
  margin: 17px 0 0 18px;
  white-space: nowrap;
  border-radius: 24px;
`

const LinkBoxDotted = styled(LinkBox)`
  background-color: ${({ theme }) => theme.global.background};
  border: 1px dotted;
`

const Title = styled.h2`
  :not(:first-of-type) {
    margin-top: 84px;
  }
`

interface Props extends PageRendererProps {
  pageContext: {
    lastArticlesOfConspects: LastArticlesOfConspect[]
    categories: NormalizedMdCommon[]
  }
}

const Home: FC<Props> = ({
  pageContext: { lastArticlesOfConspects, categories },
}) => (
  <>
    <Helmet>
      <title>Конспекты по программированию bxnotes</title>
      <meta
        name="description"
        content="уроки, конспекты, курсы по программированию на bxnotes"
      />
      <meta
        name="keywords"
        content="уроки, конспекты, курсы, программирование, веб-разработка, webdev"
      />
    </Helmet>

    <Title>Разделы</Title>

    <CategoriesWrapper>
      {categories.map((c, i) => (
        <LinkBox key={c.slug} to={c.slug}>
          {c.title}
        </LinkBox>
      ))}
      <LinkBoxDotted to="/conspect/">Одним списком</LinkBoxDotted>
    </CategoriesWrapper>

    <Title>Последние статьи</Title>

    <Ul>
      {lastArticlesOfConspects.map((laoc) => (
        <li key={laoc.conspect.slug}>
          <UnderlineLink to={laoc.conspect.slug}>
            {laoc.conspect.title}
          </UnderlineLink>
          <Ul>
            {laoc.articles.map((a) => (
              <li key={a.slug}>
                <Link to={a.slug}>{a.title}</Link>
              </li>
            ))}
          </Ul>
        </li>
      ))}
    </Ul>
  </>
)

export default Home
