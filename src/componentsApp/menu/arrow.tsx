import React, { FC } from 'react'
import { FiArrowRight as ArrowIcon } from 'react-icons/all'
import styled from 'styled-components'

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  margin: 0;
  padding: 0;
  max-width: 30px;
  max-height: 30px;
  display: flex;
  align-self: center;
  opacity: ${({ isOpen }) => (isOpen ? `1` : `0.2`)};
  transition: transform 0.5s, opacity 1s;
  transform: rotate(${({ isOpen }) => (isOpen ? `90deg` : `0deg`)});
  margin-left: 20px;
`

export const Arrow: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <ArrowWrapper isOpen={isOpen}>
      <ArrowIcon />
    </ArrowWrapper>
  )
}
