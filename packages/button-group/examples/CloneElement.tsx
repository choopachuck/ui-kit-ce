import React from 'react'
import { ButtonGroup, Button, ButtonProps, Tooltip } from '@v-uik/base'

const items = [
  {
    name: 'first',
    children: 'button 1',
  },
  {
    name: 'second',
    children: 'button 2',
  },
  {
    name: 'third',
    children: 'button 3',
  },
]

const ButtonWrapper: React.FC<
  ButtonProps & { children: React.ReactElement<ButtonProps> }
> = ({ children }) => {
  return (
    <Tooltip
      dropdownProps={{
        placement: 'top',
        content: (children.props as ButtonProps).children,
      }}
    >
      <div>{children}</div>
    </Tooltip>
  )
}

export const CloneElement = () => {
  const [value, setValue] = React.useState<string | string[]>('first')

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 150 }}>
      <ButtonGroup value={value} onChange={(_, value) => setValue(value)}>
        {items.map((item, index) => (
          <ButtonWrapper key={`${index}_${item.name}`}>
            <Button {...item} />
          </ButtonWrapper>
        ))}
      </ButtonGroup>
    </div>
  )
}
