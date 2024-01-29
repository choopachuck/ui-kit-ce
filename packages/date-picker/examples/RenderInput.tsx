import * as React from 'react'
import { RangePicker, Text } from '@v-uik/base'

type TRange = [Date | number | undefined, Date | number | undefined]

export const RenderInput = (): React.ReactElement => {
  const [range, setRange] = React.useState<TRange>()

  return (
    <RangePicker
      format="dd.MM.yyyy"
      mask="11.11.1111"
      renderInput={(startProps, endProps) => (
        <div>
          <Text as="span" style={{ marginRight: 8 }}>
            С
          </Text>
          <input
            {...startProps.inputProps}
            ref={startProps.inputRef}
            placeholder="дд.мм.гггг"
            value={startProps.value}
            onChange={(event) =>
              startProps.onChange?.(event.target.value, event)
            }
          />
          <Text as="span" style={{ margin: '0 8px' }}>
            по
          </Text>
          <input
            {...endProps.inputProps}
            ref={endProps.inputRef}
            placeholder="дд.мм.гггг"
            value={endProps.value}
            onChange={(event) => endProps.onChange?.(event.target.value, event)}
          />
        </div>
      )}
      value={range}
      onChange={setRange}
    />
  )
}
