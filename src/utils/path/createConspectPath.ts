interface CreateConspectPath {
  relativeDirectory: string
  name: string
}

export const createConspectPath = ({
  relativeDirectory,
  name,
}: CreateConspectPath): string => {
  const path = `/conspect/${relativeDirectory}${
    relativeDirectory.length > 0 ? '/' : ''
  }${name}/`
  return path !== '/conspect/index/' ? path : '/conspect/'
}
