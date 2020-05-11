import * as React from 'react'
import { GoMarkGithub } from 'react-icons/go'
import styled from 'styled-components'
import { rhythm } from '../theme/typography'

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rhythm(4)};
  margin-bottom: ${rhythm(1)};
  text-align: center;
`

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 300;
`

export const Footer = () => (
  <StyledFooter>
    <Link href="https://github.com/ValeriyDyachenko/bxnotes">
      <GoMarkGithub /> &nbsp; bxnotes github
    </Link>
  </StyledFooter>
)
