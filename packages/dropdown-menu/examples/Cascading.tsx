import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Radio,
  RadioGroup,
  LabelControl,
  ElementSizeType,
} from '@v-uik/base'
import { Icon } from './assets/Icon'

export const Cascading = (): JSX.Element => {
  const [size, setSize] = React.useState<ElementSizeType>('md')

  const content = (
    <>
      <DropdownMenuItem prefix={<Icon />}>Option 1</DropdownMenuItem>
      <DropdownMenuItem critical prefix={<Icon />}>
        Option 2
      </DropdownMenuItem>
      <DropdownMenuItem disabled prefix={<Icon />}>
        Option 3
      </DropdownMenuItem>
      <DropdownMenuItem
        style={{ paddingLeft: size === 'sm' ? 40 : 48 }}
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
    <>
      <RadioGroup
        label="Size"
        value={size}
        onChange={(value) => {
          setSize(value)
        }}
      >
        <LabelControl control={<Radio />} label="sm" value="sm" />
        <LabelControl control={<Radio />} label="md" value="md" />
        <LabelControl control={<Radio />} label="lg" value="lg" />
      </RadioGroup>
      <br />
      <br />
      <DropdownMenu
        action="click"
        placement="bottom-start"
        size={size}
        content={content}
      >
        <Button>Click me</Button>
      </DropdownMenu>
    </>
  )
}
