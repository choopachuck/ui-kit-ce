import * as React from 'react'
import { ButtonGroup, Button } from '@v-uik/base'
import { Icon } from './assets/Icon'

export const Examples = (): React.ReactElement => {
  const [value, setValue] = React.useState<string | string[]>('debt')

  const onChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string | string[]
  ) => {
    setValue(value)
  }

  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg']

  return (
    <>
      {sizes.map((size) => (
        <React.Fragment key={size}>
          <ButtonGroup size={size} value={value} onChange={onChange}>
            <Button name="debt">Button 1</Button>
            <Button name="credit">
              <Icon
                style={{ marginRight: 8 }}
                width={size === 'sm' ? 16 : 24}
              />
              Button 2
            </Button>
            <Button name="cash">
              Button 3
              <Icon style={{ marginLeft: 8 }} width={size === 'sm' ? 16 : 24} />
            </Button>
          </ButtonGroup>
          <br />
          <br />
        </React.Fragment>
      ))}
      <br />
      {sizes.map((size, index) => (
        <React.Fragment key={size}>
          <ButtonGroup
            size={size}
            color="primary"
            value={value}
            onChange={onChange}
          >
            <Button name="debt">Button 1</Button>
            <Button name="credit">
              <Icon
                style={{ marginRight: 8 }}
                width={size === 'sm' ? 16 : 24}
              />
              Button 2
            </Button>
            <Button name="cash">
              Button 3
              <Icon style={{ marginLeft: 8 }} width={size === 'sm' ? 16 : 24} />
            </Button>
          </ButtonGroup>
          {index !== 2 && (
            <>
              <br />
              <br />
            </>
          )}
        </React.Fragment>
      ))}
    </>
  )
}
