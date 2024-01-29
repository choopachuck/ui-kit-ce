import React from 'react'
import { Radio, LabelControl } from '@v-uik/base'

export type EnumControlItemProps = {
  label?: string
  value: string | number
}

export const EnumControlItem = ({
  value,
  label,
}: EnumControlItemProps): React.ReactElement => (
  <LabelControl label={label || value} value={value} control={<Radio />} />
)
