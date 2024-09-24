import * as React from 'react'
import { Input } from '@v-uik/base'

export const InputWithTooltip = (): JSX.Element => {
  return (
    <Input
      label="Login"
      inputProps={{ id: 'third-case', title: 'Tooltip' }}
      style={{ paddingTop: 8 }}
      labelProps={{
        htmlFor: 'third-case',
        tooltipText: 'Tooltip',
        tooltipProps: {
          single: true,
          dropdownProps: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-5, 8],
                },
              },
            ],
          },
        },
      }}
      onFocus={console.log}
    />
  )
}
