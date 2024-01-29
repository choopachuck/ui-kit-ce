import * as React from 'react'
import { createTheme, Theme, Grid } from '@v-uik/base'
import { TokenViewContext } from './TokenViewContext'
import { ThemeTokens } from '../../types'
import { Col } from './components/Col'
import { DocsAlert } from '../../../../config/DocsAlert'
//@ts-ignore
import themeTokens from '../../../../theme-tokens.json'

const dirtyHack = () => {
  const content = document.querySelector('.sbdocs-content')
  if (content) {
    //@ts-ignore
    content.style.maxWidth = 'unset'
  }

  const menu = document.querySelector('ul[class^="root"]')
  if (menu) {
    //@ts-ignore
    menu.style.display = 'none'
  }

  const root = document.querySelector('div[class^="root"]')

  if (root) {
    //@ts-ignore
    root.style.display = 'block'
  }
}

type TokensViewerProps = {
  theme?: Theme
}

export const TokensViewer: React.FC<TokensViewerProps> = ({ theme }) => {
  if (!themeTokens) {
    return <DocsAlert type="danger">Файл с токенами не найден</DocsAlert>
  }

  React.useEffect(() => {
    dirtyHack()
  }, [])

  return (
    <TokenViewContext.Provider
      value={{
        theme: theme ?? createTheme(),
        themeTokens: themeTokens as ThemeTokens,
      }}
    >
      <Grid nowrap>
        <Col key="root" node={themeTokens as ThemeTokens} />
      </Grid>
    </TokenViewContext.Provider>
  )
}
