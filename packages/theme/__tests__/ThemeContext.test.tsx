import * as React from 'react'
import { render } from '@testing-library/react'
import {
  ThemeProvider,
  createUseStyles,
  light,
  createTheme,
  darkOverrides,
} from '../src'

interface Props extends Omit<React.ComponentPropsWithRef<'div'>, 'text'> {
  text: string
}

const useStyles = createUseStyles(
  (theme) => ({
    root: {},
    colorize: {
      color: theme.sys.color.primaryAlpha,
    },
  }),
  { name: 'test' }
)
const Component = (props: Partial<Props>) => {
  const classList = useStyles()

  return (
    <div className={classList.root} {...props}>
      <span className={classList.colorize}>{props.text}</span>
    </div>
  )
}

it('custom createUseStyle creates styles without ThemeProvider', () => {
  const { getByTestId } = render(<Component data-testid="basic" />)

  expect(getByTestId('basic').className).toMatch(/test-root/i)
})

it('custom createUseStyle creates styles with default light theme without ThemeProvider', () => {
  const text = 'Color here'

  const { getByText } = render(<Component text={text} />)

  expect(getByText(text)).toHaveStyle(`color: ${light.sys.color.primaryAlpha}`)
})

it('custom createUseStyle creates styles with ThemeProvider', () => {
  const { getByTestId } = render(
    <ThemeProvider theme={light}>
      <Component data-testid="provider" />
    </ThemeProvider>
  )

  expect(getByTestId('provider').className).toMatch(/test-root/i)
})

it('custom createUseStyle creates styles with default light theme with ThemeProvider', () => {
  const text = 'Color here'

  const { getByText } = render(
    <ThemeProvider theme={light}>
      <Component text={text} />
    </ThemeProvider>
  )

  expect(getByText(text)).toHaveStyle(`color: ${light.sys.color.primaryAlpha}`)
})

it('custom createUseStyle creates styles with dark theme overrides with ThemeProvider', () => {
  const text = 'Color here'
  const theme = createTheme(darkOverrides)

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <Component text={text} />
    </ThemeProvider>
  )

  expect(getByText(text)).toHaveStyle(`color: ${theme.sys.color.primaryAlpha}`)
})
