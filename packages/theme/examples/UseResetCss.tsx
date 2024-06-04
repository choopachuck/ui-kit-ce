import React from 'react'

import { Text, Underlay, useResetCss } from '@v-uik/base'

export const UseResetCss = () => {
  useResetCss()

  return (
    <html>
      <body>
        <main>
          <Underlay kind="filled" status="info">
            <Text>Body without default browser styles</Text>
          </Underlay>
        </main>
      </body>
    </html>
  )
}
