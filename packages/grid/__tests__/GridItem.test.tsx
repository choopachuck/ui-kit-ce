import * as React from 'react'
import { render } from '@testing-library/react'
import { GridItem } from '../src'

// it('calculate width correctly', () => {
//   const { getByText, rerender } = render(
//     <GridItem screen="sm" xs={16} sm={12} md={8} lg={4}>
//       text
//     </GridItem>
//   )
//   expect(getByText('text')).toHaveStyle('width: 75%')
//   rerender(
//     <GridItem screen="md" xs={16} sm={12} md={8} lg={4}>
//       text
//     </GridItem>
//   )
//   expect(getByText('text')).toHaveStyle('width: 50%')
//   rerender(
//     <GridItem screen="lg" xs={16} sm={12} md={8} lg={4}>
//       text
//     </GridItem>
//   )
//   expect(getByText('text')).toHaveStyle('width: 25%')
// })
//
// it('takes previous value if current not declared', () => {
//   const { getByText } = render(
//     <GridItem screen="xl" md={8}>
//       text
//     </GridItem>
//   )
//   expect(getByText('text')).toHaveStyle('width: 50%')
// })
//
// it('takes next value if current and previous not declared', () => {
//   const { getByText } = render(
//     <GridItem screen="sm" lg={8}>
//       text
//     </GridItem>
//   )
//   expect(getByText('text')).toHaveStyle('width: 50%')
// })
it('calculate width correctly', () => {
  const { getByText, rerender } = render(
    <GridItem screen="sm" columns={12} xs={12} sm={9} md={8} lg={4}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('width: 75%')
  rerender(
    <GridItem screen="md" columns={12} xs={12} sm={12} md={6} lg={4}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('width: 50%')
  rerender(
    <GridItem screen="lg" columns={12} xs={12} sm={12} md={12} lg={3}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('width: 25%')
})

it('takes previous value if current not declared', () => {
  const { getByText } = render(
    <GridItem screen="xl" columns={12} md={6}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('width: 50%')
})

it('takes next value if current and previous not declared', () => {
  const { getByText } = render(
    <GridItem screen="sm" columns={12} lg={6}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('width: 50%')
})

it('grid item auto sizing', () => {
  const { getByText } = render(
    <GridItem screen="sm" columns={12}>
      text
    </GridItem>
  )
  expect(getByText('text')).toHaveStyle('flex-grow: 1')
})
