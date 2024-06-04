import * as React from 'react'
import { RangePicker } from '@v-uik/base'

export const BasicRangePicker = (): React.ReactElement => {
  const [date, setDate] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])

  return <RangePicker value={date} mask="11.11.1111" onChange={setDate} />
}
