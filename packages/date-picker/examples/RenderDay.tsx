import * as React from 'react'
import {
  DatePicker,
  Button,
  ButtonKinds,
  clsx,
  createUseStyles,
} from '@v-uik/base'
import { externalAriaProps } from './common'

const useStyles = createUseStyles((theme) => ({
  root: {
    minWidth: 40,
    width: 40,
    height: 40,
    padding: 0,
  },

  selected: {
    backgroundColor: theme.ref.palette.green95,
  },

  today: {
    backgroundColor: theme.ref.palette.electricBlue95,
  },
}))

export const RenderDay = (): JSX.Element => {
  const classesMap = useStyles()

  const [date, setDate] = React.useState<Date | null>(null)

  return (
    <DatePicker
      format="dd.MM.yyyy"
      mask="11.11.1111"
      calendarViewExternalProps={externalAriaProps}
      renderDay={({ value, selected, isToday, onClick, onFocus }) => (
        <Button
          key={value}
          className={clsx(classesMap.root, {
            [classesMap.today]: isToday,
            [classesMap.selected]: selected,
          })}
          kind={ButtonKinds.ghost}
          color="secondary"
          onClick={onClick}
          onFocus={onFocus}
        >
          {value}
        </Button>
      )}
      value={date}
      onChange={setDate}
    />
  )
}
