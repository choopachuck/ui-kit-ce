import * as React from 'react'
import { InputBase, Labelled } from '@v-uik/base'

export type PlaygroundProps = {
  required: boolean
  label: string
  description: string
  helperText: string
  error: boolean
  keepHelperTextMinHeight: boolean
  disabled: boolean
}

export const Playground = ({
  description,
  error,
  label,
  required,
  helperText,
  keepHelperTextMinHeight,
  disabled,
}: PlaygroundProps): React.ReactElement => {
  const [value, setValue] = React.useState('')

  return (
    <div>
      <Labelled
        required={required}
        error={error}
        disabled={disabled}
        keepHelperTextMinHeight={keepHelperTextMinHeight}
        label={label}
        description={description}
        helperText={helperText}
      >
        <InputBase
          error={error}
          disabled={disabled}
          value={value}
          onChange={setValue}
        />
      </Labelled>
    </div>
  )
}
