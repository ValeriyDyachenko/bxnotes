import React, { FC } from 'react'
import styled from 'styled-components'
import { ToggleButton } from './toggleButton'
import { rhythm } from '../theme/typography'
import { FlatMenuItem } from './menu/types'
import { LinkStyled } from './common/linkStyled'

const LogoWrapper = styled.div`
  display: flex;
  padding: ${rhythm(0.5)} 0 ${rhythm(1.3)};
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const BreadcrumbsWrapper = styled.div`
  display: flex;
  padding: ${rhythm(0.25)} 0 ${rhythm(1)};
  flex-flow: row wrap;
  justify-content: flex-start;
`

const Logo = styled(LinkStyled)`
  font-size: ${rhythm(1)};
  display: block;
`

const Thin = styled.span`
  font-weight: 100;
`

const Crumb = styled.span`
  font-size: ${rhythm(0.55)};
  white-space: nowrap;
  background-color: ${(props) => props.theme.global.unhover};
  border-radius: ${rhythm(0.6)};
  padding: ${rhythm(0.11)} ${rhythm(0.6)};
  margin: 0 ${rhythm(0.6)} ${rhythm(0.6)};
`

interface ThemeManager {
  isDark: boolean
  toggleDark(value?: boolean): void
}

export const Header: FC<{
  breadcrumbs: FlatMenuItem[]
  themeContext: ThemeManager
}> = ({ themeContext, breadcrumbs }) => {
  return (
    <>
      <LogoWrapper>
        <Logo to={'/'}>
          bxnotes<Thin>.ru</Thin>
        </Logo>
        <ToggleButton
          isOn={themeContext.isDark}
          clickHandler={() => themeContext.toggleDark()}
        />
      </LogoWrapper>
      <BreadcrumbsWrapper>
        {breadcrumbs.reduce((a: React.ReactElement[], v) => {
          if (!v) {
            return a
          }
          const { title, slug } = v
          return title && slug
            ? a.concat(
                <Crumb key={slug}>
                  <LinkStyled to={slug}>{title}</LinkStyled>
                </Crumb>
              )
            : a
        }, [])}
      </BreadcrumbsWrapper>
    </>
  )
}
