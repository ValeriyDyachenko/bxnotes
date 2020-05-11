/**
 * path max depth to article is 5: /conspect/lang/js/practice-js/article-1/
 */
// TODO fix path getter for '/' case
export const getPathDepth = (path: string): number =>
  (path.match(/\//g) || []).length - 1
