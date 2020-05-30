import { TransitionMotion, spring, presets } from 'react-motion'
import { FlatMenu, FlatMenuItem } from './types'
import { MenuLinkWrapper } from './styled'
import { Link } from '../base/link'
import React, { FC, useCallback, useState } from 'react'
import { getPathDepth, PATH_TYPE } from '../../utils/path'
import { Arrow } from './arrow'
import styled from 'styled-components'
import { rhythm } from '../../componentsLibrary/theme/typography'
import {
  AiOutlineMenu as MenuIcon,
  AiOutlineClose as CloseIcon,
} from 'react-icons/ai'

const MobileMenuIcon = styled(MenuIcon)`
  font-size: 20px;
`

const MobileCloseMenuIcon = styled(CloseIcon)`
  font-size: 20px;
`

export const MenuWrapper = styled.nav<{ mobileVisibility: boolean }>`
  top: 0;
  overflow-y: scroll;
  height: 100vh;

  @media (max-width: 1100px) {
    position: fixed;
    left: ${({ mobileVisibility }) => (mobileVisibility ? '0' : '-1101px')};
    background-color: ${({ theme }) => theme.global.background};
    height: 100vh;
    z-index: 1;
    width: 75%;
    padding-right: 12px;
    box-shadow: 0 15px 100px #000;
    transition: left 0.2s ease-in-out;
    padding-bottom: ${rhythm(3)};
  }
  @media (min-width: 1101px) {
    position: sticky;
    min-width: ${rhythm(15)};
    max-width: ${rhythm(15)};
    padding: ${rhythm(0.5)} ${rhythm(1)} 0 0;
  }
`

interface AnimatedMenuItem {
  isActive: boolean
  isOpen: boolean
  withArrow: boolean
  to: string
  title: string
  depthLevel: number
}

const MobileIcoWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 100;
  width: 55px;
  height: 55px;
  padding: 9px;
  box-shadow: 0 0 22px ${({ theme }) => theme.global.hover};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.global.background};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1101px) {
    display: none;
  }
`

const accumulateMenuItems = ({
  currentItems,
  allItems,
  locationPath,
  animatedItems,
}: {
  currentItems: FlatMenuItem[]
  allItems: FlatMenu
  locationPath: string
  animatedItems: AnimatedMenuItem[]
}) => {
  currentItems
    .sort((a, b) => a.date - b.date) // TODO sort on build time
    .forEach((v) => {
      animatedItems.push({
        isActive: locationPath === v.slug,
        isOpen: locationPath.includes(v.slug),
        to: v.slug,
        title: v.title,
        withArrow: getPathDepth(v.slug) !== PATH_TYPE.ARTICLE,
        depthLevel: getPathDepth(v.slug),
      })
      const subItems: FlatMenuItem[] = v.items.map((slug) => allItems[slug])
      if (subItems && locationPath.includes(v.slug)) {
        accumulateMenuItems({
          currentItems: subItems,
          allItems,
          locationPath,
          animatedItems: animatedItems,
        })
      }
    })
  return animatedItems
}

export const Menu: FC<{
  currentItems: FlatMenuItem[]
  allItems: FlatMenu
  locationPath: string
}> = ({ currentItems, allItems, locationPath }) => {
  const [isMobileMenuOpen, setMobileMenuVisibility] = useState<boolean>(false)
  const toggleMobileMenuVisibility = useCallback(() => {
    setMobileMenuVisibility((currentVisibility) => !currentVisibility)
  }, [])
  const animatedMenuItems: AnimatedMenuItem[] = []
  accumulateMenuItems({
    currentItems,
    allItems,
    locationPath,
    animatedItems: animatedMenuItems,
  })
  return (
    <>
      <MenuWrapper mobileVisibility={isMobileMenuOpen}>
        <TransitionMotion
          willLeave={() => ({
            height: spring(0),
            opacity: spring(0),
            paddingTop: spring(0),
            paddingBottom: spring(0),
          })}
          willEnter={() => ({
            height: 25,
            opacity: 1,
            paddingTop: 5,
            paddingBottom: 5,
          })}
          styles={animatedMenuItems.map(
            ({ isActive, isOpen, to, title, withArrow, depthLevel }) => ({
              key: to,
              style: {
                height: spring(65, presets.stiff),
                opacity: spring(1),
                paddingTop: spring(5),
                paddingBottom: spring(5),
              },
              data: {
                isActive,
                isOpen,
                to,
                title,
                withArrow,
                depthLevel: depthLevel,
              },
            })
          )}
        >
          {(interpolatedStyles) => (
            <>
              {interpolatedStyles.map((config) => {
                return (
                  <MenuLinkWrapper
                    key={config.key}
                    isActive={config.data.isActive}
                    style={{ ...config.style }}
                    depthLevel={config.data.depthLevel}
                  >
                    <Link to={config.data.to}>
                      {config.data.title}
                      {config.data.withArrow && (
                        <Arrow isOpen={config.data.isOpen} />
                      )}
                    </Link>
                  </MenuLinkWrapper>
                )
              })}
            </>
          )}
        </TransitionMotion>
      </MenuWrapper>
      <MobileIcoWrapper onClick={toggleMobileMenuVisibility}>
        {isMobileMenuOpen ? <MobileCloseMenuIcon /> : <MobileMenuIcon />}
      </MobileIcoWrapper>
    </>
  )
}
