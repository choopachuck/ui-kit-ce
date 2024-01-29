import * as React from 'react'
import { Switch, LabelControl } from '@v-uik/base'

export const SwitchesWithText = (): React.ReactElement => {
  const [value, setValue] = React.useState({
    first: false,
    second: false,
    third: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <LabelControl
          name="first"
          checked={value.first}
          control={<Switch />}
          label="MD"
          onChange={handleChange}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <LabelControl
          name="third"
          checked={value.third}
          size="sm"
          control={<Switch />}
          label="SM"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
