'use client'

import { createUseStyles } from '@v-uik/theme'

export const useCalendarPickerStyles = createUseStyles((theme) => ({
  root: {
    width: 280,
    height: 348,
  },

  calendarBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },

  chevron: {
    minWidth: 0,
    padding: 8,
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,
  },

  month: {
    flex: 1,
    textTransform: 'capitalize',
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,

    '&$selected': {
      color: theme.comp.calendarPicker.monthButtonColorTextSelected,
      backgroundColor:
        theme.comp.calendarPicker.monthButtonColorBackgroundSelected,
    },
  },

  year: {
    borderTopLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopLeft,
    borderTopRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.calendarPicker.buttonShapeBorderRadiusBottomRight,

    '&$selected': {
      color: theme.comp.calendarPicker.yearButtonColorTextSelected,
      backgroundColor:
        theme.comp.calendarPicker.yearButtonColorBackgroundSelected,
    },
  },

  selected: {},
}))
