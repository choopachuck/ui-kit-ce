import * as React from 'react'
import { TimePicker, TimePickerProps } from '@v-uik/date-picker'

import { Button } from '@v-uik/button'
import { createUseStyles } from '@v-uik/theme'
import { useButtonAriaActionProps } from '@v-uik/hooks'

const useStyles = createUseStyles({
  iconContainers: {
    display: 'flex',
    alignItems: 'center',
  },
  clearButton: {
    minWidth: 'unset',
  },
})

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.5 4.5H12V12.0043L16.2383 16.2426L15.1776 17.3033L11.3743 13.5H10.5V4.5Z"
      fill="#363636"
    />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0004 4.9979L11.0004 3.99805L7.99848 7.00089L4.99595 4.00067L3.99609 5.00067L6.99799 8.00168L4.00105 10.9995L4.99865 12.0051L7.99902 9.00242L10.9975 12.0001L12.0031 11.0025L8.99951 8.00115L12.0004 4.9979Z"
      fill="black"
      fillOpacity="0.9"
    />
  </svg>
)

const validationErrorMessages: TimePickerProps['validationErrorMessages'] = {
  invalidTime: 'Некорректное время',
  notAllowedTime: 'Время недоступно для выбора',
}

export const TimePickerClearStory: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(null)

  const classList = useStyles()
  const clear: React.ReactEventHandler<HTMLButtonElement> = React.useCallback(
    (e) => {
      e.stopPropagation()
      setDate(null)
    },
    []
  )

  const actionProps = useButtonAriaActionProps(clear)

  return (
    <div style={{ display: 'flex' }}>
      <TimePicker
        triggerOnChangeOnInvalid
        value={date}
        mask="11:11:11"
        label="Label"
        validationErrorMessages={validationErrorMessages}
        format="HH:mm:ss"
        labelProps={{
          id: 'label-3',
        }}
        baseTimePickerProps={{
          views: ['hours', 'minutes', 'seconds'],
        }}
        inputProps={{
          placeholder: 'hh:mm:ss',
          inputProps: { 'aria-labelledby': 'label-3' },
          suffix: (
            <div className={classList.iconContainers}>
              <Button
                kind="ghost"
                className={classList.clearButton}
                {...actionProps}
              >
                <CloseIcon />
              </Button>
              <ClockIcon />
            </div>
          ),
        }}
        onChange={setDate}
      />
    </div>
  )
}
