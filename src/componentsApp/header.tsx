import React, { FC } from 'react'
import styled from 'styled-components'
import { ToggleButton } from './toggleButton'
import { rhythm } from '../componentsLibrary/theme/typography'
import { FlatMenuItem } from './menu/types'
import { Link } from './base/link'
import { buttonMargin } from '../componentsLibrary/theme/constants'

const LogoWrapper = styled.div`
  display: flex;
  padding: ${rhythm(0.5)} 0 ${rhythm(1.3)};
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const BreadcrumbsWrapper = styled.div`
  display: flex;
  padding: ${rhythm(0.25)} 0 ${rhythm(2)};
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
`

const Thin = styled.span`
  font-weight: 100;
`

const Arrow = styled.span`
  ${buttonMargin.sm}
`

const BcWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 153px;
  width: auto;
`

const TextWrapper = styled.span`
  font-size: ${rhythm(1.2)};
`

interface ThemeManager {
  isDark: boolean
  toggleDark(value?: boolean): void
}

export const Header: FC<{
  breadcrumbs: FlatMenuItem[]
  themeContext: ThemeManager
}> = ({ themeContext, breadcrumbs }) => {
  const breadcrumbsJsx = breadcrumbs.reduce((a: React.ReactElement[], v, i) => {
    if (!v) {
      return a
    }
    const { title, slug } = v
    return title && slug
      ? a
          .concat(
            <BcWrapper key={slug}>
              <Link to={slug} view="text" size="sm" display="initial">
                {title}
              </Link>
            </BcWrapper>
          )
          .concat(i < breadcrumbs.length - 1 ? <Arrow key={i}> > </Arrow> : [])
      : a
  }, [])

  return (
    <>
      <LogoWrapper>
        <Link size="lg" to={'/'}>
          <TextWrapper>
            bxnotes<Thin>.ru</Thin>
          </TextWrapper>
        </Link>
        <ToggleButton
          isOn={themeContext.isDark}
          clickHandler={() => themeContext.toggleDark()}
        />
      </LogoWrapper>
      {breadcrumbsJsx.length > 0 && (
        <BreadcrumbsWrapper>{breadcrumbsJsx}</BreadcrumbsWrapper>
      )}
    </>
  )
}
