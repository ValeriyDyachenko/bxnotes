import styled from 'styled-components'
import React, { FC, useCallback } from 'react'

const FakeLinkView = styled.a`
  color: ${({ theme }) => theme.global.font};
  :hover {
    color: ${({ theme }) => theme.global.font};
  }
`

export const FakeSeoLink: FC<{
  href: string
  clickHandler?: Function | undefined
}> = ({ children, href, clickHandler }) => {
  const handleClick = useCallback(
    (e: Event) => {
      e.preventDefault()
      clickHandler && clickHandler()
    },
    [clickHandler]
  )
  return (
    <FakeLinkView onClick={handleClick} href={href}>
      {children}
    </FakeLinkView>
  )
}
