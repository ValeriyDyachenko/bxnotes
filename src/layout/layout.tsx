import React, { FC, useMemo, useContext } from 'react'
import styled, { withTheme } from 'styled-components'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { GlobalStyle, Theme } from '../theme/theme'
import { ArticleNav } from '../components/articleNav'
import { rhythm } from '../theme/typography'
import { graphql, PageRendererProps, useStaticQuery } from 'gatsby'
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode/ThemeManager'
import { FlatMenu, FlatMenuItem, MenuData } from '../components/menu/types'
import { getPathDepth, locationToPaths, PATH_TYPE } from '../utils/path'
import { Menu } from '../components/menu/menu'
import { ConspectList } from '../components/conspectList/conspectList'
import { ArticlePagination } from '../components/articlePagination'
import { Helmet } from 'react-helmet'

const LayoutWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: start;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  padding: 0 ${rhythm(2.5)};
  flex-grow: 1;
`

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

interface Props extends PageRendererProps {
  theme: Theme
}

const Component: FC<Props> = ({ theme, location, children }) => {
  const menuData = useStaticQuery<MenuData>(
    graphql`
      query Content {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
          nodes {
            fields {
              items
              slug
            }
            frontmatter {
              title
              date(formatString: "x")
              skipInMenu
            }
          }
        }
      }
    `
  )

  // TODO transform on build time
  const menuNormalizedData: FlatMenu = useMemo(() => {
    return menuData.allMdx.nodes.reduce((a: FlatMenu, v) => {
      if (v.frontmatter.date && v.fields.slug && v.frontmatter.title) {
        a[v.fields.slug] = {
          date: v.frontmatter.date,
          slug: v.fields.slug,
          items: v.fields.items || [],
          title: v.frontmatter.title,
          skip: !!v.frontmatter.skipInMenu,
        }
      }
      return a
    }, {})
  }, [menuData.allMdx.nodes])

  const themeContext = useContext(ThemeManagerContext)

  const rootMenuItems = useMemo<FlatMenuItem[]>(() => {
    return Object.values<FlatMenuItem>(menuNormalizedData).filter(
      (n) => getPathDepth(n.slug) === PATH_TYPE.CATEGORY_COMMON
    )
  }, [menuNormalizedData])

  const breadcrumbs = useMemo(
    () =>
      locationToPaths(decodeURI(location.pathname))
        .slice(0, -1)
        .map((slug) => menuNormalizedData[slug]),
    [location.pathname, menuNormalizedData]
  )

  return (
    <LayoutWrapper>
      <GlobalStyle theme={theme} />
      <Helmet>
        <html lang="ru" />
        <meta name="yandex-verification" content="f0c9700eacd5657a" />
        <meta
          name="google-site-verification"
          content="IaVAbXTekQuLmC-rZiCoB4BXI33RlNi1Nfrra6UxRDw"
        />
      </Helmet>
      <Menu
        currentItems={rootMenuItems}
        allItems={menuNormalizedData}
        locationPath={decodeURI(location.pathname)}
      />
      <Content className="articleContainer">
        <Header breadcrumbs={breadcrumbs} themeContext={themeContext} />
        <ContentWrapper>
          {children}
          <ConspectList location={location} menu={menuNormalizedData} />
          <ArticlePagination location={location} menu={menuNormalizedData} />
        </ContentWrapper>
        <Footer />
      </Content>
      <ArticleNav location={location} />
    </LayoutWrapper>
  )
}

export const Layout = withTheme(Component)
