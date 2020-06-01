import React, { FC, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link as LinkView } from '../../componentsLibrary/baseComponents/link'

interface Props {
  href: string
}

export const NoopLink: FC<Props> = ({ href, children }) => {
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
    },
    []
  )
  return (
    <LinkView href={href} onClick={onClick}>
      {children}
    </LinkView>
  )
}

NoopLink.propTypes = {
  href: PropTypes.string.isRequired,
}
