'use client'

import { createUseStyles } from '@v-uik/theme'

export const useDayViewStyles = createUseStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,

    '&:last-child': {
      marginBottom: 0,
    },
  },

  weekDay: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.comp.dayView.weekDayColorText,

    fontSize: theme.comp.dayView.weekDayTypographyFontSize,
    fontFamily: theme.comp.dayView.weekDayTypographyFontFamily,
    fontWeight: theme.comp.dayView.weekDayTypographyFontWeight,
    letterSpacing: theme.comp.dayView.weekDayTypographyLetterSpacing,
    lineHeight: theme.comp.dayView.weekDayTypographyLineHeight,
  },
  dayText: {
    fontSize: theme.comp.dayView.dayButtonTypographyFontSize,
    fontFamily: theme.comp.dayView.dayButtonTypographyFontFamily,
    fontWeight: theme.comp.dayView.dayButtonTypographyFontWeight,
    lineHeight: theme.comp.dayView.dayButtonTypographyLineHeight,
    letterSpacing: theme.comp.dayView.dayButtonTypographyLetterSpacing,
  },

  dayButton: {
    boxSizing: 'border-box',
    width: 40,
    height: 40,
    borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.dayView.dayButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.dayView.dayButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$selected': {
      color: theme.comp.dayView.dayButtonColorTextSelected,
      backgroundColor: theme.comp.dayView.dayButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,

      '&:hover': {
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.dayView.dayButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundSelectedDisabled,
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
          borderColor: theme.comp.dayView.dayButtonColorBorderFocus,
        },
      },
    },

    '&$today': {
      color: theme.comp.dayView.dayButtonColorTextToday,
      '& > span': {
        width: 'auto',
        boxShadow: `0 3px 0 -1px ${theme.comp.dayView.dayButtonColorTextToday}`,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.dayView.dayButtonColorTextTodayDisabled,
        '& > span': {
          boxShadow: `0 3px 0 -1px ${theme.comp.dayView.dayButtonColorTextTodayDisabled}`,
        },
      },

      '&$selected': {
        color: theme.comp.dayView.dayButtonColorTextTodaySelected,
        '& > span': {
          boxShadow: `0 3px 0 -1px ${theme.comp.dayView.dayButtonColorTextTodaySelected}`,
        },
      },
    },

    '&$notCurrentMonth:not([aria-disabled="true"])': {
      color: theme.comp.dayView.dayButtonColorTextNotInMonth,
    },

    '&$withinRange': {
      background: theme.comp.dayView.dayButtonColorBackgroundWithinRange,

      '&$withinHoverRange': {
        borderWidth: 0,
        backgroundColor:
          theme.comp.dayView.dayButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.dayView.dayButtonColorBackgroundWithinRangeHover,
        },
      },
    },
  },

  today: {},

  selected: {},

  notCurrentMonth: {},

  withinRange: {
    borderRadius: 0,

    '&$monthStart': {
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$weekStart': {
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$monthEnd': {
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },

    '&$weekEnd': {
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },

    '&$withinHoverRangeStart': {
      borderRadius: 0,
    },

    '&$withinHoverRangeEnd': {
      borderRadius: 0,
    },
  },

  withinHoverRange: {
    borderRadius: 0,
    borderStyle: 'dashed',
    borderColor: theme.comp.dayView.dayButtonColorBorderHover,
    borderWidth: [theme.shape.borderWidth, 0],

    '&$monthStart': {
      borderLeftWidth: theme.shape.borderWidth,
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$weekStart': {
      borderLeftWidth: theme.shape.borderWidth,
      borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
      borderBottomLeftRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
    },

    '&$monthEnd': {
      borderRightWidth: theme.shape.borderWidth,
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },

    '&$weekEnd': {
      borderRightWidth: theme.shape.borderWidth,
      borderTopRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
      borderBottomRightRadius:
        theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
    },
  },

  withinHoverRangeStart: {
    borderLeftWidth: theme.shape.borderWidth,
    borderTopLeftRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopLeft,
    borderBottomLeftRadius:
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomLeft,
  },

  withinHoverRangeEnd: {
    borderRightWidth: theme.shape.borderWidth,
    borderTopRightRadius: theme.comp.dayView.dayButtonShapeBorderRadiusTopRight,
    borderBottomRightRadius:
      theme.comp.dayView.dayButtonShapeBorderRadiusBottomRight,
  },

  weekStart: {},

  weekEnd: {},

  monthStart: {},

  monthEnd: {},
}))
