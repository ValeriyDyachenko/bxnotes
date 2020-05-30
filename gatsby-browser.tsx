import 'prism-themes/themes/prism-dracula.css'
import './src/componentsLibrary/theme/custom-prism.css'
import { WrapPageElementBrowserArgs, PageRendererProps } from 'gatsby'
import React from 'react'
import { Layout } from './src/layout/layout'

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => (
  <Layout location={(props as PageRendererProps).location}>{element}</Layout>
)
