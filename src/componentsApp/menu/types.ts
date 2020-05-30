type Slug = string

export interface MenuData {
  allMdx: {
    nodes: MenuNode[]
  }
}

export interface MenuNode {
  frontmatter: {
    title?: string
    skipInMenu?: boolean
    date?: number
  }
  fields: {
    items: string[] | null
    slug: Slug
  }
}

export interface FlatMenuItem {
  title: string
  date: number
  items: Slug[]
  slug: Slug
  skip: boolean
}

export type FlatMenu = Record<Slug, FlatMenuItem>
