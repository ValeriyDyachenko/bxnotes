import { FlatMenu, MenuNode } from '../../componentsApp/menu/types'
export const getMenuNormalized = (nodes: MenuNode[]) => {
  return nodes.reduce((a: FlatMenu, v) => {
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
}
