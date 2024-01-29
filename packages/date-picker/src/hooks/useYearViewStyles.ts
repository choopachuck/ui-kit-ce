'use client'

import { createUseStyles } from '@v-uik/theme'

export const useYearViewStyles = createUseStyles((theme) => ({
  root: {
    overflowY: 'auto',
    height: 308,
    margin: [-2, 0],
    // Отступ чтобы не обрезать рамку от focus-состояния
    paddingLeft: 2,
  },
  yearText: {
    fontSize: theme.comp.yearView.yearButtonTypographyFontSize,
    fontFamily: theme.comp.yearView.yearButtonTypographyFontFamily,
    fontWeight: theme.comp.yearView.yearButtonTypographyFontWeight,
    lineHeight: theme.comp.yearView.yearButtonTypographyLineHeight,
    letterSpacing: theme.comp.yearView.yearButtonTypographyLetterSpacing,
  },

  yearButton: {
    width: 84,
    height: 40,
    margin: [2, 0],
    borderTopLeftRadius: theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,
    color: theme.comp.yearView.yearButtonColorText,
    cursor: 'pointer',
    position: 'relative',

    '&:focus-visible': {
      zIndex: 1,
      boxShadow: `0 0 0 2px ${theme.comp.yearView.yearButtonColorShadowFocus}`,
    },

    '&:hover': {
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundHover,
    },

    '&:active': {
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundActive,
    },

    '&[aria-disabled="true"]': {
      color: theme.comp.yearView.yearButtonColorTextDisabled,
      pointerEvents: 'none',
    },

    '&$selected': {
      color: theme.comp.yearView.yearButtonColorTextSelected,
      backgroundColor: theme.comp.yearView.yearButtonColorBackgroundSelected,
      borderWidth: 0,
      borderTopLeftRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,

      '&:hover': {
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedActive,
      },

      '&[aria-disabled="true"]': {
        color: theme.comp.yearView.yearButtonColorTextSelectedDisabled,
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundSelectedDisabled,
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
          borderColor: theme.comp.yearView.yearButtonColorBorderFocus,
        },
      },
    },

    '&$withinRange': {
      background: theme.comp.yearView.yearButtonColorBackgroundWithinRange,

      '&$withinHoverRange': {
        borderWidth: 0,
        backgroundColor:
          theme.comp.yearView.yearButtonColorBackgroundWithinRangeHover,

        '&:hover': {
          backgroundColor:
            theme.comp.yearView.yearButtonColorBackgroundWithinRangeHover,
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
    borderColor: theme.comp.yearView.yearButtonColorBorderHover,
    borderWidth: [theme.shape.borderWidth, 0],
  },

  withinHoverRangeStart: {
    borderLeftWidth: theme.shape.borderWidth,
    borderTopLeftRadius: theme.comp.yearView.yearButtonShapeBorderRadiusTopLeft,
    borderBottomLeftRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomLeft,
  },

  withinHoverRangeEnd: {
    borderRightWidth: theme.shape.borderWidth,
    borderTopRightRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusTopRight,
    borderBottomRightRadius:
      theme.comp.yearView.yearButtonShapeBorderRadiusBottomRight,
  },
}))
