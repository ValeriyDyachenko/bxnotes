import { CSSObject } from 'styled-components'
import Typography from 'typography'
import moragaTheme from 'typography-theme-moraga'

// moragaTheme.overrideThemeStyles = () => ({
//   'a.gatsby-resp-image-link': {
//     boxShadow: `none`,
//   },
// })

const typography = new Typography(moragaTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export const rhythm = typography.rhythm
export const scale = typography.scale
export const styledScale = scale as (values: number) => CSSObject

export default typography
