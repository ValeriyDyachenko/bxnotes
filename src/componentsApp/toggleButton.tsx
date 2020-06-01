import React, { FC } from 'react'
import styled, { withTheme } from 'styled-components'
import { rhythm } from '../componentsLibrary/theme/typography'
import { Theme } from '../componentsLibrary/theme/theme'
import { FaMoon } from 'react-icons/fa'
import { FaLightbulb } from 'react-icons/fa'

const ToggleBody = styled.div<{ isOn: boolean }>`
  position: relative;
  width: ${rhythm(2)};
  height: ${rhythm(1)};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.global.unhover};
  cursor: pointer;
`

const TogglePoint = styled.div<{ isOn: boolean }>`
  position: absolute;
  text-align: center;
  padding: ${rhythm(0.1)};
  width: ${rhythm(1)};
  height: ${rhythm(1)};
  border-radius: 100%;
  transform: translate(${({ isOn }) => (isOn ? rhythm(1) : 0)}, 0);
  transition: transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
  color: ${(props) => props.theme.global.hover};
  will-change: transform;
`

const Component: FC<{
  clickHandler: () => void
  isOn: boolean
  theme: Theme
}> = ({ clickHandler, isOn }) => (
  <ToggleBody isOn={isOn} onClick={clickHandler}>
    <TogglePoint isOn={isOn}>{isOn ? <FaLightbulb /> : <FaMoon />}</TogglePoint>
  </ToggleBody>
)
export const ToggleButton = withTheme(Component)
