import * as React from 'react'
import { Input } from '@v-uik/base'

export const ErrorIndication = (): JSX.Element => {
  return (
    <>
      <div>
        <Input
          error
          inputProps={{
            id: 'fifth-case',
            'aria-invalid': 'true',
            'aria-describedby': 'fifth-case-error',
          }}
          showErrorIcon={false}
          label="Without icon"
          labelProps={{ htmlFor: 'fifth-case' }}
          helperText="The field cannot be empty"
          helperTextProps={{ id: 'fifth-case-error' }}
        />
      </div>
      <div>
        <Input
          error
          label="With icon"
          helperText="The field cannot be empty"
          inputProps={{
            id: 'sixth-case',
            'aria-invalid': 'true',
            'aria-describedby': 'sixth-case-error',
          }}
          labelProps={{ htmlFor: 'sixth-case' }}
          helperTextProps={{ id: 'sixth-case-error' }}
        />
      </div>
      <div>
        <Input
          error
          showErrorIcon
          errorIconTooltipProps={{
            dropdownProps: {
              placement: 'top',
              content: 'The field cannot be empty',
            },
          }}
          inputProps={{ id: 'seventh-case', 'aria-invalid': 'true' }}
          label="With icon tooltip"
          labelProps={{ htmlFor: 'seventh-case' }}
        />
      </div>
    </>
  )
}
