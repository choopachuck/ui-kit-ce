'use client'

import { createUseStyles } from '@v-uik/theme'

export const useMonthViewStyles = createUseStyles((theme) => ({
  root: {
    margin: [-2, 0],
  },

  monthText: {
    fontSize: theme.comp.monthView.monthButtonTypographyFontSize,
    fontFamily: theme.comp.monthView.monthButtonTypographyFontFamily,
    fontWeight: theme.comp.monthView.monthButtonTypographyFontWeight,
    lineHeight: theme.comp.monthView.monthButtonTypographyLineHeight,
    letterSpacing: theme.comp.monthView.monthButtonTypographyLetterSpacing,
  },

  monthButton: {
    width: 93.3333,
    height: 40,
    margin: [2, 0],
    textTransform: 'capitalize',
    borderTopLeftRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,
    color: theme.comp.monthView.monthButtonColorText,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.monthView.monthButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.monthView.monthButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$selected': {
      color: theme.comp.monthView.monthButtonColorTextSelected,
      backgroundColor: theme.comp.monthView.monthButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,

      '&:hover': {
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.monthView.monthButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundSelectedDisabled,
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
          borderColor: theme.comp.monthView.monthButtonColorBorderFocus,
        },
      },
    },

    '&$withinRange': {
      background: theme.comp.monthView.monthButtonColorBackgroundWithinRange,

      '&$withinHoverRange': {
        borderWidth: 0,
        backgroundColor:
          theme.comp.monthView.monthButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.monthView.monthButtonColorBackgroundWithinRangeHover,
        },
      },
    },
  },

  selected: {},

  withinRange: {
    borderRadius: 0,

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
    borderColor: theme.comp.monthView.monthButtonColorBorderHover,
    borderWidth: [theme.shape.borderWidth, 0],
  },

  withinHoverRangeStart: {
    borderLeftWidth: theme.shape.borderWidth,
    borderTopLeftRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusTopLeft,
    borderBottomLeftRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomLeft,
  },

  withinHoverRangeEnd: {
    borderRightWidth: theme.shape.borderWidth,
    borderTopRightRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusTopRight,
    borderBottomRightRadius:
      theme.comp.monthView.monthButtonShapeBorderRadiusBottomRight,
  },
}))
