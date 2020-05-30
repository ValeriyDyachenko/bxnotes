import React from 'react'
import { PageRendererProps, WrapPageElementNodeArgs } from 'gatsby'
import 'prism-themes/themes/prism-dracula.css'
import './src/componentsLibrary/theme/custom-prism.css'
import { Layout } from './src/layout/layout'

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementNodeArgs) => (
  <Layout location={(props as PageRendererProps).location}>{element}</Layout>
)
