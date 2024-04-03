'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { useText } from '@v-uik/typography'
import type { TagClasses } from './interfaces'
import { TTagElementSizeType, TagElementSize } from './TTagElementSizeType'
import type { TagComponentsConfig } from './components'
import { getComponents } from './components'

export const TagKinds = {
  lite: 'lite',
  secondary: 'secondary',
  primary: 'primary',
  color: 'color',
} as const

export type TTagKinds = keyof typeof TagKinds

export const TagColor = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  azure: 'azure',
  blue: 'blue',
  violet: 'violet',
  gray: 'gray',
} as const

export type TTagColor = keyof typeof TagColor

export interface CommonProps extends React.ComponentPropsWithRef<'button'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<TagClasses>
  /**
   * Размер тэга
   */
  size?: TTagElementSizeType
  /**
   * Свойство для переопределения элементов Tag
   */
  components?: TagComponentsConfig
}

/**
 * Свойства компонента в зависимости от типа Тега
 */
type TruncateProps =
  | {
      /**
       * Тип тега, по умолчанию lite
       */
      kind?: Exclude<TTagKinds, 'color'>
      /**
       * Обработчик, вызываемый при удалении тега
       */
      onDelete?: (
        event:
          | React.MouseEvent<HTMLSpanElement>
          | React.KeyboardEvent<HTMLSpanElement>
      ) => void
      /**
       * Обработчик, вызываемый при клике на тэг
       */
      onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
      /**
       * Свойство определяющее состояние тега: выбран или нет. Неактуален для типа 'color'
       */
      selected?: boolean
      /**
       * Свойство определяющее цвет тега. Актуален только для типа 'color'
       */
      color?: never
      /**
       * Свойство определяющее состояния тега во время его перемещения. Реализован только класс. Неактуален для типа 'color'
       */
      dragged?: boolean
    }
  | {
      kind: Extract<TTagKinds, 'color'>
      onDelete?: never
      onClick?: never
      color?: TTagColor
      selected?: never
      dragged?: never
    }

export type TagProps = CommonProps & TruncateProps

const useStyles = createUseStyles((theme) => ({
  tag: {
    position: 'relative',
    maxWidth: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    boxShadow: 'none',
    textAlign: 'center',
    borderTopLeftRadius: theme.comp.tag.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.tag.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.tag.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.tag.shapeBorderRadiusBottomRight,

    '&:disabled': {
      pointerEvents: 'none',
      cursor: 'default',
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
      borderStyle: theme.shape.borderStyle,
      borderWidth: theme.shape.borderWidth,
    },
  },

  lite: {
    color: theme.comp.tag.colorTextLite,

    '&::after': {
      borderColor: theme.comp.tag.colorBorderLite,
    },

    '&$clickable': {
      '&:focus-visible': {
        backgroundColor: theme.comp.tag.colorBackgroundLiteFocus,
      },

      '&:hover': {
        backgroundColor: theme.comp.tag.colorBackgroundLiteHover,
      },

      '&:active': {
        backgroundColor: theme.comp.tag.colorBackgroundLiteActive,
      },
    },

    '&:disabled': {
      color: theme.comp.tag.colorTextLiteDisabled,

      '&::after': {
        borderColor: theme.comp.tag.colorBorderLiteDisabled,
      },
    },

    '&$dragged': {
      backgroundColor: theme.comp.tag.colorBackgroundLiteDragged,

      '&::after': {
        borderColor: theme.comp.tag.colorBorderLiteDragged,
      },
    },

    '& $closeButton': {
      '&:hover': {
        backgroundColor: theme.comp.tag.closeButtonColorBackgroundLiteHover,
      },

      '&:active': {
        backgroundColor: theme.comp.tag.closeButtonColorBackgroundLiteActive,
      },
    },

    '&$selected': {
      backgroundColor: theme.comp.tag.colorBackgroundLiteSelected,

      '&:disabled': {
        color: theme.comp.tag.colorTextLiteSelectedDisabled,
        backgroundColor: theme.comp.tag.colorBackgroundLiteSelectedDisabled,
      },

      '&$dragged': {
        backgroundColor: theme.comp.tag.colorBackgroundLiteSelectedDragged,
      },

      '& $closeButton': {
        '&:hover': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundLiteSelectedHover,
        },

        '&:active': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundLiteSelectedActive,
        },
      },
    },
  },

  secondary: {
    color: theme.comp.tag.colorTextSecondary,

    '&::after': {
      borderColor: theme.comp.tag.colorBorderSecondary,
    },

    '&$clickable': {
      '&:focus-visible': {
        color: theme.comp.tag.colorTextSecondaryFocus,
        backgroundColor: theme.comp.tag.colorBackgroundSecondaryFocus,
      },

      '&:hover': {
        color: theme.comp.tag.colorTextSecondaryHover,
        backgroundColor: theme.comp.tag.colorBackgroundSecondaryHover,
      },

      '&:active': {
        color: theme.comp.tag.colorTextSecondaryActive,
        backgroundColor: theme.comp.tag.colorBackgroundSecondaryActive,
      },
    },

    '&:disabled': {
      color: theme.comp.tag.colorTextSecondaryDisabled,

      '&::after': {
        borderColor: theme.comp.tag.colorBorderSecondaryDisabled,
      },
    },

    '&$dragged': {
      color: theme.comp.tag.colorTextSecondaryDragged,
      backgroundColor: theme.comp.tag.colorBackgroundSecondaryDragged,

      '&::after': {
        borderWidth: 0,
      },
    },

    '& $closeButton': {
      '&:hover': {
        backgroundColor:
          theme.comp.tag.closeButtonColorBackgroundSecondaryHover,
      },

      '&:active': {
        backgroundColor:
          theme.comp.tag.closeButtonColorBackgroundSecondaryActive,
      },
    },

    '&$selected': {
      color: theme.comp.tag.colorTextSecondarySelected,
      backgroundColor: theme.comp.tag.colorBackgroundSecondarySelected,

      '&:disabled': {
        backgroundColor:
          theme.comp.tag.colorBackgroundSecondarySelectedDisabled,
      },

      '&$dragged': {
        backgroundColor: theme.comp.tag.colorBackgroundSecondarySelectedDragged,
      },

      '& $closeButton': {
        '&:hover': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundSecondarySelectedHover,
        },

        '&:active': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundSecondarySelectedActive,
        },
      },
    },
  },

  primary: {
    color: theme.comp.tag.colorTextPrimary,

    '::after': {
      borderColor: theme.comp.tag.colorBorderPrimary,
    },

    '&$clickable': {
      '&:focus-visible': {
        color: theme.comp.tag.colorTextPrimaryFocus,
        backgroundColor: theme.comp.tag.colorBackgroundPrimaryFocus,
      },

      '&:hover': {
        color: theme.comp.tag.colorTextPrimaryHover,
        backgroundColor: theme.comp.tag.colorBackgroundPrimaryHover,
      },

      '&:active': {
        color: theme.comp.tag.colorTextPrimaryActive,
        backgroundColor: theme.comp.tag.colorBackgroundPrimaryActive,
      },
    },

    '&:disabled': {
      color: theme.comp.tag.colorTextPrimaryDisabled,

      '&::after': {
        borderColor: theme.comp.tag.colorBorderPrimaryDisabled,
      },
    },

    '&$dragged': {
      color: theme.comp.tag.colorTextPrimaryDragged,
      backgroundColor: theme.comp.tag.colorBackgroundPrimaryDragged,

      '&::after': {
        borderWidth: 0,
      },
    },

    '& $closeButton': {
      '&:hover': {
        backgroundColor: theme.comp.tag.closeButtonColorBackgroundPrimaryHover,
      },

      '&:active': {
        backgroundColor: theme.comp.tag.closeButtonColorBackgroundPrimaryActive,
      },
    },

    '&$selected': {
      color: theme.comp.tag.colorTextPrimarySelected,
      backgroundColor: theme.comp.tag.colorBackgroundPrimarySelected,

      '&:disabled': {
        backgroundColor: theme.comp.tag.colorBackgroundPrimarySelectedDisabled,
      },

      '&$dragged': {
        backgroundColor: theme.comp.tag.colorBackgroundPrimarySelectedDragged,
      },

      '& $closeButton': {
        '&:hover': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundPrimarySelectedHover,
        },

        '&:active': {
          backgroundColor:
            theme.comp.tag.closeButtonColorBackgroundPrimarySelectedActive,
        },
      },
    },
  },

  color: {
    '&::after': {
      borderWidth: 0,
    },
  },

  red: {
    color: theme.comp.tag.colorTextRed,
    backgroundColor: theme.comp.tag.colorBackgroundRed,
  },

  yellow: {
    color: theme.comp.tag.colorTextYellow,
    backgroundColor: theme.comp.tag.colorBackgroundYellow,
  },

  green: {
    color: theme.comp.tag.colorTextGreen,
    backgroundColor: theme.comp.tag.colorBackgroundGreen,
  },

  azure: {
    color: theme.comp.tag.colorTextAzure,
    backgroundColor: theme.comp.tag.colorBackgroundAzure,
  },

  blue: {
    color: theme.comp.tag.colorTextBlue,
    backgroundColor: theme.comp.tag.colorBackgroundBlue,
  },

  violet: {
    color: theme.comp.tag.colorTextViolet,
    backgroundColor: theme.comp.tag.colorBackgroundViolet,
  },

  gray: {
    color: theme.comp.tag.colorTextGray,
    backgroundColor: theme.comp.tag.colorBackgroundGray,
  },

  extraSmall: {
    padding: [2, 8],
  },

  small: {
    padding: [2, 8],
  },

  medium: {
    padding: [6, 12],
  },

  large: {
    padding: [8, 16],
  },

  selected: {
    '&::after': {
      borderWidth: 0,
    },

    '&$clickable': {
      '&:focus': {
        '&::after': {
          borderWidth: theme.shape.borderWidth,
        },
      },
    },
  },

  clickable: {
    cursor: 'pointer',

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.tag.colorShadowFocus}`,

      '&::after': {
        borderColor: theme.comp.tag.colorBorderFocus,
      },

      '&:hover': {
        '&::after': {
          borderWidth: theme.shape.borderWidth,
        },
      },

      '&:active': {
        '&::after': {
          borderWidth: theme.shape.borderWidth,
        },
      },
    },

    '&:hover': {
      '&::after': {
        borderWidth: 0,
      },
    },

    '&:active': {
      '&::after': {
        borderWidth: 0,
      },
    },
  },

  dragged: {
    boxShadow: theme.comp.tag.elevationShadowDragged,
  },

  text: {
    fontFamily: theme.comp.tag.typographyFontFamily,
    fontWeight: theme.comp.tag.typographyFontWeight,
    letterSpacing: theme.comp.tag.typographyLetterSpacing,

    zIndex: 2,
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    flexWrap: 'nowrap',
  },

  textExtraSmall: {
    fontSize:
      theme.comp.tag.typographyFontSizeXs || theme.comp.tag.typographyFontSize,
    lineHeight:
      theme.comp.tag.typographyLineHeightXs ||
      theme.comp.tag.typographyLineHeight,
  },

  textSmall: {
    fontSize:
      theme.comp.tag.typographyFontSizeSm || theme.comp.tag.typographyFontSize,
    lineHeight:
      theme.comp.tag.typographyLineHeightSm ||
      theme.comp.tag.typographyLineHeight,
  },

  textMedium: {
    fontSize:
      theme.comp.tag.typographyFontSizeMd || theme.comp.tag.typographyFontSize,
    lineHeight:
      theme.comp.tag.typographyLineHeightMd ||
      theme.comp.tag.typographyLineHeight,
  },

  textLarge: {
    fontSize:
      theme.comp.tag.typographyFontSizeLg || theme.comp.tag.typographyFontSize,
    lineHeight:
      theme.comp.tag.typographyLineHeightLg ||
      theme.comp.tag.typographyLineHeight,
  },

  closeButton: {
    zIndex: 2,
    width: 16,
    height: 16,
    marginLeft: 4,
    display: 'flex',
    borderTopLeftRadius: theme.comp.tag.closeButtonShapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.tag.closeButtonShapeBorderRadiusTopRight,
    borderBottomLeftRadius:
      theme.comp.tag.closeButtonShapeBorderRadiusBottomLeft,
    borderBottomRightRadius:
      theme.comp.tag.closeButtonShapeBorderRadiusBottomRight,
    cursor: 'pointer',
  },
}))

export const Tag = React.forwardRef(
  (
    {
      classes,
      selected,
      className: classNameProp,
      kind = TagKinds.lite,
      color,
      size = TagElementSize.md,
      disabled,
      dragged,
      children,
      onDelete,
      onClick,
      components,
      ...rest
    }: TagProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const isColorTag = kind === TagKinds.color
    const isClickable = !isColorTag && !!onClick && !disabled

    const { DeleteIcon } = getComponents(components)

    const buttonClasses = useButtonReset()
    const { ellipsis } = useText()
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const isExtraSmall = size === TagElementSize.xs
    const isSmall = size === TagElementSize.sm
    const isMedium = size === TagElementSize.md
    const isLarge = size === TagElementSize.lg
    const className = clsx(
      classNameProp,
      buttonClasses.resetButton,
      classesMap.tag,
      {
        [classesMap.lite]: kind === TagKinds.lite,
        [classesMap.secondary]: kind === TagKinds.secondary,
        [classesMap.primary]: kind === TagKinds.primary,
        [classesMap.color]: kind === TagKinds.color,
        [classesMap.red]: isColorTag && color === TagColor.red,
        [classesMap.yellow]: isColorTag && color === TagColor.yellow,
        [classesMap.green]: isColorTag && color === TagColor.green,
        [classesMap.azure]: isColorTag && color === TagColor.azure,
        [classesMap.blue]: isColorTag && color === TagColor.blue,
        [classesMap.violet]: isColorTag && color === TagColor.violet,
        [classesMap.gray]: isColorTag && color === TagColor.gray,
        [classesMap.extraSmall]: isExtraSmall,
        [classesMap.small]: isSmall,
        [classesMap.medium]: isMedium,
        [classesMap.large]: isLarge,
        [classesMap.selected]: !isColorTag && selected,
        [classesMap.clickable]: isClickable,
        [classesMap.dragged]: !isColorTag && dragged,
      }
    )

    const textClassName = clsx(ellipsis, classesMap.text, {
      [classesMap.textExtraSmall]: isExtraSmall,
      [classesMap.textSmall]: isSmall,
      [classesMap.textMedium]: isMedium,
      [classesMap.textLarge]: isLarge,
    })

    const handleDeleteIconClick = (
      event: React.MouseEvent<HTMLSpanElement>
    ) => {
      // Stop the event from bubbling up to the `Tag`
      event.stopPropagation()
      if (onDelete) {
        onDelete(event)
      }
    }

    const handleOnKeyDownBackSpace = React.useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
          onDelete?.(e)
        }
      },
      [onDelete]
    )

    return (
      <button
        {...rest}
        ref={ref}
        tabIndex={isClickable ? 0 : -1}
        disabled={disabled}
        type="button"
        className={className}
        onKeyDown={handleOnKeyDownBackSpace}
        onClick={onClick}
      >
        <span className={textClassName}>{children}</span>
        {!isColorTag && onDelete && (
          <span
            role="button"
            tabIndex={-1}
            className={clsx(classesMap.deleteButton, classesMap.closeButton)}
            onClick={handleDeleteIconClick}
          >
            <DeleteIcon />
          </span>
        )}
      </button>
    )
  }
)
