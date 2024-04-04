import React from 'react'
import { RadioGroup, Radio, LabelControl } from '@v-uik/base'
import type { EnumControlsProps } from '../types'

export const EnumRadio = ({
  values,
  label,
  value,
  onChange,
}: EnumControlsProps): React.ReactElement => (
  <RadioGroup
    label={label}
    value={String(value)}
    direction="vertical"
    onChange={onChange}
  >
    {values.map((value) => (
      <LabelControl
        key={value}
        label={value}
        value={value}
        control={<Radio />}
      />
    ))}
  </RadioGroup>
)
