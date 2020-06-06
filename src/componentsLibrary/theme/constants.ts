import { css, Interpolation } from 'styled-components'
import { rhythm, styledScale } from './typography'

export type ElementSize = 'sm' | 'md' | 'lg'

export type LinkTheme = 'text' | 'button' | 'outline'

export const buttonPadding: Record<ElementSize, Interpolation<any>> = {
  sm: css`
    padding: ${rhythm(0.2)} ${rhythm(1)};
  `,
  md: css`
    padding: ${rhythm(0.4)} ${rhythm(1)};
  `,
  lg: css`
    padding: ${rhythm(0.6)} ${rhythm(1)};
  `,
}

export const buttonMargin: Record<ElementSize, Interpolation<any>> = {
  sm: css`
    margin: ${rhythm(0.2)} ${rhythm(0.4)} ${rhythm(0.2)} 0;
  `,
  md: css`
    margin: ${rhythm(0.4)} ${rhythm(0.8)} ${rhythm(0.4)} 0;
  `,
  lg: css`
    margin: ${rhythm(0.6)} ${rhythm(1.2)} ${rhythm(0.6)} 0;
  `,
}

export const fontSize: Record<ElementSize, Interpolation<any>> = {
  sm: css`
    font-size: ${rhythm(0.65)};
  `,
  md: css`
    font-size: ${rhythm(0.7)};
  `,
  lg: css`
    font-size: ${rhythm(0.75)};
  `,
}

export const titleMargin: Record<ElementSize, Interpolation<any>> = {
  sm: css`
    margin: 0 0 ${rhythm(0.7)};
  `,
  md: css`
    margin: 0 0 ${rhythm(1.2)};
  `,
  lg: css`
    margin: 0 0 ${rhythm(1.4)};
  `,
}

export const titleSize: Record<ElementSize, Interpolation<any>> = {
  sm: css`
    ${styledScale(0.15)};
    ${titleMargin.sm};
  `,
  md: css`
    ${styledScale(0.7)};
    ${titleMargin.md};
  `,
  lg: css`
    ${styledScale(0.9)};
    ${titleMargin.lg};
  `,
}
