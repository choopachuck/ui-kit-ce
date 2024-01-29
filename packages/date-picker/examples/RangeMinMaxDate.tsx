import * as React from 'react'
import { RangePicker } from '@v-uik/base'
import { addDays } from 'date-fns'

export const RangeMinMaxDateStory = (): React.ReactElement => {
  const [range, setRange] = React.useState<
    [Date | null | number, Date | null | number]
  >([null, null])

  return (
    <RangePicker
      label="Выберите дату"
      value={range}
      mask="11.11.1111"
      placeholder="дд.мм.гггг"
      minDate={new Date()}
      maxDate={addDays(new Date(), 7)}
      onChange={setRange}
    />
  )
}
