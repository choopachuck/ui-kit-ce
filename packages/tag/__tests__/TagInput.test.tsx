import * as React from 'react'
import { TagInput, TagInputProps, Tag } from '../src'
import { fireEvent, render } from '@testing-library/react'
import { light } from '@v-uik/theme'

const Component = (props: Partial<TagInputProps>) => {
  const { value: valueProp, ...rest } = props

  const [value, setValue] = React.useState(valueProp)
  const [tags, setTags] = React.useState<string[]>([])

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleTagSubmit = (value: string) => {
    setTags([...tags, value])
    setValue('')
  }

  return (
    <>
      <TagInput
        value={value}
        placeholder="Tag"
        onChange={handleTagChange}
        onSubmit={handleTagSubmit}
        {...rest}
      >
        Добавить тег
      </TagInput>
      {tags.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </>
  )
}

it('set placeholder', async () => {
  const placeholder = 'Введите значение'
  const { findByRole, getByRole, findByPlaceholderText } = render(
    <TagInput value="" placeholder={placeholder} onChange={jest.fn()} />
  )

  const tagButton = getByRole('button')
  fireEvent.focus(tagButton)
  const tagInput = await findByRole('textbox')
  expect(tagInput).toBeInTheDocument()
  expect(await findByPlaceholderText(placeholder)).toBeInTheDocument()
})

it('set sm size correctly', () => {
  const { getByTestId } = render(
    <TagInput data-testid="tagInput" value="" size="sm" />
  )

  const tagInput = getByTestId('tagInput')

  expect(tagInput.className).toMatch('small')
})

it('handle value change correctly', async () => {
  const { getByRole, findByRole, findByDisplayValue } = render(
    <Component value="default" />
  )

  const tagButton = getByRole('button')
  fireEvent.focus(tagButton)
  const tagInput = await findByRole('textbox')
  expect(await findByDisplayValue('default'))
  fireEvent.change(tagInput, { target: { value: '123' } })
  expect(await findByDisplayValue('123'))
})

it('handle submit correctly', async () => {
  const {
    getByRole,
    findByRole,
    findByText,
    findByDisplayValue,
    findByLabelText,
  } = render(<Component value="default" />)

  const tagButton = getByRole('button')
  fireEvent.focus(tagButton)
  const tagInput = await findByRole('textbox')
  expect(await findByDisplayValue('default'))
  fireEvent.change(tagInput, { target: { value: 'Tag 1' } })
  const submitButton = await findByLabelText('submit')
  fireEvent.mouseDown(submitButton)
  expect(await findByText('Tag 1'))
})

it('color icon when input empty', async () => {
  const { getByRole, findByRole } = render(<Component value={0} />)

  const tagButton = getByRole('button')
  fireEvent.focus(tagButton)
  const tagInput = await findByRole('textbox')
  const icon = document.querySelector('svg')
  expect(icon).toHaveStyle({
    color: light.comp.tagInput.iconColorText,
  })
  fireEvent.change(tagInput, { target: { value: '' } })
  expect(icon).toHaveStyle({
    color: light.comp.tagInput.iconColorTextFocusEmpty,
  })
  fireEvent.change(tagInput, { target: { value: 'test' } })
  expect(icon).toHaveStyle({
    color: light.comp.tagInput.iconColorText,
  })
  fireEvent.change(tagInput, { target: { value: '   ' } })
  expect(icon).toHaveStyle({
    color: light.comp.tagInput.iconColorTextFocusEmpty,
  })
})
