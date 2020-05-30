import { CreatePageArgs, GatsbyNode, Node } from 'gatsby'
import path from 'path'
import {
  slugIsArticle,
  slugIsCategoryDetail,
  getParentPath,
  slugIsConspect,
} from './src/utils/path'
import { createFilePath } from 'gatsby-source-filesystem'
import { ConspectPageContext } from './src/layout/types'
import { getMenuNormalized } from './src/utils/ssrDataStructure/getMenuNormalized'

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

  const categoryNodes: NormalizedMdCommon[] = []
  const articleNodes: NormalizedMdCommon[] = []
  const articleLimit = 10
  const lastUpdatedConspects = new Set<string>()
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (slugIsCategoryDetail(node.fields.slug)) {
      categoryNodes.push({
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
        ...(node.fields.items && { items: node.fields.items }),
      })
    } else if (
      slugIsArticle(node.fields.slug) &&
      articleNodes.length < articleLimit
    ) {
      articleNodes.push({
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.fields.slug,
      })
      lastUpdatedConspects.add(getParentPath(node.fields.slug))
    }
  }
  // filter old conspects from menu for lastConspectList component
  const menu = getMenuNormalized(nodes)
  const lastUpdatedMenu = Object.fromEntries(
    Object.entries(menu).filter(([slug, items]) => {
      if (
        slugIsArticle(slug) &&
        lastUpdatedConspects.has(getParentPath(slug))
      ) {
        return true
      }
      if (slugIsConspect(slug) && lastUpdatedConspects.has(slug)) {
        return true
      }
    })
  )

  actions.createPage({
    path: '/',
    component: require.resolve(`./src/layout/home.tsx`),
    context: {
      menu: lastUpdatedMenu,
      categories: categoryNodes,
      lastUpdatedConspects: [...lastUpdatedConspects],
    },
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
