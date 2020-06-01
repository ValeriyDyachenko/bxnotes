import styled from 'styled-components'

export const Ul = styled.ul`
  list-style: none;
  margin-top: 0;
`

export const Li = styled.li`
  cursor: pointer;
  color: ${(props) => props.theme.global.font};
`

export const MenuLinkWrapper = styled.div<{
  isActive: boolean
  depthLevel: number
}>`
  display: flex;
  align-items: center;
  margin-left: ${({ depthLevel }) => `${(depthLevel - 2) * 23 + 20}px`};
  padding-right: 12px;
  padding-left: 12px;
  border-radius: 19px;
  :hover {
    color: ${(props) => props.theme.global.font};
  }
  overflow: hidden;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  ${(props) =>
    props.isActive &&
    `
      border: 2px dotted ${props.theme.global.hover};
    `}
`
