import styled, { css, Interpolation } from 'styled-components'
import PropTypes from 'prop-types'
import React, { FC } from 'react'
import { rhythm } from '../../theme/typography'
import {
  buttonPadding,
  buttonMargin,
  ElementSize,
  LinkTheme,
  fontSize,
} from '../../theme/constants'

export type LinkDisplay = 'flex' | 'initial'

const themeMixins: Record<LinkTheme, Interpolation<any>> = {
  outline: css`
    border: 1px solid ${({ theme }) => theme.global.font};
    border-radius: ${rhythm(0.1)};
    color: ${({ theme }) => theme.global.font};
    background-color: ${({ theme }) => theme.global.background};
    :hover {
      border: 1px solid ${({ theme }) => theme.global.hover};
      background-color: ${({ theme }) => theme.global.hover};
    }
  `,
  button: css`
    border-radius: ${rhythm(0.1)};
    color: ${(props) => props.theme.global.font};
    background-color: ${(props) => props.theme.global.unhover};
    :hover {
      background-color: ${(props) => props.theme.global.hover};
    }
  `,
  text: css``,
}

const sizeMixins: Record<LinkTheme, Record<ElementSize, Interpolation<any>>> = {
  button: {
    sm: css`
      ${buttonPadding['sm']};
      ${buttonMargin['sm']};
      ${fontSize['sm']};
    `,
    md: css`
      ${buttonPadding['md']};
      ${buttonMargin['md']};
      ${fontSize['md']};
    `,
    lg: css`
      ${buttonPadding['lg']};
      ${buttonMargin['lg']};
      ${fontSize['lg']};
    `,
  },
  outline: {
    sm: css`
      ${buttonPadding['sm']};
      ${buttonMargin['sm']};
      ${fontSize['sm']};
    `,
    md: css`
      ${buttonPadding['md']};
      ${buttonMargin['md']};
      ${fontSize['md']};
    `,
    lg: css`
      ${buttonPadding['lg']};
      ${buttonMargin['lg']};
      ${fontSize['lg']};
    `,
  },
  text: {
    sm: css`
      ${buttonMargin['sm']};
      ${fontSize['sm']};
    `,
    md: css`
      ${buttonMargin['md']};
      ${fontSize['md']};
    `,
    lg: css`
      ${buttonMargin['lg']};
      ${fontSize['lg']};
    `,
  },
}

const View = styled.a<{
  view: LinkTheme
  size: ElementSize
  display: LinkDisplay
}>`
  ${({ display }) =>
    display === 'flex'
      ? css`
          display: flex;
          flex-flow: row wrap;
          flex-grow: 0;
          flex-wrap: nowrap;
          justify-content: space-between;
          align-items: center;
        `
      : display === 'initial'
      ? css`
          display: initial;
        `
      : ''}

  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.global.font};
  :hover {
    color: ${(props) => props.theme.global.font};
  }
  text-decoration: none !important;
  transition: background-color 0.3s, color 0.3s;
  ${({ view, size }) =>
    css`
      ${themeMixins[view]}
      ${sizeMixins[view][size]}
    `}
`

interface Props {
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  view?: LinkTheme
  size?: ElementSize
  display?: LinkDisplay
}

export const Link: FC<Props> = ({
  view,
  href,
  onClick,
  children,
  size,
  display,
}) => (
  <View
    href={href}
    onClick={onClick}
    view={view as LinkTheme}
    size={size as ElementSize}
    display={display as LinkDisplay}
  >
    {children}
  </View>
)

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  view: PropTypes.oneOf<LinkTheme>(['text', 'button', 'outline']),
  size: PropTypes.oneOf<ElementSize>(['sm', 'md', 'lg']),
  display: PropTypes.oneOf<LinkDisplay>(['flex', 'initial']),
}

Link.defaultProps = {
  onClick: () => {},
  view: 'text',
  size: 'md',
  display: 'flex',
}
