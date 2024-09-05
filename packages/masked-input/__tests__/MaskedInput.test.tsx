import * as React from 'react'
import { MaskedInput } from '../src'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MaskedInputTest } from './MaskedInputTest'
const MASK = '+7 (111) 111-11-11'

const EditableComp = () => {
  const [value, setValue] = React.useState('')

  return (
    <MaskedInput
      mask="********-****-****-****-************"
      value={value}
      onChange={setValue}
    />
  )
}

const EditableNumberComp = () => {
  const [value, setValue] = React.useState('')

  return <MaskedInput mask="11-11" value={value} onChange={setValue} />
}

it('set input value correctly', () => {
  const { getByRole } = render(<MaskedInput mask={MASK} value="9218754539" />)
  expect(getByRole('textbox')).toHaveValue('+7 (921) 875-45-39')
})

describe('paste value with space', () => {
  it('in start', () => {
    const { getByRole } = render(<MaskedInput mask="*****" />)

    const input = getByRole('textbox')

    fireEvent.keyDown(input, {
      key: 'Control',
      code: 'ControlLeft',
      keyCode: 17,
    })
    fireEvent.paste(input, { clipboardData: { getData: () => '   222' } })
    fireEvent.keyUp(input, { key: 'Control', code: 'ControlLeft', keyCode: 17 })

    expect(input).toHaveValue('222__')
  })
  it('in end', () => {
    const { getByRole } = render(<MaskedInput mask="*****" />)

    const input = getByRole('textbox')

    fireEvent.keyDown(input, {
      key: 'Control',
      code: 'ControlLeft',
      keyCode: 17,
    })
    fireEvent.paste(input, { clipboardData: { getData: () => '222   ' } })
    fireEvent.keyUp(input, { key: 'Control', code: 'ControlLeft', keyCode: 17 })

    expect(input).toHaveValue('222__')
  })
  it('in start and end', () => {
    const { getByRole } = render(<MaskedInput mask="*****" />)

    const input = getByRole('textbox')

    fireEvent.keyDown(input, {
      key: 'Control',
      code: 'ControlLeft',
      keyCode: 17,
    })
    fireEvent.paste(input, { clipboardData: { getData: () => '   222   ' } })
    fireEvent.keyUp(input, { key: 'Control', code: 'ControlLeft', keyCode: 17 })

    expect(input).toHaveValue('222__')
  })
})

it('v is not insterted when ctrl+v', () => {
  const { getByRole } = render(<EditableComp />)
  const input = getByRole('textbox')
  input.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'v',
      ctrlKey: true,
      metaKey: true,
      bubbles: true,
    })
  )

  expect(input).toHaveValue('')
})

it('set label correctly', () => {
  const { getByText } = render(<MaskedInput mask={MASK} label="MaskedInput" />)

  expect(getByText('MaskedInput')).toBeInTheDocument()
})

it('set helper text correctly', () => {
  const { getByText } = render(
    <MaskedInput
      mask={MASK}
      label="MaskedInput"
      helperText="HelperMaskedInput"
    />
  )

  expect(getByText('HelperMaskedInput')).toBeInTheDocument()
})

it('set fullWidth correctly', () => {
  const { getByRole } = render(<MaskedInput fullWidth mask={MASK} />)

  expect(getByRole('textbox')).toHaveStyle('width: 100%')
})

it('set invalid mask char in start', () => {
  const { getByRole } = render(<EditableNumberComp />)
  const input = getByRole('textbox')

  userEvent.click(input)
  userEvent.keyboard('v')

  expect(input).toHaveValue('')
})

it('set invalid mask char after first symbol', () => {
  const { getByRole } = render(<EditableNumberComp />)
  const input = getByRole('textbox')

  userEvent.click(input)
  userEvent.keyboard('7v')

  expect(input).toHaveValue('7_-__')
})

it('handle clear value correctly', () => {
  const handleChange = jest.fn()
  const inputValue = '7'
  const { getByRole, rerender } = render(
    <MaskedInput canClear mask="**********" value="" onChange={handleChange} />
  )
  userEvent.click(getByRole('textbox'))
  userEvent.keyboard('7')

  expect(handleChange).toHaveBeenCalledTimes(1)
  expect(handleChange).toHaveBeenCalledWith(
    inputValue,
    expect.anything(),
    'input'
  )

  rerender(
    <MaskedInput
      canClear
      mask="**********"
      value={inputValue}
      onChange={handleChange}
    />
  )

  const clearButton = getByRole('button', { name: 'clearButton' })
  expect(clearButton).toBeInTheDocument()
  fireEvent.click(clearButton)

  expect(handleChange).toHaveBeenCalledTimes(2)
  expect(handleChange).toHaveBeenCalledWith('', expect.anything(), 'clear')
})

// UIK-482
it.each([true, false])(
  'value that matches mask characters renders correctly with valueWithoutMask=%s',
  (valueWithoutMask) => {
    const inputValue = '77'
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
        value={inputValue}
      />
    )

    expect(getByRole('textbox')).toHaveValue('+7 (77_) ___-__-__')
  }
)

// UIK-482
it.each([true, false])(
  'handle change value that matches mask characters renders correctly with valueWithoutMask=%s',
  async (valueWithoutMask) => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
        onChange={handleChange}
      />
    )
    const input = getByRole('textbox')

    userEvent.click(input)

    await userEvent.keyboard('77777777777', { delay: 5 })

    expect(input).toHaveValue('+7 (777) 777-77-77')

    expect(handleChange).lastCalledWith(
      valueWithoutMask ? '+7 (777) 777-77-77' : '7777777777',
      expect.anything(),
      'input'
    )

    await userEvent.keyboard('[Backspace]'.repeat(3), { delay: 5 })

    expect(input).toHaveValue('+7 (777) 777-7_-__')

    expect(handleChange).lastCalledWith(
      valueWithoutMask ? '+7 (777) 777-7_-__' : '7777777',
      expect.anything(),
      'input'
    )
  }
)

// UIK-482
it.each([true, false])(
  'remove chars with backspace on middle of value works correctly with valueWithoutMask=%s',
  async (valueWithoutMask) => {
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
      />
    )
    const input = getByRole('textbox') as HTMLInputElement

    userEvent.click(input)

    await userEvent.keyboard('1234567890', { delay: 5 })

    expect(input).toHaveValue('+7 (123) 456-78-90')

    input.setSelectionRange(7, 7)

    await userEvent.keyboard('[Backspace]', { delay: 5 })
    expect(input).toHaveValue('+7 (124) 567-89-0_')

    userEvent.clear(input)

    await userEvent.keyboard('1234567890', { delay: 5 })

    expect(input).toHaveValue('+7 (123) 456-78-90')

    input.setSelectionRange(14, 18)

    await userEvent.keyboard('[Backspace]', { delay: 5 })

    expect(input).toHaveValue('+7 (123) 456-7_-__')
  }
)

// UIK-482
it.each([true, false])(
  'remove chars with delete on middle of value works correctly with valueWithoutMask=%s',
  async (valueWithoutMask) => {
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
      />
    )
    const input = getByRole('textbox') as HTMLInputElement

    userEvent.click(input)

    await userEvent.keyboard('1234567890', { delay: 5 })

    expect(input).toHaveValue('+7 (123) 456-78-90')

    input.setSelectionRange(16, 16)

    await userEvent.keyboard('{del}', { delay: 5 })
    expect(input).toHaveValue('+7 (123) 456-78-0_')
  }
)

// UIK-482
it.each([true, false])(
  'set char in the middle of the field works correctly with valueWithoutMask=%s',
  async (valueWithoutMask) => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
        onChange={handleChange}
      />
    )
    const input = getByRole('textbox') as HTMLInputElement

    userEvent.click(input)

    await userEvent.keyboard('1', { delay: 5 })

    expect(input).toHaveValue('+7 (1__) ___-__-__')

    expect(handleChange).lastCalledWith(
      valueWithoutMask ? '+7 (1__) ___-__-__' : '1',
      expect.anything(),
      'input'
    )

    input.setSelectionRange(10, 10)

    await userEvent.keyboard('2', { delay: 5 })

    expect(input).toHaveValue('+7 (1__) _2_-__-__')

    expect(handleChange).lastCalledWith(
      valueWithoutMask ? '+7 (1__) _2_-__-__' : '1\u00A0\u00A0\u00A02',
      expect.anything(),
      'input'
    )
  }
)

// UIK-482
it.each([true, false])(
  'insert first symbols of mask works correctly with valueWithoutMask=%s',
  async (valueWithoutMask) => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <MaskedInputTest
        valueWithoutMask={valueWithoutMask}
        mask="+7 (111) 111-11-11"
        onChange={handleChange}
      />
    )
    const input = getByRole('textbox') as HTMLInputElement

    userEvent.click(input)

    await userEvent.keyboard('+7{space}(7', { delay: 5 })

    expect(input).toHaveValue('+7 (7__) ___-__-__')
  }
)

it('works with null value correctly', () => {
  const { getByRole } = render(
    <MaskedInputTest mask="+7 (111) 111-11-11" value={null} />
  )

  const input = getByRole('textbox') as HTMLInputElement

  expect(input).toHaveValue('')
})
