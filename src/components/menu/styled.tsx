import styled from 'styled-components'
import { Link } from 'gatsby'

export const Ul = styled.ul`
  list-style: none;
  margin-top: 0;
`

export const Li = styled.li`
  cursor: pointer;
  color: ${(props) => props.theme.global.font};
`

export const MenuLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['isActive', 'depthLevel'].includes(prop),
})<{
  to: string
  isActive: boolean
  depthLevel: number
}>`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.global.font};
  margin-left: ${({ depthLevel }) => `${(depthLevel - 2) * 23 + 20}px`};
  padding-right: 12px;
  padding-left: 12px;
  border-radius: 19px;
  :hover {
    color: ${(props) => props.theme.global.font};
  }
  overflow: hidden;
  ${(props) =>
    props.isActive &&
    `
      border: 2px dotted ${props.theme.global.hover};
    `}
`
