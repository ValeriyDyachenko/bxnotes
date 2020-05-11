import { FlatMenu, FlatMenuItem } from '../types'

// TODO sort items on build time
export const getChilds = (item: FlatMenuItem, menu: FlatMenu) =>
  item.items.map((slug) => menu[slug]).sort((a, b) => a.date - b.date)
