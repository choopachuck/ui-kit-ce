import * as React from 'react'
import { Badge, Button, InputNumber } from '@v-uik/base'

export const BadgeToggle = (): JSX.Element => {
  const [value, setValue] = React.useState<number | null>(5)

  const onChangeInput = (value: number | null) => {
    setValue(value)
  }

  return (
    <>
      <Badge content={value}>
        <div
          style={{
            height: '40px',
            width: '40px',
            backgroundColor: 'bisque',
          }}
        />
      </Badge>

      <InputNumber
        fullWidth
        style={{
          width: 65,
          marginRight: '15px',
          marginLeft: '15px',
        }}
        precision={0}
        value={value}
        onChange={onChangeInput}
      />

      <Button
        kind="outlined"
        size="sm"
        style={{
          paddingLeft: 11,
          paddingRight: 11,
          minWidth: 32,
        }}
        onClick={() => setValue((value ?? 0) - 1)}
      >
        -
      </Button>
      <Button
        kind="outlined"
        size="sm"
        style={{
          marginLeft: 8,
          paddingLeft: 11,
          paddingRight: 11,
          minWidth: 32,
        }}
        onClick={() => setValue((value ?? 0) + 1)}
      >
        +
      </Button>
    </>
  )
}
