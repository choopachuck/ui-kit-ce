import {
  TreeSpacingVertical,
  DEFAULT_SPACING,
  CONTROL_ELEMENT_SIZE,
} from './common'
import { createUseStyles } from '@v-uik/theme'

export const useStyles = createUseStyles(
  (theme) => {
    return {
      //#region Классы стилей основного дерева
      root: {
        paddingLeft: 0,
        display: 'flex',
        margin: 0,
        width: '100%',
        flexDirection: 'column',
        outline: 'none',
        fontFamily: theme.comp.tree.typographyFontFamily,
        fontWeight: theme.comp.tree.typographyFontWeight,
        letterSpacing: theme.comp.tree.typographyLetterSpacing,
      },
      rootExtraSmall: {
        fontSize: theme.comp.tree.typographyFontSizeXs,
        lineHeight: theme.comp.tree.typographyLineHeightXs,
      },
      rootSmall: {
        fontSize: theme.comp.tree.typographyFontSizeSm,
        lineHeight: theme.comp.tree.typographyLineHeightSm,
      },
      rootMedium: {
        fontSize: theme.comp.tree.typographyFontSizeMd,
        lineHeight: theme.comp.tree.typographyLineHeightMd,
      },
      //#endregion

      //#region Классы стилей элементов дерева
      item: {
        minWidth: 288,
        display: 'flex',
        flexDirection: 'column',

        '& > $node:hover': {
          backgroundColor: theme.comp.tree.colorBackgroundHover,
          color: theme.comp.tree.colorTextHover || theme.comp.tree.colorText,

          '& $nodeExpandButton': {
            color:
              theme.comp.tree.expandIconColorHover ||
              theme.comp.tree.expandIconColor,
          },

          '& $nodeIcon': {
            color: theme.comp.tree.iconColorHover || theme.comp.tree.iconColor,
          },

          '& $selectedIndicator': {
            backgroundColor:
              theme.comp.tree.selectedIndicatorColorBackgroundHover,
          },
        },

        '& > $node:active': {
          backgroundColor: theme.comp.tree.colorBackgroundActive,
          color: theme.comp.tree.colorTextActive || theme.comp.tree.colorText,

          '& button$nodeExpandButton': {
            color:
              theme.comp.tree.expandIconColorActive ||
              theme.comp.tree.expandIconColor,
          },

          '& span$nodeIcon': {
            color: theme.comp.tree.iconColorActive || theme.comp.tree.iconColor,
          },

          '& $selectedIndicator': {
            backgroundColor:
              theme.comp.tree.selectedIndicatorColorBackgroundActive,
          },
        },
      },
      itemFocused: {
        '& > $node': {
          boxShadow: `0 0 0 2px ${theme.comp.tree.colorShadowFocus}`,
          zIndex: 1,
        },
      },
      node: {
        position: 'relative',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: theme.comp.tree.colorBackground,
        color: theme.comp.tree.colorText,
      },
      itemGroup: {
        paddingLeft: 0,
      },
      itemExtraSmall: {
        '& $node': {
          borderTopLeftRadius: theme.comp.tree.shapeBorderRadiusTopLeftXs,
          borderTopRightRadius: theme.comp.tree.shapeBorderRadiusTopRightXs,
          borderBottomLeftRadius: theme.comp.tree.shapeBorderRadiusBottomLeftXs,
          borderBottomRightRadius:
            theme.comp.tree.shapeBorderRadiusBottomRightXs,
        },

        '& $nodeControlContainer': {
          paddingTop: TreeSpacingVertical.xs,
          paddingBottom: TreeSpacingVertical.xs,
        },
        '& $nodeContentContainer': {
          paddingTop: TreeSpacingVertical.xs,
          paddingBottom: TreeSpacingVertical.xs,
        },
      },
      itemSmall: {
        '& $node': {
          borderTopLeftRadius: theme.comp.tree.shapeBorderRadiusTopLeftSm,
          borderTopRightRadius: theme.comp.tree.shapeBorderRadiusTopRightSm,
          borderBottomLeftRadius: theme.comp.tree.shapeBorderRadiusBottomLeftSm,
          borderBottomRightRadius:
            theme.comp.tree.shapeBorderRadiusBottomRightSm,
        },

        '& $nodeControlContainer': {
          paddingTop: TreeSpacingVertical.sm,
          paddingBottom: TreeSpacingVertical.sm,
        },
        '& $nodeContentContainer': {
          paddingTop: TreeSpacingVertical.sm,
          paddingBottom: TreeSpacingVertical.sm,
        },
      },
      itemMedium: {
        '& $node': {
          borderTopLeftRadius: theme.comp.tree.shapeBorderRadiusTopLeftMd,
          borderTopRightRadius: theme.comp.tree.shapeBorderRadiusTopRightMd,
          borderBottomLeftRadius: theme.comp.tree.shapeBorderRadiusBottomLeftMd,
          borderBottomRightRadius:
            theme.comp.tree.shapeBorderRadiusBottomRightMd,
        },

        '& $nodeControlContainer': {
          paddingTop: TreeSpacingVertical.md,
          paddingBottom: TreeSpacingVertical.md,
        },
        '& $nodeContentContainer': {
          paddingTop: TreeSpacingVertical.md,
          paddingBottom: TreeSpacingVertical.md,
        },
      },
      itemDisabled: {
        '& > $node': {
          backgroundColor: theme.comp.tree.colorBackgroundDisabled,
          color: theme.comp.tree.colorTextDisabled,

          '& $nodeExpandButton': {
            color: theme.comp.tree.expandIconColorDisabled,
          },

          '& $nodeIcon': {
            color: theme.comp.tree.iconColorDisabled,
          },

          '& $selectedIndicator': {
            backgroundColor:
              theme.comp.tree.selectedIndicatorColorBackgroundDisabled,
          },
        },

        pointerEvents: 'none',
      },
      itemLoading: {},
      //#endregion

      //#region Классы стилей элементов управления
      nodeControlContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        position: 'relative',
        '&:focus-visible': {
          outline: 'none',
        },
        paddingLeft: DEFAULT_SPACING,
        paddingRight: DEFAULT_SPACING,
        minHeight: CONTROL_ELEMENT_SIZE,
        minWidth: CONTROL_ELEMENT_SIZE,
        boxSizing: 'content-box',
      },
      nodeControl: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
      nodeContentContainer: {
        alignSelf: 'center',
        display: 'flex',
        paddingLeft: DEFAULT_SPACING,
        paddingRight: DEFAULT_SPACING,
      },
      nodeContent: {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      },
      nodeIcon: {
        color: theme.comp.tree.iconColor,
      },
      //#endregion

      //#region Классы стилей элемента для скрытия/раскрытия
      itemExpandable: {
        '& > $node': {
          cursor: 'pointer',
        },
      },
      itemExpanded: {},
      nodeExpandButton: {
        color: theme.comp.tree.expandIconColor,
      },
      //#endregion

      //#region Классы стилей для путей у элементов дерева
      trailContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: -1,
      },
      trailVertical: {
        position: 'absolute',
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: theme.comp.tree.trailsColor,
      },
      trailHorizohtal: {
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        position: 'absolute',
        borderBottomLeftRadius: theme.comp.tree.trailsBorderRadius,
        borderLeftColor: theme.comp.tree.trailsColor,
        borderBottomColor: theme.comp.tree.trailsColor,
      },
      //#endregion

      //#region Классы для элемента с функционалом выбора
      itemSelectable: {
        '& $node': {
          cursor: 'pointer',
        },
      },
      itemSelected: {
        '& > $node': {
          color: theme.comp.tree.colorTextSelected,
          backgroundColor: theme.comp.tree.colorBackgroundSelected,

          '& $nodeExpandButton': {
            color: theme.comp.tree.expandIconColorSelected,
          },

          '& $nodeIcon': {
            color: theme.comp.tree.iconColorSelected,
          },
        },
        '& > $node:hover': {
          color: theme.comp.tree.colorTextSelectedHover,
          backgroundColor: theme.comp.tree.colorBackgroundSelectedHover,

          '& $nodeExpandButton': {
            color:
              theme.comp.tree.expandIconColorSelectedHover ||
              theme.comp.tree.expandIconColorSelected,
          },

          '& $nodeIcon': {
            color:
              theme.comp.tree.iconColorSelectedHover ||
              theme.comp.tree.iconColorSelected,
          },
        },
        '& > $node:active': {
          color: theme.comp.tree.colorTextSelectedActive,
          backgroundColor: theme.comp.tree.colorBackgroundSelectedActive,

          '& button$nodeExpandButton': {
            color:
              theme.comp.tree.expandIconColorSelectedActive ||
              theme.comp.tree.expandIconColorSelected,
          },

          '& span$nodeIcon ': {
            color:
              theme.comp.tree.iconColorSelectedActive ||
              theme.comp.tree.iconColorSelected,
          },
        },
        '&$itemDisabled > $node': {
          color: theme.comp.tree.colorTextSelectedDisabled,
          backgroundColor: theme.comp.tree.colorBackgroundSelectedDisabled,

          '& $nodeExpandButton': {
            color: theme.comp.tree.expandIconColorSelectedDisabled,
          },

          '& $nodeIcon': {
            color: theme.comp.tree.iconColorSelectedDisabled,
          },
        },
      },
      selectedIndicator: {
        position: 'absolute',
        display: 'block',
        height: '100%',
        width: 4,
        top: 0,
        left: 0,
        backgroundColor: theme.comp.tree.selectedIndicatorColorBackground,
        borderTopLeftRadius:
          theme.comp.tree.selectedIndicatorShapeBorderRadiusTopLeft,
        borderTopRightRadius:
          theme.comp.tree.selectedIndicatorShapeBorderRadiusTopRight,
        borderBottomLeftRadius:
          theme.comp.tree.selectedIndicatorShapeBorderRadiusBottomLeft,
        borderBottomRightRadius:
          theme.comp.tree.selectedIndicatorShapeBorderRadiusBottomRight,
      },
      //#endregion
    }
  },
  { name: 'tree' }
)
