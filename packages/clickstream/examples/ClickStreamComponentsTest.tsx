import * as React from 'react'
import { ClickStreamProvider, ClickStreamProviderProps } from '../src'
import {
  Input,
  InputPassword,
  MaskedInput,
  Switch,
  Select,
  ComboBox,
  DateTimePicker,
  TimePicker,
  TimeRangePicker,
  Autocomplete,
  Radio,
  Checkbox,
  DateTimePickerProps,
  useDateLibAdapter,
  TimePickerProps,
  DisableTimeViewType,
  TimeRangePickerProps,
  InputNumber,
  Creatable,
} from '@v-uik/base'
import { withDateLibAdapter } from './withDateLibAdapter'
import { functionProxy } from './helpers'

const FORMAT = {
  dateFns: 'dd.MM.yyyy HH:mm',
  dayjs: 'DD.MM.YYYY HH:mm',
  luxon: 'dd.MM.yyyy hh:mm',
  moment: 'DD.MM.YYYY HH:mm',
}

const DateTimePickerComponent = withDateLibAdapter(
  (
    props: Omit<
      Partial<DateTimePickerProps<unknown>>,
      | 'next_shouldDisableDate'
      | 'next_shouldDisableMonth'
      | 'next_shouldDisableYear'
      | 'minDate'
      | 'maxDate'
    > & {
      minDate?: Date
      maxDate?: Date
      next_shouldDisableDate?: (v: Date) => boolean
      next_shouldDisableMonth?: (v: Date) => boolean
      next_shouldDisableYear?: (v: Date) => boolean
    }
  ) => {
    const {
      onChange,
      value,
      next_shouldDisableDate,
      next_shouldDisableMonth,
      next_shouldDisableYear,
      minDate,
      maxDate,
      ...rest
    } = props
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      value ? adapter.date(value) : null
    )

    return (
      <DateTimePicker
        {...rest}
        minDate={minDate ? adapter.date(minDate) : undefined}
        maxDate={maxDate ? adapter.date(maxDate) : undefined}
        next_shouldDisableDate={functionProxy(adapter, next_shouldDisableDate)}
        next_shouldDisableMonth={functionProxy(
          adapter,
          next_shouldDisableMonth
        )}
        next_shouldDisableYear={functionProxy(adapter, next_shouldDisableYear)}
        value={date}
        onChange={(date: unknown | null) => {
          onChange?.(date)
          setDate(date)
        }}
      />
    )
  }
)

const TimePickerComponent = withDateLibAdapter(
  (
    props: Partial<TimePickerProps<unknown>> & {
      shouldDisableTime?: (date: Date, view: DisableTimeViewType) => boolean
    }
  ) => {
    const { onChange, value, shouldDisableTime, ...rest } = props
    const adapter = useDateLibAdapter()
    const [date, setDate] = React.useState<unknown | null>(
      value ? adapter.date(value) : null
    )

    return (
      <TimePicker
        {...rest}
        value={date}
        mask="11:11:11"
        format="HH:mm:ss"
        baseTimePickerProps={{
          ...rest.baseTimePickerProps,
          views: ['hours', 'minutes', 'seconds'],
          shouldDisableTime: !shouldDisableTime
            ? undefined
            : (nonJsDate, view) =>
                shouldDisableTime(adapter.toJsDate(nonJsDate), view),
        }}
        onChange={(date: unknown | null) => {
          onChange?.(date)
          setDate(date)
        }}
      />
    )
  }
)

const TimeRangePickerComponent = withDateLibAdapter(
  (props: Partial<TimeRangePickerProps<unknown>>) => {
    const { onChange, value, ...rest } = props
    const adapter = useDateLibAdapter()
    const [range, setRange] = React.useState<
      [unknown | number | null, unknown | number | null]
    >(value ? [adapter.date(value[0]), adapter.date(value[1])] : [null, null])

    return (
      <TimeRangePicker
        {...rest}
        value={range}
        mask="11:11:11"
        format="HH:mm:ss"
        startInputProps={{ ...rest?.startInputProps, placeholder: 'hh:mm:ss' }}
        endInputProps={{ ...rest?.endInputProps, placeholder: 'hh:mm:ss' }}
        startTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        endTimePickerProps={{ views: ['hours', 'minutes', 'seconds'] }}
        onChange={(range) => {
          onChange?.([
            range[0] ? adapter.toJsDate(range[0]) : null,
            range[1] ? adapter.toJsDate(range[1]) : null,
          ])
          setRange(range)
        }}
      />
    )
  }
)

type Option = {
  value: string
  label: string
}

export const ClickStreamComponentsTest: React.FC<ClickStreamProviderProps> = (
  props
) => {
  const [v1, setV1] = React.useState('default value')
  const [v2, setV2] = React.useState('')
  const [v3, setV3] = React.useState<Option[] | undefined>()
  const [v4, setV4] = React.useState('')

  return (
    <ClickStreamProvider {...props}>
      <Input inputProps={{ title: 'input-text' }} />
      <Input
        canClear
        clearButtonInnerProps={{ title: 'input-text-clear-button' }}
        value={v1}
        onChange={setV1}
      />
      <InputNumber inputProps={{ title: 'input-number' }} />
      <InputPassword inputProps={{ title: 'input-password' }} />
      <MaskedInput
        value={v2}
        inputProps={{
          title: 'masked-input',
        }}
        mask="+7 (111) 111-11-11"
        onChange={setV2}
      />
      <Switch inputProps={{ title: 'switch' }} />
      <Select
        selectButtonProps={{ title: 'select' }}
        options={[
          { value: '', label: 'Выберите значение' },
          { value: '1', label: 'Первое' },
        ]}
      />
      <ComboBox
        controlInnerProps={{ title: 'combobox' }}
        options={[
          { value: '', label: 'Выберите значение' },
          { value: '1', label: 'Первое' },
        ]}
      />
      <ComboBox
        multiple
        disableCloseOnSelect
        isSearchable
        withTags
        value={v3}
        controlInnerProps={{ title: 'combobox-multiple' }}
        inputValue={v4}
        inputInnerProps={{
          title: 'combobox-multiple-search-input',
        }}
        options={
          [
            { value: '', label: 'Выберите значение' },
            { value: '1', label: 'Первое' },
            { value: '2', label: 'Второе' },
            { value: '3', label: 'Третье' },
          ] as Option[]
        }
        onChange={(_v, _e, fullValue) => setV3(fullValue)}
        onInputChange={(value, event) => {
          if (event !== 'select-clear') {
            setV4(value)
          }
        }}
      />
      <Creatable
        inputInnerProps={{ title: 'combobox-creatable-input' }}
        controlInnerProps={{ title: 'combobox-creatable' }}
        options={[
          { value: '', label: 'Выберите значение' },
          { value: '1', label: 'Первое' },
        ]}
        inputValue={v4}
        onInputChange={(value, event) => {
          if (event !== 'select-clear') {
            setV4(value)
          }
        }}
      />
      <DateTimePickerComponent
        inputProps={{ inputProps: { title: 'date-time-picker' } }}
        format={FORMAT.dateFns}
      />
      <TimePickerComponent
        inputProps={{ inputProps: { title: 'time-picker' } }}
        format={FORMAT.dateFns}
      />
      <TimeRangePickerComponent
        startInputProps={{ inputProps: { title: 'time-range-picker-start' } }}
        endInputProps={{ inputProps: { title: 'time-range-picker-end' } }}
        format={FORMAT.dateFns}
      />
      <Autocomplete
        openOnFocus
        inputInnerProps={{ title: 'autocomplete-search-input' }}
        controlInnerProps={{ title: 'autocomplete' }}
        options={[
          { value: '', label: 'Пустое' },
          { value: '2', label: 'Второе' },
          { value: '3', label: 'Третье' },
          { value: '4', label: 'Четвертое' },
          { value: '5', label: 'Пятое' },
        ]}
      />
      <Radio inputProps={{ title: 'radio' }} />
      <Checkbox inputProps={{ title: 'checkbox' }} />
    </ClickStreamProvider>
  )
}
