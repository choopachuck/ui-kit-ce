import * as React from 'react'
import { DropdownMenu, DropdownMenuItem, Button } from '@v-uik/base'

export const Adaptivity = (): JSX.Element => {
  const content = (
    <>
      <DropdownMenuItem>Option 1</DropdownMenuItem>
      <DropdownMenuItem>Option 2</DropdownMenuItem>
      <DropdownMenuItem>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, similique.
      </DropdownMenuItem>
      <DropdownMenuItem
        dropdownProps={{
          content: (
            <div>
              <DropdownMenuItem>Option 5</DropdownMenuItem>
              <DropdownMenuItem>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Cumque, ipsum!
              </DropdownMenuItem>
              <DropdownMenuItem>Option 7</DropdownMenuItem>
            </div>
          ),
        }}
      >
        Option 4
      </DropdownMenuItem>
    </>
  )

  return (
    <div>
      <DropdownMenu action="click" placement="bottom-start" content={content}>
        <Button>Нажми меня</Button>
      </DropdownMenu>
    </div>
  )
}
