import styled from 'styled-components'
import { Link } from 'gatsby'
import { fontSize } from '../../componentsLibrary/theme/constants'

export const Ul = styled.ul`
  list-style: none;
  margin-top: 0;
`

export const Li = styled.li`
  cursor: pointer;
  color: ${(props) => props.theme.global.font};
`

export const MenuLinkWrapper = styled(Link)<{
  isActive: boolean
  depthLevel: number
}>`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  flex-grow: 0;
  flex-wrap: nowrap;
  padding-right: 32px;
  padding-left: ${({ depthLevel }) => `${(depthLevel - 2) * 23 + 32}px`};
  overflow: hidden;
  transition: background-color 0.4s;
  border-radius: 2px;
  ${fontSize['md']};
  text-decoration: none;
  ${(props) =>
    props.isActive &&
    `
      background-color: ${props.theme.global.unhover};
    `}
`
