import React from 'react'
import { DocsContainer, Canvas } from '@storybook/addon-docs'
import {
  ThemeProvider,
  createUseStyles,
  dark,
  light,
  DateLibAdapterProvider,
  createTheme,
  darkOverrides,
} from '@v-uik/base'
import { DateFnsAdapter } from '@v-uik/date-picker/adapters/date-fns'
import { ru } from 'date-fns/locale'
import { DocsWrapper, DocsSideNav, HeadersComponentsMdx } from '../internal'
import { COMPONENTS, HOOKS, COOKBOOK, STORY_TITLES } from '../config'
import { setup } from '../config/monaco'
import { EnvService } from 'services'

import '../../../assets/css/override.css'

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexBasis: '50%',
    },
  },
})

const THEME_KEYS = {
  light: 'light',
  dark: 'dark',
}

const SPLIT_MODE = {
  on: 'on',
  off: 'off',
}

const getThemeKey = () => window.localStorage.getItem('theme')
const setThemeKey = (theme) => window.localStorage.setItem('theme', theme)

const getSplitMode = () => window.localStorage.getItem('splitMode')
const setSplitMode = (mode) => window.localStorage.setItem('splitMode', mode)

const getColorByThemeKey = (theme) => {
  switch (theme) {
    case THEME_KEYS.dark:
      return '#333333'
    case THEME_KEYS.light:
    default:
      return 'white'
  }
}

const getTheme = (key) => {
  switch (key) {
    case THEME_KEYS.dark:
      return dark
    case THEME_KEYS.light:
    default:
      return light
  }
}

const getNextTheme = (key) => {
  switch (key) {
    case THEME_KEYS.dark:
      return createTheme(darkOverrides)
    case THEME_KEYS.light:
    default:
      return createTheme()
  }
}

const withThemeProvider = (Story, context) => {
  const classes = useStyles()
  const themeKey = context.globals.theme
  const splitMode = context.globals.splitMode

  React.useEffect(() => {
    setThemeKey(themeKey)
    document.documentElement.style = `background-color: ${getColorByThemeKey(
      themeKey
    )}`
  }, [themeKey])

  React.useEffect(() => {
    setSplitMode(splitMode)
  })

  if (splitMode === SPLIT_MODE.on) {
    const splitTheme = [
      getNextTheme(THEME_KEYS.light),
      getNextTheme(THEME_KEYS.dark),
    ].map((theme, index) => {
      return (
        <ThemeProvider theme={theme} key={index}>
          <div
            style={{
              backgroundColor: theme.sys.color.backgroundAlpha,
              padding: '20px',
            }}
          >
            <Story {...context} />
          </div>
        </ThemeProvider>
      )
    })

    return <div className={classes.wrapper}>{splitTheme}</div>
  }

  return (
    <ThemeProvider theme={getTheme(themeKey)}>
      <Story {...context} />
    </ThemeProvider>
  )
}

const withDateLibProvider = (Story, context) => {
  return (
    <DateLibAdapterProvider
      dateAdapter={DateFnsAdapter}
      options={{
        locale: ru,
        formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
      }}
    >
      <Story {...context} />
    </DateLibAdapterProvider>
  )
}

export const parameters = {
  controls: { expanded: true },
  options: {
    storySort: {
      method: 'configure',
      includeNames: true,
      order: [
        COMPONENTS.newApp,
        COMPONENTS.controls,
        COMPONENTS.inputFields,
        ['DatePicker', 'RangePicker', 'FileUploader', ['FileUploader', '*']],
        COMPONENTS.navigation,
        COMPONENTS.dataDisplay,
        COMPONENTS.feedback,
        COMPONENTS.utility,
        [
          'Box',
          'ClickStreamProvider',
          [
            STORY_TITLES.clickStreamProvider.api,
            STORY_TITLES.clickStreamProvider.baseUsage,
            STORY_TITLES.clickStreamProvider.batchSize,
            STORY_TITLES.clickStreamProvider.init,
            STORY_TITLES.clickStreamProvider.inactivityTime,
            STORY_TITLES.clickStreamProvider.formatData,
            STORY_TITLES.clickStreamProvider.refAndCustomEvents,
            STORY_TITLES.clickStreamProvider.disableEvents,
          ],
        ],
        HOOKS.root,
        COOKBOOK.root,
      ],
    },
  },
  docs: {
    container: ({ children, context }) => {
      return (
        <DocsWrapper>
          {/* Глобальные стили для docs смотреть в preview-head.html */}
          <DocsContainer context={context}>
            <DateLibAdapterProvider
              dateAdapter={DateFnsAdapter}
              options={{
                locale: ru,
                formats: { weekdayShort: 'EEEEEE', monthShort: 'LLL' },
              }}
            >
              {children}
            </DateLibAdapterProvider>
          </DocsContainer>
          <DocsSideNav />
        </DocsWrapper>
      )
    },
    // https://github.com/storybookjs/storybook/blob/v6.4.8/addons/docs/src/blocks/DocsContainer.tsx#L49
    components: {
      ...HeadersComponentsMdx,
      Canvas: (props) => (
        <React.StrictMode>
          <Canvas {...props} />
        </React.StrictMode>
      ),
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Choose theme',
    defaultValue: getThemeKey() || THEME_KEYS.light,
    toolbar: {
      icon: 'contrast',
      items: [THEME_KEYS.light, THEME_KEYS.dark],
    },
  },
  splitMode: {
    name: 'Split Mode',
    description: 'Show/hide split theme mode',
    defaultValue: getSplitMode() ?? SPLIT_MODE.off,
    toolbar: {
      icon: 'switchalt',
      /**
       * Для отображения списка, value также используется для key, поэтому если просто
       * использовать boolean значение, в консоли будет ошибка
       * */
      items: [
        { value: SPLIT_MODE.on, title: 'On' },
        { value: SPLIT_MODE.off, title: 'Off' },
      ],
    },
  },
}

export const decorators = [withDateLibProvider, withThemeProvider]

!EnvService.isDist && setup()
