import React, { FC } from 'react'
import { PageRendererProps } from 'gatsby'
import { NormalizedMdCommon } from '../../gatsby-node'
import { Link as LinkView } from '../componentsApp/base/link'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { ConspectList } from '../componentsApp/conspectList/conspectList'
import { Title } from '../componentsLibrary/baseComponents/title'
import { rhythm } from '../componentsLibrary/theme/typography'

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: ${rhythm(2)};
`

interface Props extends PageRendererProps {
  pageContext: {
    categories: NormalizedMdCommon[]
    menu: any
    lastUpdatedConspects: string[]
  }
}

const Home: FC<Props> = ({
  pageContext: { categories, menu, lastUpdatedConspects },
}) => (
  <>
    <Helmet>
      <title>
        Уроки, конспекты, курсы по программированию для веб-разработчиков
      </title>
      <meta
        name="description"
        content="уроки, конспекты, курсы по программированию на bxnotes"
      />
      <meta
        name="keywords"
        content="уроки, конспекты, курсы, программирование, веб-разработка, webdev"
      />
    </Helmet>

    <CategoriesWrapper>
      {categories.map((c, i) => (
        <LinkView size={'sm'} view={'button'} key={c.slug} to={c.slug}>
          {c.title}
        </LinkView>
      ))}
      <LinkView size={'sm'} view={'outline'} to="/conspect/">
        Все конспекты
      </LinkView>
    </CategoriesWrapper>

    <Title size="sm" weight={300}>
      Недавно обновлено
    </Title>

    {lastUpdatedConspects?.length > 0 &&
      lastUpdatedConspects.map((slug) => (
        <ConspectList key={slug} slug={slug} menu={menu} />
      ))}
  </>
)

export default Home
