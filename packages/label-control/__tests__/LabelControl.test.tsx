import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { LabelControl, LabelControlProps } from '../src'
import { Checkbox } from '@v-uik/checkbox'

const Component = (props: Partial<LabelControlProps>) => (
  <LabelControl label={props.label} control={<Checkbox />} {...props} />
)

it('should render label', () => {
  const label = 'some text'

  const { queryByText } = render(<Component label={label} />)

  expect(queryByText(label)).toBeInTheDocument()
})

it('should be pass click on label', async () => {
  const { getByTestId, getByRole } = render(
    <Component data-testid="label" label="Click me" />
  )

  const checkbox = getByRole('checkbox')
  const label = getByTestId('label')

  expect(checkbox).not.toBeChecked()
  fireEvent.click(label)
  await waitFor(() => expect(checkbox).toBeChecked())
})

it('should be passed checked props', () => {
  const { getByRole } = render(
    <Component
      checked
      data-testid="label"
      label="Click me"
      onChange={() => null}
    />
  )

  const checkbox = getByRole('checkbox')

  expect(checkbox).toBeChecked()
})
