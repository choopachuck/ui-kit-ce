import { createUseStyles } from '@v-uik/theme'

const ITEM_HORISONTAL_PADDING = 4

export const useStyles = createUseStyles(
  (theme) => ({
    root: {
      display: 'inline-flex',
      flexFlow: 'row wrap',
    },
    item: {
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: theme.comp.pagination.typographyFontFamily,
      fontWeight: theme.comp.pagination.typographyFontWeight,
      letterSpacing: theme.comp.pagination.typographyLetterSpacing,
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,

      backgroundColor: theme.comp.pagination.colorBackground,
      color: theme.comp.pagination.colorText,
      borderColor: theme.comp.pagination.colorBorder,
      '&:hover': {
        backgroundColor: theme.comp.pagination.colorBackgroundHover,
        color: theme.comp.pagination.colorTextHover,
        borderColor: theme.comp.pagination.colorBorderHover,
      },
      '&:active': {
        backgroundColor: theme.comp.pagination.colorBackgroundActive,
        color: theme.comp.pagination.colorTextActive,
        borderColor: theme.comp.pagination.colorBorderActive,
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${theme.comp.pagination.colorShadowFocus}`,
        zIndex: 1,
      },
    },
    itemSmall: {
      height: 32,
      minWidth: 32,
      padding: [8, ITEM_HORISONTAL_PADDING],
      lineHeight: theme.comp.pagination.typographyLineHeightSmall,
      fontSize: theme.comp.pagination.typographyFontSizeSmall,
      borderTopLeftRadius: theme.comp.pagination.shapeBorderRadiusTopLeftSmall,
      borderTopRightRadius:
        theme.comp.pagination.shapeBorderRadiusTopRightSmall,
      borderBottomLeftRadius:
        theme.comp.pagination.shapeBorderRadiusBottomLeftSmall,
      borderBottomRightRadius:
        theme.comp.pagination.shapeBorderRadiusBottomRightSmall,
    },
    itemMedium: {
      height: 40,
      minWidth: 40,
      padding: [12, ITEM_HORISONTAL_PADDING],
      lineHeight: theme.comp.pagination.typographyLineHeightMedium,
      fontSize: theme.comp.pagination.typographyFontSizeMedium,
      borderTopLeftRadius: theme.comp.pagination.shapeBorderRadiusTopLeftMedium,
      borderTopRightRadius:
        theme.comp.pagination.shapeBorderRadiusTopRightMedium,
      borderBottomLeftRadius:
        theme.comp.pagination.shapeBorderRadiusBottomLeftMedium,
      borderBottomRightRadius:
        theme.comp.pagination.shapeBorderRadiusBottomRightMedium,
    },
    itemLarge: {
      height: 48,
      minWidth: 48,
      padding: [16, ITEM_HORISONTAL_PADDING],
      lineHeight: theme.comp.pagination.typographyLineHeightLarge,
      fontSize: theme.comp.pagination.typographyFontSizeLarge,
      borderTopLeftRadius: theme.comp.pagination.shapeBorderRadiusTopLeftLarge,
      borderTopRightRadius:
        theme.comp.pagination.shapeBorderRadiusTopRightLarge,
      borderBottomLeftRadius:
        theme.comp.pagination.shapeBorderRadiusBottomLeftLarge,
      borderBottomRightRadius:
        theme.comp.pagination.shapeBorderRadiusBottomRightLarge,
    },
    itemSelected: {
      backgroundColor:
        theme.comp.pagination.colorBackgroundSelected ||
        theme.comp.pagination.colorBackground,
      color:
        theme.comp.pagination.colorTextSelected ||
        theme.comp.pagination.colorText,
      borderColor:
        theme.comp.pagination.colorBorderSelected ||
        theme.comp.pagination.colorBorder,
      '&:hover': {
        backgroundColor:
          theme.comp.pagination.colorBackgroundSelectedHover ||
          theme.comp.pagination.colorBackgroundSelected ||
          theme.comp.pagination.colorBackground,
        color:
          theme.comp.pagination.colorTextSelectedHover ||
          theme.comp.pagination.colorTextSelected ||
          theme.comp.pagination.colorText,
        borderColor:
          theme.comp.pagination.colorBorderSelectedHover ||
          theme.comp.pagination.colorBorderSelected ||
          theme.comp.pagination.colorBorder,
      },
      '&:active': {
        backgroundColor:
          theme.comp.pagination.colorBackgroundSelectedActive ||
          theme.comp.pagination.colorBackgroundSelected ||
          theme.comp.pagination.colorBackground,
        color:
          theme.comp.pagination.colorTextSelectedActive ||
          theme.comp.pagination.colorTextSelected ||
          theme.comp.pagination.colorText,
        borderColor:
          theme.comp.pagination.colorBorderSelectedActive ||
          theme.comp.pagination.colorBorderSelected ||
          theme.comp.pagination.colorBorder,
      },
    },
    itemOverflow: {
      cursor: 'default',

      backgroundColor:
        theme.comp.pagination.overflowColorBackground || 'transparent',
      color:
        theme.comp.pagination.overflowColorText ||
        theme.comp.pagination.colorText,
      borderColor: theme.comp.pagination.overflowColorBorder || 'transparent',
      '&:hover': {
        backgroundColor:
          theme.comp.pagination.overflowColorBackgroundHover ||
          theme.comp.pagination.overflowColorBackground ||
          'transparent',
        color:
          theme.comp.pagination.overflowColorTextHover ||
          theme.comp.pagination.overflowColorText ||
          theme.comp.pagination.colorText,
        borderColor:
          theme.comp.pagination.overflowColorBorderHover ||
          theme.comp.pagination.overflowColorBorder ||
          'transparent',
      },
      '&:active': {
        backgroundColor:
          theme.comp.pagination.overflowColorBackgroundActive ||
          theme.comp.pagination.overflowColorBackground ||
          'transparent',
        color:
          theme.comp.pagination.overflowColorTextActive ||
          theme.comp.pagination.overflowColorText ||
          theme.comp.pagination.colorText,
        borderColor:
          theme.comp.pagination.overflowColorBorderActive ||
          theme.comp.pagination.overflowColorBorder ||
          'transparent',
      },
    },
    selectedIndicator: {
      position: 'absolute',
      bottom: 0,
      left: ITEM_HORISONTAL_PADDING,
      display: 'block',
      height: 2,
      borderTopLeftRadius:
        theme.comp.pagination.selectedIndicatorShapeBorderRadiusTopLeft,
      borderTopRightRadius:
        theme.comp.pagination.selectedIndicatorShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.pagination.selectedIndicatorShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.pagination.selectedIndicatorShapeBorderRadiusBottomRight,
      backgroundColor: theme.comp.pagination.selectedIndicatorColorBackground,
      width: `calc(100% - ${ITEM_HORISONTAL_PADDING * 2}px)`,
    },
    selectedIndicatorSmall: {},
    selectedIndicatorMedium: {},
    selectedIndicatorLarge: {},
    navigationButton: {
      '&$itemSmall svg': {
        height: 16,
        width: 16,
      },
    },
    navigationButtonPrevious: {
      '& svg': {
        transform: 'rotate(-180deg)',
      },
    },
    navigationButtonNext: {},
    navigationButtonFirst: {
      '& svg': {
        transform: 'rotate(-180deg)',
      },
    },
    navigationButtonLast: {},
    itemDisabled: {
      pointerEvents: 'none',
      backgroundColor: theme.comp.pagination.colorBackgroundDisabled,
      color: theme.comp.pagination.colorTextDisabled,
      borderColor: theme.comp.pagination.colorBorderDisabled,
      '&$itemOverflow': {
        backgroundColor: theme.comp.pagination.overflowColorBackgroundDisabled,
        color:
          theme.comp.pagination.overflowColorTextDisabled ||
          theme.comp.pagination.colorTextDisabled,
        borderColor: theme.comp.pagination.overflowColorBorderDisabled,
      },
      '&$itemSelected': {
        backgroundColor:
          theme.comp.pagination.colorBackgroundSelectedDisabled ||
          theme.comp.pagination.colorBackgroundDisabled,
        color:
          theme.comp.pagination.colorTextSelectedDisabled ||
          theme.comp.pagination.colorTextDisabled,
        borderColor:
          theme.comp.pagination.colorBorderSelectedDisabled ||
          theme.comp.pagination.colorBorderDisabled,
      },
    },
    selectedIndicatorDisabled: {
      backgroundColor:
        theme.comp.pagination.selectedIndicatorColorBackgroundDisabled ||
        theme.comp.pagination.selectedIndicatorColorBackground,
    },
  }),
  { name: 'pagination' }
)
