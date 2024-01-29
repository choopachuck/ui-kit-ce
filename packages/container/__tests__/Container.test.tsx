import * as React from 'react'
import { render } from '@testing-library/react'
import { Container, ContainerProps } from '../src'
import { Grid, GridItem } from '@v-uik/grid'

jest.mock('@v-uik/hooks', () => ({
  useMediaQuery: () => 'md',
}))

const TestComponent: React.FC<Omit<ContainerProps, 'children'>> = (props) => (
  <Container {...props} data-testid="test">
    <Grid>
      <GridItem>1 колонка</GridItem>
      <GridItem>2 колонка</GridItem>
      <GridItem>3 колонка</GridItem>
    </Grid>
  </Container>
)

it('render component', () => {
  const { getByTestId } = render(<TestComponent />)

  expect(getByTestId('test')).toHaveStyle({
    'padding-left': '32px',
    'padding-right': '32px',
  })
})

it('render fixed component with maxWidth', () => {
  const { getByTestId, rerender } = render(<TestComponent fixed />)

  const container = getByTestId('test')
  expect(container).toHaveStyle({
    'margin-left': 'auto',
    'margin-right': 'auto',
  })

  rerender(<TestComponent fixed maxWidth="md" />)

  expect(container).toHaveStyle({ 'max-width': '1056px' })
})

it('render component with justify: start', () => {
  const { getByTestId } = render(
    <TestComponent maxWidth="sm" justify="start" />
  )

  const container = getByTestId('test')
  expect(container).toHaveStyle({ 'margin-left': '0', 'margin-right': 'auto' })
})

it('render component with disableMargins', () => {
  const { getByTestId } = render(<TestComponent disableMargins />)

  const container = getByTestId('test')
  expect(container).toHaveStyle({ 'padding-left': '0', 'padding-right': '0' })
})
