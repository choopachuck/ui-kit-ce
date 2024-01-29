import * as React from 'react'
import { TimePicker } from '@v-uik/date-picker'

import { Button } from '@v-uik/button'

export const TimePickerButtonStory = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        value={date}
        renderInput={({ value }) => (
          <Button>{value ? value : 'Выбрать дату'}</Button>
        )}
        onChange={setDate}
      />
    </div>
  )
}
