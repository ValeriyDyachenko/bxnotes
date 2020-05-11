import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { rhythm } from '../theme/typography'
import { PageRendererProps } from 'gatsby'
import { FakeSeoLink } from './common/fakeSeoLink'

const NavWrapper = styled.div`
  position: sticky;
  top: 0;
  overflow-y: auto;
  height: 100vh;
  min-width: ${rhythm(9)};
  max-width: ${rhythm(9)};
  padding: ${rhythm(0.5)} ${rhythm(0.5)} 0 0;
  @media (max-width: 1400px) {
    display: none;
  }
`

const Ul = styled.ul`
  list-style: none;
`

const Li = styled.li`
  cursor: pointer;
  margin: 0 0 ${rhythm(1)};
  font-size: ${rhythm(0.55)};
`

interface Props extends PageRendererProps {}

export const ArticleNav = ({ location }: Props) => {
  const [navJsx, setNavJsx] = useState<JSX.Element[]>()

  useEffect(() => {
    const articleDom = document.querySelector('.articleContainer')
    if (!articleDom) {
      return
    }
    const titles = articleDom.querySelectorAll('h1, h2, h3, h4, h5')
    const nav = [...titles].reduce<JSX.Element[]>((acc, element, i) => {
      const hash = element.querySelector('a')?.hash
      if (hash && element.textContent) {
        acc.push(
          <Li
            onClick={() => {
              if (window) {
                window.scrollTo({
                  top: window.pageYOffset + element.getBoundingClientRect().top,
                  behavior: 'smooth',
                })
              }
            }}
            key={i}
            className={element.localName}
          >
            <FakeSeoLink href={location.pathname + hash.replace('/', '')}>
              {element.textContent}
            </FakeSeoLink>
          </Li>
        )
      }
      return acc
    }, [])
    setNavJsx(nav)
  }, [location.pathname])

  return <NavWrapper>{navJsx && <Ul>{navJsx}</Ul>}</NavWrapper>
}
