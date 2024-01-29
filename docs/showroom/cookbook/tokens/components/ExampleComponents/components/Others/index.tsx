import React from 'react'
import { ButtonGroup, Button, Switch } from '@v-uik/base'

export const Others: React.FC = () => {
  const [buttonGroupValue, setButtonGroupValue] = React.useState<
    string | string[]
  >()
  const onButtonGroup = (
    _event: React.MouseEvent<HTMLButtonElement>,
    value: string | string[]
  ) => {
    setButtonGroupValue(value)
  }

  const [switchValue, setSwitchValue] = React.useState(false)
  const onSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValue(event.target.checked)
  }

  return (
    <div
      style={{
        marginTop: '10px',
        display: 'flex',
      }}
    >
      <ButtonGroup
        value={buttonGroupValue}
        color="primary"
        onChange={onButtonGroup}
      >
        <Button name="1">Value 1</Button>
        <Button name="2">Value 2</Button>
        <Button name="3">Value 3</Button>
      </ButtonGroup>
      <Switch
        style={{ marginLeft: 20 }}
        checked={switchValue}
        onChange={onSwitch}
      />
      <Switch
        size="sm"
        style={{ marginLeft: 20 }}
        checked={switchValue}
        onChange={onSwitch}
      />
    </div>
  )
}
