import React, { FC, ReactElement } from 'react'
import styled, { Interpolation, css } from 'styled-components'
import { ElementSize, titleSize } from '../../theme/constants'

const sizeMixins: Record<ElementSize, Interpolation<any>> = {
  sm: titleSize.sm,
  md: titleSize.md,
  lg: titleSize.lg,
}

const View = styled.div<{ size: ElementSize; weight: Props['weight'] }>`
  font-size: 21px;
  font-weight: 300;
  ${({ size }) =>
    css`
      ${sizeMixins[size]}
    `};
  ${({ weight }) => `font-weight: ${weight}`};
`

interface Props {
  renderAs?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  size?: ElementSize
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

export const Title: FC<Props> = ({
  renderAs,
  children,
  size,
  weight,
}): ReactElement => (
  <View as={renderAs} size={size} weight={weight}>
    {children}
  </View>
)

Title.defaultProps = {
  renderAs: 'div',
  size: 'md',
  weight: 400,
}
