import { getPathDepth, PATH_TYPE } from './'

export const slugIsArticle = (slug: string) =>
  getPathDepth(slug) === PATH_TYPE.ARTICLE

export const slugIsConspect = (slug: string) =>
  getPathDepth(slug) === PATH_TYPE.CONSPECT_INSTANCE

export const slugIsCategoryDetail = (slug: string) =>
  getPathDepth(slug) === PATH_TYPE.CATEGORY_DETAIL

export const slugIsCategoryCommon = (slug: string) =>
  getPathDepth(slug) === PATH_TYPE.CATEGORY_COMMON

export const slugIsRoot = (slug: string) =>
  getPathDepth(slug) === PATH_TYPE.CATEGORY_COMMON
