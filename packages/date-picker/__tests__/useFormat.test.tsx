import * as React from 'react'
import { render } from '@testing-library/react'
import {
  adapterKeys,
  DictionaryAdapter,
  withDateLibAdapter,
} from './withDateLibAdapter'
import { useFormat } from '../src/hooks'

const SimpleUseFormatter = ({
  date,
  format,
  placeholder,
}: {
  date?: Date
  format?: string
  placeholder?: string
}) => {
  const formattedDate = useFormat(date, format, placeholder)

  return <div>{formattedDate}</div>
}

const Component = withDateLibAdapter(
  ({
    ...props
  }: {
    date?: Date
    format?: string
    placeholder?: string
    adapterKey: DictionaryAdapter
  }) => {
    return <SimpleUseFormatter {...props} />
  }
)

const DEFAULT_FORMAT_EXPECT = {
  dateFns: '01.01.2021',
  dayjs: '01/01/2021',
  luxon: '01.01.2021',
  moment: '01.01.2021',
}

it.each(adapterKeys)(
  '[Adapter: %s] render date with default format',
  (adapterKey) => {
    const date = new Date('2021-01-01T00:00:00.000Z')
    const { getByText } = render(
      <Component date={date} adapterKey={adapterKey} />
    )

    expect(getByText(DEFAULT_FORMAT_EXPECT[adapterKey])).toBeInTheDocument()
  }
)

const CUSTOM_FORMAT = {
  dateFns: 'yyyy - MM - dd',
  dayjs: 'YYYY - MM - DD',
  luxon: 'yyyy - MM - dd',
  moment: 'YYYY - MM - DD',
}

it.each(adapterKeys)(
  '[Adapter: %s] render date with custom format',
  (adapterKey) => {
    const date = new Date('2021-01-01T00:00:00.000Z')
    const formattedDate = '2021 - 01 - 01'
    const { getByText } = render(
      <Component
        date={date}
        format={CUSTOM_FORMAT[adapterKey]}
        adapterKey={adapterKey}
      />
    )

    expect(getByText(formattedDate)).toBeInTheDocument()
  }
)

it.each(adapterKeys)(
  '[Adapter: %s] render placeholder if date empty',
  (adapterKey) => {
    const placeholder = 'date not set'
    const { getByText } = render(
      <Component placeholder={placeholder} adapterKey={adapterKey} />
    )

    expect(getByText(placeholder)).toBeInTheDocument()
  }
)
