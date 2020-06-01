import React, { FC, useMemo, useContext } from 'react'
import styled, { withTheme } from 'styled-components'
import { Header } from '../componentsApp/header'
import { Footer } from '../componentsApp/footer'
import { GlobalStyle, Theme } from '../componentsLibrary/theme/theme'
import { ArticleNav } from '../componentsApp/articleNav'
import { rhythm } from '../componentsLibrary/theme/typography'
import { graphql, PageRendererProps, useStaticQuery } from 'gatsby'
import { ThemeManagerContext } from 'gatsby-styled-components-dark-mode/ThemeManager'
import { FlatMenu, FlatMenuItem, MenuData } from '../componentsApp/menu/types'
import { getPathDepth, locationToPaths, PATH_TYPE } from '../utils/path'
import { Menu } from '../componentsApp/menu/menu'
import { ConspectList } from '../componentsApp/conspectList/conspectList'
import { ArticlePagination } from '../componentsApp/articlePagination'
import { Helmet } from 'react-helmet'
import { getMenuNormalized } from '../utils/ssrDataStructure/getMenuNormalized'

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

  @media (max-width: 1100px) {
    padding: 0 ${rhythm(0.5)};
  }
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
  const menuNormalizedData: FlatMenu = useMemo(
    () => getMenuNormalized(menuData.allMdx.nodes),
    [menuData.allMdx.nodes]
  )

  const themeContext = useContext(ThemeManagerContext)

  const rootMenuItems = useMemo<FlatMenuItem[]>(() => {
    return Object.values<FlatMenuItem>(menuNormalizedData).filter(
      (n) => getPathDepth(n.slug) === PATH_TYPE.CATEGORY_COMMON
    )
  }, [menuNormalizedData])

  const breadcrumbs = useMemo(() => {
    let bc = locationToPaths(decodeURI(location.pathname)).map(
      (slug) => menuNormalizedData[slug]
    )
    if (bc.length) {
      bc.unshift({ title: 'Главная', slug: '/' } as FlatMenuItem)
    }
    return bc
  }, [location.pathname, menuNormalizedData])

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
          {getPathDepth(location.pathname) < PATH_TYPE.CONSPECT_INSTANCE &&
            location.pathname !== '/' && (
              <ConspectList
                slug={decodeURI(location.pathname)}
                menu={menuNormalizedData}
              />
            )}
          <ArticlePagination location={location} menu={menuNormalizedData} />
        </ContentWrapper>
        <Footer />
      </Content>
      <ArticleNav location={location} />
    </LayoutWrapper>
  )
}

export const Layout = withTheme(Component)
