import { CreatePageArgs, GatsbyNode, Node } from 'gatsby'
import path from 'path'
import { getParentPath, PATH_TYPE, slugIsArticle } from './src/utils/path'
import { createFilePath } from 'gatsby-source-filesystem'
import { ConspectPageContext } from './src/layout/types'

export interface MdQuery {
  allMdx: {
    nodes: MdFileData[]
  }
}

export interface MdFileData {
  frontmatter: {
    title?: string
    skipInMenu?: boolean
    date?: number
    origin?: string
    keywords?: string
    description?: string
  }
  fields: {
    items: string[] | null
    slug: string
    origin?: string
  }
  body: string
}

export interface NormalizedMdCommon {
  slug: string
  title?: string
  date?: number
  items?: string[]
}

export interface LastArticlesOfConspect {
  conspect: NormalizedMdCommon
  articles: NormalizedMdCommon[]
}

interface NodeMd extends Node, MdFileData {}

export const createPages: GatsbyNode['createPages'] = async function ({
  actions,
  graphql,
}) {
  const { data: postData } = await graphql<MdQuery>(`
    query Content {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          fields {
            items
            slug
            origin
          }
          frontmatter {
            title
            date(formatString: "x")
            skipInMenu
            origin
            keywords
            description
          }
          body
        }
      }
    }
  `)

  if (!postData) {
    return
  }

  const nodes = postData.allMdx.nodes

  nodes.forEach((node) => {
    const {
      body,
      frontmatter: { title, description, keywords, date },
      fields: { slug, origin },
    } = node
    actions.createPage<ConspectPageContext>({
      path: slug,
      component: require.resolve(`./src/layout/conspect.tsx`),
      context: { body, title, description, keywords, origin, date },
    })
  })

  const articleNodes: NormalizedMdCommon[] = []
  const categoryNodes: NormalizedMdCommon[] = []
  const articleLimit = 25

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (
      (node.fields.slug.match(/\//g) || []).length - 1 === PATH_TYPE.ARTICLE &&
      articleNodes.length <= articleLimit
    ) {
      articleNodes.push({
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
      })
    }
    if (
      (node.fields.slug.match(/\//g) || []).length - 1 ===
      PATH_TYPE.CATEGORY_DETAIL
    ) {
      categoryNodes.push({
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
        ...(node.fields.items && { items: node.fields.items }),
      })
    }
  }

  let lastArticlesOfConspects: LastArticlesOfConspect[] = articleNodes.reduce(
    (lastArticles: LastArticlesOfConspect[], article) => {
      const conspectSlug = getParentPath(article.slug)
      const conspectData = nodes.find((n) => n.fields.slug === conspectSlug)
      if (!conspectData) {
        return lastArticles
      }
      const conspectIndex = lastArticles.findIndex(
        (la: LastArticlesOfConspect) =>
          la.conspect.slug === conspectData.fields.slug
      )
      if (conspectIndex > -1) {
        lastArticles[conspectIndex].articles.push(article)
        return lastArticles
      }
      lastArticles.push({
        articles: [article],
        conspect: {
          title: conspectData.frontmatter.title,
          date: conspectData.frontmatter.date,
          slug: conspectData.fields.slug,
        },
      })
      return lastArticles
    },
    []
  )

  actions.createPage({
    path: '/',
    component: require.resolve(`./src/layout/home.tsx`),
    context: { lastArticlesOfConspects, categories: categoryNodes },
  })
}

const ROOT_PATH = '/conspect'

interface OnCreateNode extends CreatePageArgs {
  node: Node
}

// Add fields "slug", "origin" and "items" to nodes.
// Field "items" contain slugs of child items.
// Article's field "origin" contain parent origin if own is empty.
export const onCreateNode = ({
  node,
  getNode,
  getNodesByType,
  actions,
}: OnCreateNode) => {
  if (node.internal.type === `Mdx`) {
    const { createNodeField } = actions
    const slug =
      ROOT_PATH + createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    if (slug !== '/' && slug !== ROOT_PATH + '/') {
      const slugPathDirname = path.dirname(slug)
      const parentSlug =
        ROOT_PATH + slugPathDirname === ROOT_PATH + '/'
          ? ROOT_PATH + '/'
          : slugPathDirname + '/'
      const parentNode: NodeMd | undefined = getNodesByType('Mdx').find(
        (n: Node) => {
          const nFileNode = getNode(n.parent)
          const nSlug = !!nFileNode.relativeDirectory
            ? ROOT_PATH + `/${nFileNode.relativeDirectory}/${nFileNode.name}/`
            : nFileNode.name !== 'index'
            ? ROOT_PATH + `/${nFileNode.name}/`
            : ROOT_PATH + `/`
          if (parentSlug === nSlug) {
            return true
          }
        }
      )
      if (parentNode) {
        const items =
          !parentNode.fields || !parentNode.fields.items
            ? [slug]
            : parentNode.fields.items.concat(slug)
        createNodeField({
          node: parentNode,
          name: `items`,
          value: items, // TODO sort by date
        })
        if (slugIsArticle(slug)) {
          createNodeField({
            node,
            name: `origin`,
            value:
              (node as NodeMd).frontmatter.origin ||
              parentNode.frontmatter.origin,
          })
        }
      }
    }
  }
}
