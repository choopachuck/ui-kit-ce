import * as React from 'react'
import { ColumnProps } from '@v-uik/base'

export const ColumnPropsDummy = <DataSource extends unknown>(
  props: ColumnProps<DataSource>
): React.ReactNode => {
  return <div {...props} />
}
