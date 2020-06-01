import * as React from 'react'
import { GoMarkGithub } from 'react-icons/go'
import styled from 'styled-components'
import { rhythm } from '../componentsLibrary/theme/typography'
import { Link } from '../componentsLibrary/baseComponents/link'

const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${rhythm(4)};
  margin-bottom: ${rhythm(1)};
  text-align: center;
`

export const Footer = () => (
  <StyledFooter>
    <Link href="https://github.com/ValeriyDyachenko/bxnotes">
      <GoMarkGithub /> &nbsp; bxnotes github
    </Link>
  </StyledFooter>
)
