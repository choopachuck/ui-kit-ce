import * as React from 'react'
// https://github.com/storybookjs/storybook/blob/v6.4.8/addons/docs/src/blocks/mdx.tsx#L216
import { HeadersMdx } from '@storybook/addon-docs'
import { HeadersOnPage } from './HeadersOnPage'

// Обновленные компоненты отображения заголовков h1-h6 на вкладке docs
export const HeadersComponentsMdx = Object.keys(HeadersMdx).reduce(
  (acc, headerType) => {
    const CustomHeader = (props) => {
      const headersOnPage = HeadersOnPage.getInstance()
      headersOnPage.add({
        ...props,
        level: headerType,
      })

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const Component = HeadersMdx[headerType]

      return <Component {...props} />
    }

    acc[headerType] = CustomHeader

    return acc
  },
  {}
)
