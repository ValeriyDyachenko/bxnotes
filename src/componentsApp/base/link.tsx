import React, { FC, useCallback } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import { Link as View } from '../../componentsLibrary/baseComponents/link'
import { ElementSize, LinkTheme } from '../../componentsLibrary/theme/constants'
import { LinkDisplay } from '../../componentsLibrary/baseComponents/link/link'

interface Props {
  to: string
  view?: LinkTheme
  size?: ElementSize
  display?: LinkDisplay
}

export const Link: FC<Props> = ({ view, size, to, children, display }) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      navigate(to)
    },
    [to]
  )
  return (
    <View href={to} onClick={onClick} view={view} size={size} display={display}>
      {children}
    </View>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  view: PropTypes.oneOf<LinkTheme>(['text', 'button', 'outline']),
  size: PropTypes.oneOf<ElementSize>(['sm', 'md', 'lg']),
  display: PropTypes.oneOf<LinkDisplay>(['flex', 'initial']),
}

Link.defaultProps = {
  view: 'text',
  size: 'md',
  display: 'flex',
}
