import * as React from 'react'
import { render } from '@testing-library/react'
import { Grid, GridItem } from '../src'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

it('sets default styles', () => {
  const { getByTestId } = render(<Grid data-testid="testId" />)
  expect(getByTestId('testId')).toHaveStyle({
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-items': 'stretch',
    'justify-content': 'flex-start',
    'margin-top': '-8px',
    'margin-left': '-8px',
  })
})

it('correctly sets justify style', () => {
  const { getByTestId } = render(<Grid data-testid="testId" justify="center" />)
  expect(getByTestId('testId')).toHaveStyle('justify-content: center')
})

it('correctly sets align style', () => {
  const { getByTestId } = render(
    <Grid data-testid="testId" alignItems="center" />
  )
  expect(getByTestId('testId')).toHaveStyle('align-items: center')
})

it('correctly sets nowrap style', () => {
  const { getByTestId } = render(<Grid nowrap data-testid="testId" />)
  expect(getByTestId('testId')).toHaveStyle('flex-wrap: nowrap')
})

it('correctly sets spacing style', () => {
  const { getByTestId, getByText, rerender } = render(
    <Grid data-testid="testId" spacing={3}>
      <GridItem>item</GridItem>
    </Grid>
  )
  expect(getByTestId('testId')).toHaveStyle({
    'margin-top': '-24px',
    'margin-left': '-24px',
  })
  expect(getByText('item')).toHaveStyle({
    'padding-top': '24px',
    'padding-left': '24px',
  })
  rerender(
    <Grid data-testid="testId" spacing={1.5}>
      <GridItem>item</GridItem>
    </Grid>
  )
  expect(getByTestId('testId')).toHaveStyle({
    'margin-top': '-12px',
    'margin-left': '-12px',
  })
  expect(getByText('item')).toHaveStyle({
    'padding-top': '12px',
    'padding-left': '12px',
  })

  rerender(
    <Grid data-testid="testId" columnSpacing={2} rowSpacing={4}>
      <GridItem>item</GridItem>
    </Grid>
  )

  expect(getByText('item')).toHaveStyle({
    'padding-left': '16px',
    'padding-top': '32px',
  })

  rerender(
    <Grid data-testid="testId" spacing={0}>
      <GridItem>item</GridItem>
    </Grid>
  )

  expect(getByTestId('testId')).toHaveStyle({
    'margin-top': '0',
    'margin-left': '0',
  })
  expect(getByText('item')).toHaveStyle({
    'padding-top': '0',
    'padding-left': '0',
  })
})
