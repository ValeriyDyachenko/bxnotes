import { createGlobalStyle, DefaultTheme } from 'styled-components'
import { rhythm } from './typography'

enum ColorPaletteLight {
  background = '#fff',
  font = '#000',
  accent = '#a56cc1',
  hover = '#53cde2',
  unhover = '#d1f4fa',
  selected = '#f1f3f4',
}

enum ColorPaletteDark {
  background = '#19262f',
  font = '#c8cad4',
  accent = '#e14594',
  hover = '#4b5cff',
  unhover = '#2b3595',
  selected = '#121f29',
}

enum ColorPaletteCode {
  highlightLineBorderLeftColor = '#d1f4fa',
  highlightCodeLineBg = '#263642',
}

type DarkColors = { [K in keyof typeof ColorPaletteDark]: ColorPaletteDark }
type LigthColors = { [K in keyof typeof ColorPaletteLight]: ColorPaletteLight }
type codeColors = { [K in keyof typeof ColorPaletteCode]: ColorPaletteCode }

export interface Theme extends DefaultTheme {
  isDark?: boolean
  global: DarkColors | LigthColors
  darkPalette: DarkColors
  lightPalette: LigthColors
  code: codeColors
}

const baseTheme = {
  darkPalette: {
    background: ColorPaletteDark.background,
    font: ColorPaletteDark.font,
    accent: ColorPaletteDark.accent,
    hover: ColorPaletteDark.hover,
    unhover: ColorPaletteDark.unhover,
    selected: ColorPaletteDark.selected,
  },
  lightPalette: {
    background: ColorPaletteLight.background,
    font: ColorPaletteLight.font,
    accent: ColorPaletteLight.accent,
    hover: ColorPaletteLight.hover,
    unhover: ColorPaletteLight.unhover,
    selected: ColorPaletteLight.selected,
  },
  code: {
    highlightCodeLineBg: ColorPaletteCode.highlightCodeLineBg,
    highlightLineBorderLeftColor: ColorPaletteCode.highlightLineBorderLeftColor,
  },
}

export const darkTheme: Theme = {
  ...baseTheme,
  global: {
    background: ColorPaletteDark.background,
    font: ColorPaletteDark.font,
    accent: ColorPaletteDark.accent,
    unhover: ColorPaletteDark.unhover,
    hover: ColorPaletteDark.hover,
    selected: ColorPaletteDark.selected,
  },
}

export const lightTheme: Theme = {
  ...baseTheme,
  global: {
    background: ColorPaletteLight.background,
    font: ColorPaletteLight.font,
    accent: ColorPaletteLight.accent,
    unhover: ColorPaletteLight.unhover,
    hover: ColorPaletteLight.hover,
    selected: ColorPaletteLight.selected,
  },
}

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html, body {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${({ theme }) => theme.global.background};
    color: ${({ theme }) => theme.global.font};
    
    transition: background 0.2s ease-out;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.global.font} !important;
  } 
  
  a {
    color: ${({ theme }) => theme.global.font};
  }

  a:hover {
    color: ${({ theme }) => theme.global.font};
  }
  
  hr {
   background-color: ${({ theme }) => theme.isDark && theme.global.hover};
  }
   
  blockquote {
    color: inherit;
    border-left-color: inherit;
  }
  
  .language-text {
    font-size: ${rhythm(0.65)} !important; 
    background: ${({ theme }) => theme.global.selected} !important;
    color: ${({ theme }) => theme.global.font} !important;
  }
  
  .gatsby-highlight > pre {
    font-size: ${rhythm(0.5)} !important;
  }
  
  code {
    white-space: pre-wrap !important;
  }
  
  .gatsby-highlight-code-line {
    background-color: ${({ theme }) => theme.code.highlightCodeLineBg};
    display: block;
    padding-left: 0.75em;
    border-left: .25em solid ${({ theme }) =>
      theme.code.highlightLineBorderLeftColor};
    margin-right: -1em;
    margin-left: -1em;
  }
  
  pre[class*="language-"] {
    background: ${ColorPaletteDark.selected};
  }
  
  :not(pre) > code[class*="language-"] {
    padding: .1em 0.25em;
  }    
      
  ::-webkit-scrollbar {
      width: 8px;
  }
   
  ::-webkit-scrollbar-track {
      color: ${({ theme }) => theme.global.background};
  }
   
  ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) =>
        theme.isDark ? '#21303c' : '#bfbfbf'};
  }  
`
