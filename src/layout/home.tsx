import React, { FC } from 'react'
import { PageRendererProps } from 'gatsby'
import { LastArticlesOfConspect, NormalizedMdCommon } from '../../gatsby-node'
import { LinkStyled } from '../components/common/linkStyled'
import { Helmet } from 'react-helmet'
import { Ul } from '../components/menu/styled'
import styled from 'styled-components'
import { styledScale } from '../theme/typography'

const HelloWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.global.hover};
  color: white;
  margin-bottom: -1px;
  width: 100%;
  align-self: center;
`

const HelloTitle = styled.div`
  ${styledScale(1.4)};
`

const HelloDescription = styled.div`
  ${styledScale(0.4)};
`

const HelloButton = styled(LinkStyled)`
  cursor: pointer;
  display: flex;
  border: 1px solid white;
  padding: 10px 20px;
  margin: 35px 0;
  border-radius: 33px;
  transition: background-color 0.2s, color 0.2s;
  background-color: ${({ theme }) => theme.global.hover};
  color: white;
  :hover {
    background-color: white;
    color: black;
  }
`

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
  font-weight: 300;
  white-space: nowrap;
  font-size: 19px;
  padding: 5px 10px;
  margin: 8px 8px 0 0;
  white-space: nowrap;
  border-radius: 1px;
`

const Title = styled.h2`
  margin-top: 60px;
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
      <title>Вxnotes &mdash; web-dev без воды</title>
      <meta
        name="description"
        content="уроки, конспекты, курсы по программированию на bxnotes"
      />
      <meta
        name="keywords"
        content="уроки, конспекты, курсы, программирование, веб-разработка, webdev"
      />
    </Helmet>

    <HelloWrapper>
      <HelloTitle>Bxnotes</HelloTitle>
      <HelloDescription>Web-dev без воды</HelloDescription>
      <HelloButton to="/conspect/">Все конспекты</HelloButton>
    </HelloWrapper>

    <CategoriesWrapper>
      {categories.map((c, i) => (
        <LinkBox key={c.slug} to={c.slug}>
          {c.title}
        </LinkBox>
      ))}
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
