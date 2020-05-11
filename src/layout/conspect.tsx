import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { PageRendererProps } from 'gatsby'
import { ConspectPageContext } from './types'
import { Helmet } from 'react-helmet'
import { ArticleInfo } from '../components/articleInfo'

interface Props extends PageRendererProps {
  pageContext: ConspectPageContext
}

export default ({
  location,
  pageContext: { body, title, description, keywords, origin, date },
}: Props) => (
  <>
    <Helmet>
      <title>{title} | bxnotes</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>

    <h1>{title}</h1>
    <MDXRenderer>{body}</MDXRenderer>
    <ArticleInfo
      slug={decodeURI(location.pathname)}
      origin={origin}
      date={date}
    />
  </>
)
