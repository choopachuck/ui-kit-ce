import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'
import { Text } from '@v-uik/typography'

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
  isAfterEndTime: 'Время начала позже времени конца',
  isBeforeStartTime: 'Время конца раньше времени начала',
}

export const RangedCustomInput = (): React.ReactElement => {
  const [range, setRange] = React.useState<
    [Date | number | null, Date | number | null]
  >([null, null])

  return (
    <TimePicker.RangePicker
      mask="11:11"
      format="HH:mm"
      validationErrorMessages={validationErrorMessages}
      renderInput={(startProps, endProps) => (
        <div>
          <Text as="span" style={{ marginRight: 8 }}>
            с
          </Text>
          <input
            {...startProps.inputProps}
            ref={startProps.inputRef}
            placeholder="чч:мм"
            value={startProps.value ?? undefined}
            onChange={(event) =>
              startProps.onChange?.(event.target.value, event, 'input')
            }
          />
          <Text as="span" style={{ margin: '0 8px' }}>
            по
          </Text>
          <input
            {...endProps.inputProps}
            ref={endProps.inputRef}
            placeholder="чч:мм"
            value={endProps.value ?? undefined}
            onChange={(event) =>
              endProps.onChange?.(event.target.value, event, 'input')
            }
          />
        </div>
      )}
      value={range}
      onChange={setRange}
    />
  )
}
