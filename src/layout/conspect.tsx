import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { PageRendererProps } from 'gatsby'
import { ConspectPageContext } from './types'
import { Helmet } from 'react-helmet'
import { ArticleInfo } from '../componentsApp/articleInfo'
import { rhythm } from '../componentsLibrary/theme/typography'
import styled from 'styled-components'

const StyledHr = styled.hr`
  margin: -${rhythm(0.5)} 0 ${rhythm(1.75)};
`

interface Props extends PageRendererProps {
  pageContext: ConspectPageContext
}

export default ({
  location,
  pageContext: { body, title, description, keywords, origin, date },
}: Props) => {
  const slug = decodeURI(location.pathname)
  return (
    <>
      <Helmet>
        <title>{title} | bxnotes</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>

      <h1>{title}</h1>
      <StyledHr />
      <MDXRenderer>{body}</MDXRenderer>
      <ArticleInfo slug={slug} origin={origin} date={date} />
    </>
  )
}
