import * as React from 'react'
import {
  Pagination,
  ThemeProvider,
  createTheme,
  createUseStyles,
  light,
} from '@v-uik/base'

const paginationOutlinedTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorBorder: light.sys.color.separationMajor,
      colorBorderHover: light.sys.color.secondaryAlpha,
      colorBorderDisabled: light.sys.color.disabledHigh,
      colorBorderSelected: light.sys.color.secondaryAlpha,
      colorBackgroundHover: light.sys.color.secondaryAlpha,
      colorBackgroundActive: light.sys.color.secondaryGamma,
      colorTextHover: light.sys.color.onSecondaryHigh,
      colorTextActive: light.sys.color.onSecondaryHigh,
      colorTextSelected: light.sys.color.secondaryAlpha,
      selectedIndicatorColorBackground: 'transparent',
      selectedIndicatorColorBackgroundDisabled: 'transparent',
    },
  },
})

const paginationContainedTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorText: light.sys.color.onSecondaryHigh,
      colorTextHover: light.sys.color.onSecondaryHigh,
      colorTextActive: light.sys.color.onSecondaryHigh,
      colorBackground: light.sys.color.secondaryAlpha,
      colorBackgroundHover: light.sys.color.secondaryBeta,
      colorBackgroundActive: light.sys.color.secondaryGamma,
      colorBackgroundDisabled: light.sys.color.disabledMedium,
      colorBackgroundSelected: light.sys.color.primaryAlpha,
      colorBackgroundSelectedDisabled: light.sys.color.disabledHigh,
      colorTextDisabled: light.sys.color.disabledHigh,
      overflowColorText: light.sys.color.onBackgroundMedium,
      selectedIndicatorColorBackground: 'transparent',
      selectedIndicatorColorBackgroundDisabled: 'transparent',
    },
  },
})

const PaginationGhost: React.FC = () => {
  const useStyles = createUseStyles({
    root: {
      gap: 4,
    },
  })

  return <Pagination totalPageCount={10} classes={useStyles()} />
}

const PaginationOutlined: React.FC = () => {
  const useStyles = createUseStyles((theme) => ({
    root: {
      gap: 4,
    },
    item: {
      '&:focus-visible': {
        color: theme.sys.color.onSecondaryHigh,
        backgroundColor: theme.sys.color.secondaryAlpha,
        borderColor: theme.sys.color.focusPocus,
        '&::before': {
          boxShadow: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderRadius: 'inherit',
          borderWidth: theme.shape.borderWidth,
        },
      },
    },
    itemSelected: {
      '&::before': {
        content: '""',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderTopLeftRadius:
          theme.comp.pagination.shapeBorderRadiusTopLeftLarge,
        borderTopRightRadius:
          theme.comp.pagination.shapeBorderRadiusTopRightLarge,
        borderBottomLeftRadius:
          theme.comp.pagination.shapeBorderRadiusBottomLeftLarge,
        borderBottomRightRadius:
          theme.comp.pagination.shapeBorderRadiusBottomRightLarge,
        boxShadow: `0 0 0 2px ${theme.sys.color.secondaryAlpha}`,
      },
    },
    itemDisabled: {
      '&$itemSelected::before': {
        boxShadow: `0 0 0 2px ${light.sys.color.disabledHigh}`,
      },
    },
  }))

  return (
    <ThemeProvider theme={paginationOutlinedTheme}>
      <Pagination classes={useStyles()} totalPageCount={10} />
    </ThemeProvider>
  )
}

const PaginationContained: React.FC = () => {
  const useStyles = createUseStyles((theme) => ({
    root: {
      gap: 4,
    },
    item: {
      '&:focus-visible': {
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          borderRadius: 'inherit',
          borderStyle: theme.shape.borderStyle,
          borderWidth: theme.shape.borderWidth,
          borderColor: theme.sys.color.focusPocus,
        },
      },
    },
  }))

  return (
    <ThemeProvider theme={paginationContainedTheme}>
      <Pagination totalPageCount={10} classes={useStyles()} />
    </ThemeProvider>
  )
}

export const PaginationVariants: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
      <PaginationGhost />
      <PaginationOutlined />
      <PaginationContained />
    </div>
  )
}
