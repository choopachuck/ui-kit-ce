import * as React from 'react'
import { Tooltip } from '@v-uik/base'

export const Single = (): React.ReactElement => {
  return (
    <>
      <Tooltip
        single
        dropdownProps={{
          placement: 'right',
          content: 'A dog is a type of domesticated animal',
        }}
      >
        <span style={{ backgroundColor: 'lightgrey' }}>hover me</span>
      </Tooltip>
      <br />
      <br />
      <Tooltip
        single
        indicator
        dropdownProps={{
          placement: 'right',
          content: 'A dog is a type of domesticated animal',
        }}
      >
        <span style={{ backgroundColor: 'lightgrey' }}>
          hover me (with indicator)
        </span>
      </Tooltip>
    </>
  )
}
