import * as React from 'react'
import {
  List,
  ListItem,
  Divider,
  ThemeProvider,
  createTheme,
} from '@v-uik/base'

const theme = createTheme({
  comp: {
    divider: {
      widthBorder: 4,
      colorBorder: 'red',
      styleBorder: 'solid',
    },
  },
})

export const TokensCustom = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <List style={{ width: 250 }}>
        <ListItem>Option 1</ListItem>
        <Divider as="li" />
        <ListItem>Option 2</ListItem>
        <Divider as="li" />
        <ListItem>Option 3</ListItem>
        <Divider width={1} as="li" />
        <ListItem>Option 4</ListItem>
      </List>
    </ThemeProvider>
  )
}
