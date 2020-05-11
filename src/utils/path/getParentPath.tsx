export const getParentPath = (path: string): string =>
  path.replace(/^(\/.*\/)[^/]+\/$/, '$1')
