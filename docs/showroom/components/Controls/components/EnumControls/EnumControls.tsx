import React from 'react'
import { Select } from '@v-uik/base'
import type { EnumControlsProps } from '../types'

export const EnumControls = ({
  values,
  label,
  value,
  onChange,
}: EnumControlsProps): React.ReactElement => (
  <Select
    label={label}
    value={String(value)}
    options={values.map((x) => ({ label: x, value: String(x) }))}
    size="sm"
    onChange={onChange}
  />
)
