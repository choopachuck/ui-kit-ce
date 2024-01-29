import * as React from 'react'
import { Tooltip } from '@v-uik/base'

export const Multi = (): React.ReactElement => {
  return (
    <>
      <Tooltip
        dropdownProps={{
          placement: 'right',
          content: (
            <div>
              What is a <b>dog</b>? <br />A dog is a type of domesticated
              animal.
            </div>
          ),
        }}
      >
        <span style={{ backgroundColor: 'lightgrey' }}>hover me</span>
      </Tooltip>
      <br />
      <br />
      <Tooltip
        indicator
        dropdownProps={{
          placement: 'right',
          content: (
            <div>
              What is a <b>dog</b>? <br />A dog is a type of domesticated
              animal.
            </div>
          ),
        }}
      >
        <span style={{ backgroundColor: 'lightgrey' }}>
          hover me (with indicator)
        </span>
      </Tooltip>
    </>
  )
}
