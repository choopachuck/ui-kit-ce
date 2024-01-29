import * as React from 'react'
import { Tag } from '../src'
import { fireEvent, render } from '@testing-library/react'
import { light } from '@v-uik/theme'

const Component = () => {
  const [selected, setSelected] = React.useState(false)

  return (
    <Tag
      onDelete={() => (selected ? setSelected(false) : undefined)}
      onClick={() => (selected ? undefined : setSelected(true))}
    >
      {selected ? 'Удали меня' : 'Нажми меня'}
    </Tag>
  )
}

it('set text correctly', () => {
  const { getByText } = render(<Tag size="md">Tag</Tag>)

  const tag = getByText('Tag')

  expect(tag).toBeInTheDocument()
})

it('set md size correctly', () => {
  const { getByRole } = render(<Tag size="md">Tag</Tag>)

  const tag = getByRole('button')

  expect(getComputedStyle(tag)['padding']).toBe('6px 12px')
})

it('set sm size correctly', () => {
  const { getByRole } = render(<Tag size="sm">Tag</Tag>)

  const tag = getByRole('button')

  expect(getComputedStyle(tag)['padding']).toBe('2px 8px')
})

it.each(['red', 'yellow', 'green', 'azure', 'blue', 'violet', 'gray'] as const)(
  'set tag color correctly',
  (color) => {
    const { getByRole } = render(
      <Tag kind="color" color={color}>
        Tag
      </Tag>
    )

    const tag = getByRole('button')
    const tokenName = `colorBackground${color[0].toUpperCase()}${color.slice(
      1
    )}`
    // @ts-ignore
    const tokenColor = light.comp.tag[tokenName] as string

    expect(getComputedStyle(tag)['backgroundColor']).toMatch(tokenColor)
  }
)

it('set kind with selected prop correctly', () => {
  const { getByRole } = render(
    <>
      <Tag selected kind="lite">
        Lite
      </Tag>
      <Tag selected kind="secondary">
        Secondary
      </Tag>
      <Tag selected kind="primary">
        Primary
      </Tag>
    </>
  )

  const lite = getByRole('button', { name: 'Lite' })
  const secondary = getByRole('button', { name: 'Secondary' })
  const primary = getByRole('button', { name: 'Primary' })

  expect(lite).toHaveStyle({
    backgroundColor: light.comp.tag.colorBackgroundLiteSelected,
  })
  expect(secondary).toHaveStyle({
    backgroundColor: light.comp.tag.colorBackgroundSecondarySelected,
  })
  expect(primary).toHaveStyle({
    backgroundColor: light.comp.tag.colorBackgroundPrimarySelected,
  })
})

it('call onClick and onDelete props', async () => {
  const { getByRole, getByText, findByText, getAllByRole } = render(
    <Component />
  )

  expect(getByText('Нажми меня')).toBeInTheDocument()
  const tag = getByRole('button', { name: 'Нажми меня' })
  fireEvent.click(tag)
  expect(await findByText('Удали меня')).toBeInTheDocument()
  const deleteButton = getAllByRole('button')[1]
  fireEvent.click(deleteButton)
  expect(await findByText('Нажми меня')).toBeInTheDocument()
})
