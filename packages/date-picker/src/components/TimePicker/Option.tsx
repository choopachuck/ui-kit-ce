'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { DayPart } from '../../interfaces/time'
import { useButtonReset } from '@v-uik/hooks'

export type OptionClasses = {
  option?: string
  optionDisabled?: string
  optionSelected?: string
}

const useStyles = createUseStyles((theme) => ({
  option: {
    position: 'relative',
    padding: '10px 0',
    marginTop: 2,
    borderRadius: '4px',
    minWidth: 48,
    boxSizing: 'border-box',

    '&:first-child': {
      marginTop: 0,
    },

    fontSize:
      theme.comp.timeView.timeButtonTypographyFontSize ||
      theme.comp.dayView.dayButtonTypographyFontSize,
    fontFamily:
      theme.comp.timeView.timeButtonTypographyFontFamily ||
      theme.comp.dayView.dayButtonTypographyFontFamily,
    fontWeight:
      theme.comp.timeView.timeButtonTypographyFontWeight ||
      theme.comp.dayView.dayButtonTypographyFontWeight,
    lineHeight:
      theme.comp.timeView.timeButtonTypographyLineHeight ||
      theme.comp.dayView.dayButtonTypographyLineHeight,
    letterSpacing:
      theme.comp.timeView.timeButtonTypographyLetterSpacing ||
      theme.comp.dayView.dayButtonTypographyLetterSpacing,

    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.comp.timeView.timeButtonColorBackgroundHover ||
        theme.comp.dayView.dayButtonColorBackgroundHover,
    },

    '&$disabled': {
      color:
        theme.comp.timeView.timeButtonColorTextDisabled ||
        theme.comp.dayView.dayButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${
        theme.comp.timeView.timeButtonColorShadowFocus ||
        theme.comp.dayView.dayButtonColorShadowFocus
      }`,
    },

    '&:active': {
      backgroundColor:
        theme.comp.timeView.timeButtonColorBackgroundActive ||
        theme.comp.dayView.dayButtonColorBackgroundActive,
    },

    '&$selected': {
      color: '#fff',
      backgroundColor:
        theme.comp.timeView.timeButtonColorShadowFocus ||
        theme.comp.dayView.dayButtonColorShadowFocus,

      '&:hover': {
        backgroundColor:
          theme.comp.timeView.timeButtonColorBackgroundSelectedHover ||
          theme.comp.dayView.dayButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.timeView.timeButtonColorBackgroundSelectedActive ||
          theme.comp.dayView.dayButtonColorBackgroundSelectedActive,
      },

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
          borderColor:
            theme.comp.timeView.timeButtonColorBorderFocus ||
            theme.comp.dayView.dayButtonColorBorderFocus,
        },
      },
    },
  },

  disabled: {},
  selected: {},
}))

type OptionViewType = DayPart | number

interface Props<T extends OptionViewType> {
  tabIndex: number
  label: T
  formatLabel?: (label: T) => string
  onClick: (
    v: T,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
  isSelected?: boolean
  isDisabled?: boolean
  classes?: OptionClasses
}

export const Option = <T extends OptionViewType>({
  tabIndex,
  label,
  formatLabel,
  onClick: propsOnClick,
  isSelected,
  isDisabled,
  classes = {},
}: Props<T>): JSX.Element => {
  const classesList = useStyles()
  const buttonClasses = useButtonReset()

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // В safari фокус надоручками выставлять https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element
    event.currentTarget.focus()
    propsOnClick(label, event)
  }

  return (
    <button
      key={label}
      tabIndex={tabIndex}
      data-value={label}
      aria-disabled={isDisabled}
      className={clsx(
        classesList.option,
        buttonClasses.resetButton,
        classes.option,
        {
          [classesList.selected ?? '']: isSelected,
          [classesList.disabled ?? '']: isDisabled,
          [classes.optionSelected ?? '']: isSelected,
          [classes.optionDisabled ?? '']: isDisabled,
        }
      )}
      role="option"
      type="button"
      onClick={!isDisabled ? onClick : undefined}
    >
      <span>{formatLabel ? formatLabel(label) : label}</span>
    </button>
  )
}
