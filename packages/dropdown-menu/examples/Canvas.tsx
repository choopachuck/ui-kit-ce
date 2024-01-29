import * as React from 'react'
import { DropdownMenu, DropdownMenuItem } from '@v-uik/base'

export default () => {
  const content = (
    <>
      <DropdownMenuItem>Option 1</DropdownMenuItem>
      <DropdownMenuItem>Option 2</DropdownMenuItem>
      <DropdownMenuItem disabled>Option 3</DropdownMenuItem>
      <DropdownMenuItem
        dropdownProps={{
          content: (
            <>
              <DropdownMenuItem>Option 1</DropdownMenuItem>
              <DropdownMenuItem>Option 2</DropdownMenuItem>
              <DropdownMenuItem>Option 3</DropdownMenuItem>
            </>
          ),
        }}
      >
        Option 4
      </DropdownMenuItem>
    </>
  )

  return (
    <DropdownMenu content={content} placement="bottom-end">
      <div
        style={{
          maxWidth: 400,
          backgroundColor: 'lightgrey',
          height: 32,
          width: 60,
          borderRadius: 4,
        }}
      />
    </DropdownMenu>
  )
}
