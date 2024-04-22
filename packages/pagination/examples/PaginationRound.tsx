import * as React from 'react'
import {
  Pagination,
  createTheme,
  light,
  ThemeProvider,
  setAlphaChannel,
  createUseStyles,
  PaginationNavigationButtonProps,
  clsx,
  Button,
} from '@v-uik/base'

const useStyles = createUseStyles({
  root: {
    gap: 4,
  },
  navigationButton: {
    paddingLeft: 16,
    paddingRight: 16,
    width: 126,
  },
  navigationText: {
    display: 'inline-block',
  },
  navigationTextPrevious: {
    marginLeft: 8,
  },
  navigationTextNext: {
    marginRight: 8,
  },
  navigationButtonPrevious: {
    '& svg': {
      transform: 'rotate(-180deg)',
    },
  },
})

const PreviousPageButton: React.FC<PaginationNavigationButtonProps> = ({
  children,
  onPageChange,
  disabled,
}) => {
  const classes = useStyles()

  return (
    <Button
      kind="ghost"
      color="secondary"
      disabled={disabled}
      classes={{
        button: clsx(
          classes.navigationButton,
          classes.navigationButtonPrevious
        ),
      }}
      onClick={() => onPageChange?.()}
    >
      {children}
      <span
        className={clsx(classes.navigationText, classes.navigationTextPrevious)}
      >
        Previous
      </span>
    </Button>
  )
}

const NextPageButton: React.FC<PaginationNavigationButtonProps> = ({
  children,
  onPageChange,
  disabled,
}) => {
  const classes = useStyles()

  return (
    <Button
      kind="ghost"
      color="secondary"
      disabled={disabled}
      classes={{ button: classes.navigationButton }}
      onClick={() => onPageChange?.()}
    >
      <span
        className={clsx(classes.navigationText, classes.navigationTextNext)}
      >
        Next
      </span>
      {children}
    </Button>
  )
}

const paginationSquareTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorBorder: light.sys.color.secondaryAlpha,
      colorText: light.sys.color.secondaryAlpha,
      colorTextHover: light.sys.color.secondaryAlpha,
      colorTextActive: light.sys.color.secondaryAlpha,
      colorTextSelected: light.sys.color.secondaryAlpha,
      colorBackgroundSelected: setAlphaChannel(
        light.ref.palette.electricBlue80,
        light.ref.alpha.channel70
      ),
      colorBorderDisabled: light.sys.color.disabledHigh,
      selectedIndicatorColorBackground: 'transparent',
      selectedIndicatorColorBackgroundDisabled: 'transparent',

      shapeBorderRadiusBottomLeftMedium: light.sys.shape.borderRadiusNone,
      shapeBorderRadiusTopLeftMedium: light.sys.shape.borderRadiusNone,
      shapeBorderRadiusBottomRightMedium: light.sys.shape.borderRadiusNone,
      shapeBorderRadiusTopRightMedium: light.sys.shape.borderRadiusNone,
    },
  },
})

const PaginationSquare: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={paginationSquareTheme}>
      <Pagination
        totalPageCount={10}
        classes={{
          root: classes.root,
          navigationButton: classes.navigationButton,
        }}
        components={{ PreviousPageButton, NextPageButton }}
      />
    </ThemeProvider>
  )
}

const paginationRoundedTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorBorder: light.sys.color.secondaryAlpha,
      colorText: light.sys.color.secondaryAlpha,
      colorTextHover: light.sys.color.secondaryAlpha,
      colorTextActive: light.sys.color.secondaryAlpha,
      colorTextSelected: light.sys.color.secondaryAlpha,
      colorBackgroundSelected: setAlphaChannel(
        light.ref.palette.electricBlue80,
        light.ref.alpha.channel70
      ),
      colorBorderDisabled: light.sys.color.disabledHigh,
      selectedIndicatorColorBackground: 'transparent',
      selectedIndicatorColorBackgroundDisabled: 'transparent',

      shapeBorderRadiusBottomLeftMedium: light.sys.shape.borderRadiusXl,
      shapeBorderRadiusTopLeftMedium: light.sys.shape.borderRadiusXl,
      shapeBorderRadiusBottomRightMedium: light.sys.shape.borderRadiusXl,
      shapeBorderRadiusTopRightMedium: light.sys.shape.borderRadiusXl,
    },
  },
})

const PaginationRounded: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={paginationRoundedTheme}>
      <Pagination
        totalPageCount={10}
        classes={{
          root: classes.root,
          navigationButton: classes.navigationButton,
        }}
        components={{ NextPageButton, PreviousPageButton }}
      />
    </ThemeProvider>
  )
}

const paginationCircleTheme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    pagination: {
      colorBorder: light.sys.color.secondaryAlpha,
      colorText: light.sys.color.secondaryAlpha,
      colorTextHover: light.sys.color.secondaryAlpha,
      colorTextActive: light.sys.color.secondaryAlpha,
      colorTextSelected: light.sys.color.secondaryAlpha,
      colorBackgroundSelected: setAlphaChannel(
        light.ref.palette.electricBlue80,
        light.ref.alpha.channel70
      ),
      colorBorderDisabled: light.sys.color.disabledHigh,
      selectedIndicatorColorBackground: 'transparent',
      selectedIndicatorColorBackgroundDisabled: 'transparent',

      shapeBorderRadiusBottomLeftMedium: light.sys.shape.borderRadiusCircle,
      shapeBorderRadiusTopLeftMedium: light.sys.shape.borderRadiusCircle,
      shapeBorderRadiusBottomRightMedium: light.sys.shape.borderRadiusCircle,
      shapeBorderRadiusTopRightMedium: light.sys.shape.borderRadiusCircle,
    },
  },
})

const PaginationCircle: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider theme={paginationCircleTheme}>
      <Pagination
        totalPageCount={10}
        classes={{
          root: classes.root,
          navigationButton: classes.navigationButton,
        }}
        components={{ PreviousPageButton, NextPageButton }}
      />
    </ThemeProvider>
  )
}

export const PaginationRound: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
      <PaginationSquare />
      <PaginationRounded />
      <PaginationCircle />
    </div>
  )
}
