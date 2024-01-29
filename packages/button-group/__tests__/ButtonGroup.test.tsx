import * as React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { ButtonGroup, ButtonGroupProps } from '../src'
import { Button } from '../../button/src'

const Component = ({ children, ...rest }: ButtonGroupProps) => (
  <ButtonGroup {...rest}>
    {children || [
      <Button key="1" name="first">
        1
      </Button>,
      <Button key="2" name="second">
        2
      </Button>,
      <Button key="3" name="third">
        3
      </Button>,
    ]}
  </ButtonGroup>
)

it('prevents multi click same button for radio type', () => {
  const onChange = jest.fn()
  const { getAllByRole, rerender } = render(<Component onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getAllByRole('button')[0])
  expect(onChange).toHaveBeenCalledTimes(1)
  rerender(<Component value="first" onChange={onChange} />)
  fireEvent.click(getAllByRole('button')[0])
  expect(onChange).toHaveBeenCalledTimes(1)
})

it("doesn't rewrite onClick handlers", () => {
  const onChange = jest.fn()
  const onClick = jest.fn()
  const { getAllByRole } = render(
    <Component onChange={onChange}>
      <Button name="first" onClick={onClick}>
        1
      </Button>
      <Button name="second">2</Button>
    </Component>
  )
  expect(onClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getAllByRole('button')[0])
  expect(onClick).toHaveBeenCalledTimes(1)
})

it('handle change radio type', () => {
  const onChange = jest.fn()
  const { getAllByRole, rerender } = render(<Component onChange={onChange} />)
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getAllByRole('button')[0])
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), 'first')
  rerender(<Component value="first" onChange={onChange} />)
  fireEvent.click(getAllByRole('button')[1])
  expect(onChange).toHaveBeenCalledTimes(2)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), 'second')
  rerender(<Component value="second" onChange={onChange} />)
  fireEvent.click(getAllByRole('button')[2])
  expect(onChange).toHaveBeenCalledTimes(3)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), 'third')
})

it('handle change multi type', () => {
  const onChange = jest.fn()
  const { getAllByRole, rerender } = render(
    <Component kind="multi" onChange={onChange} />
  )
  expect(onChange).toHaveBeenCalledTimes(0)
  fireEvent.click(getAllByRole('button')[0])
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['first'])
  rerender(<Component kind="multi" value={['first']} onChange={onChange} />)
  fireEvent.click(getAllByRole('button')[1])
  expect(onChange).toHaveBeenCalledTimes(2)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['first', 'second'])
  rerender(
    <Component kind="multi" value={['first', 'second']} onChange={onChange} />
  )
  fireEvent.click(getAllByRole('button')[0])
  expect(onChange).toHaveBeenCalledTimes(3)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), ['second'])
  rerender(<Component kind="multi" value={['second']} onChange={onChange} />)
  fireEvent.click(getAllByRole('button')[1])
  expect(onChange).toHaveBeenCalledTimes(4)
  expect(onChange).toHaveBeenCalledWith(expect.anything(), [])
})

it('rendering elements with button only', () => {
  const { getByTestId } = render(
    <Component data-testid="group">
      <span>first</span>
      <Button name="second">second</Button>
      <Button name="third">third</Button>
      <span>fourth</span>
    </Component>
  )
  expect(getByTestId('group').children.length).toBe(2)
})
