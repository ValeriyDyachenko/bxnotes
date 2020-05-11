/**
 * '/some/location/path/' -> ['/some/', '/some/location/', '/some/location/path/']
 * @param pathname
 */
export const locationToPaths = (pathname: string) => {
  const paths = decodeURI(pathname)
    .split('/')
    .filter(Boolean)
    .reduce((a, v) => {
      if (a.length === 0) {
        a.push([v])
        return a
      }
      a.push(a[a.length - 1].concat(v))
      return a
    }, [] as string[][])
    .map((v) => `/${v.join('/')}/`)

  return paths
}
