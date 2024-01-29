import { createTheme } from '../src/createTheme'
import { darkOverrides } from '../src/themes'

const createThemeWrapper = (
  customProps: Parameters<typeof createTheme>[0] = {}
) =>
  createTheme({
    ...customProps,
    comp: {
      ...customProps.comp,
      backwardCompatibilityMode: false,
    },
  })

it('make createTheme return default theme', () => {
  const theme = createThemeWrapper()

  expect(theme).toMatchSnapshot()
})

it('make createTheme with customProps', () => {
  const theme = createThemeWrapper({
    ref: {
      palette: {
        white: '#EEE',
      },
    },
  })

  expect(theme.ref.palette.white).toBe('#EEE')
})

it('recalculate system level when changed ref', () => {
  const theme = createThemeWrapper({
    ref: {
      palette: {
        electricBlue50: 'blue',
      },
    },
  })

  expect(theme.sys.color.primaryAlpha).toBe('blue')
})

it('recalculate comp level when changed sys', () => {
  const theme = createThemeWrapper({
    sys: {
      color: {
        primaryAlpha: 'green',
      },
    },
  })

  expect(theme.comp.button.colorBackgroundContainedPrimary).toBe('green')
})

it('recalculate comp level when changed ref', () => {
  const theme = createThemeWrapper({
    ref: {
      palette: {
        electricBlue50: 'blue',
      },
    },
  })

  expect(theme.comp.button.colorBackgroundContainedPrimary).toBe('blue')
})

it('correctly prioritize consecutive changes', () => {
  const theme = createThemeWrapper({
    ref: {
      palette: {
        electricBlue50: 'blue',
      },
    },
    sys: {
      color: {
        primaryAlpha: 'green',
      },
    },
    comp: {
      button: {
        colorTextGhostPrimary: 'yellow',
      },
    },
  })

  expect(theme.comp.button.colorBackgroundContainedPrimary).toBe('green')
  expect(theme.comp.button.colorTextGhostPrimary).toBe('yellow')
})

it('make createTheme with overrides returns dark theme', () => {
  const theme = createThemeWrapper(darkOverrides)

  expect(theme).toMatchSnapshot()
})
