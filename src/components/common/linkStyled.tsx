import styled from 'styled-components'
import { Link } from 'gatsby'

export const LinkStyled = styled(Link)<{ to: string }>`
  color: ${(props) => props.theme.global.font};
  :hover {
    color: ${(props) => props.theme.global.font};
  }
`
