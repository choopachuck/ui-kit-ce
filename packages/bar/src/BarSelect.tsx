'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Select, SelectProps, SingleSelectProps } from '@v-uik/select'
import { Direction, ElementSize, ComponentPropsWithRefFix } from '@v-uik/common'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'
import { BarSelectClasses as Classes } from './interfaces/classes'

const useStyles = createUseStyles((theme) => ({
  root: {},

  dark: {
    '& $button': {
      color: theme.comp.barSelect.colorTextDark,

      '& $buttonEmpty': {
        color: theme.comp.barSelect.placeholderColorTextDark,
      },

      '&::after': {
        borderColor: theme.comp.barSelect.colorBorderDark,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSelect.colorBackgroundDarkHover,

        '&::after': {
          borderColor: theme.comp.barSelect.colorBorderDarkHover,
        },
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSelect.colorShadowDarkFocus}`,
      },
    },

    '& $buttonArrowIcon': {
      color: theme.comp.barSelect.colorTextDark,
    },

    '& $list': {
      backgroundColor: theme.comp.barSelect.listColorBackgroundDark,
      border: `1px solid ${theme.comp.barSelect.listColorBorderDark}`,
    },

    '& $option': {
      color: theme.comp.barSelect.optionColorTextDark,

      '&:hover': {
        backgroundColor: theme.comp.barSelect.optionColorBackgroundDarkHover,
      },
    },

    '& $optionActive': {
      backgroundColor: theme.comp.barSelect.optionColorBackgroundDarkHover,
    },
  },

  light: {
    '& $button': {
      color: theme.comp.barSelect.colorTextLight,

      '& $buttonEmpty': {
        color: theme.comp.barSelect.placeholderColorTextLight,
      },

      '&::after': {
        borderColor: theme.comp.barSelect.colorBorderLight,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSelect.colorBackgroundLightHover,

        '&::after': {
          borderColor: theme.comp.barSelect.colorBorderLightHover,
        },
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSelect.colorShadowLightFocus}`,
      },
    },

    '& $buttonArrowIcon': {
      color: theme.comp.barSelect.colorTextLight,
    },

    '& $list': {
      backgroundColor: theme.comp.barSelect.listColorBackgroundLight,
      border: `1px solid ${theme.comp.barSelect.listColorBorderLight}`,
    },

    '& $option': {
      color: theme.comp.barSelect.optionColorTextLight,

      '&:hover': {
        backgroundColor: theme.comp.barSelect.optionColorBackgroundLightHover,
      },
    },

    '& $optionActive': {
      backgroundColor: theme.comp.barSelect.optionColorBackgroundLightHover,
    },
  },

  primary: {
    '& $button': {
      color: theme.comp.barSelect.colorTextPrimary,

      '& $buttonEmpty': {
        color: theme.comp.barSelect.placeholderColorTextPrimary,
      },

      '&::after': {
        borderColor: theme.comp.barSelect.colorBorderPrimary,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSelect.colorBackgroundPrimaryHover,

        '&::after': {
          borderColor: theme.comp.barSelect.colorBorderPrimaryHover,
        },
      },

      '&:focus-visible': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSelect.colorShadowPrimaryFocus}`,
      },
    },

    '& $buttonArrowIcon': {
      color: theme.comp.barSelect.colorTextPrimary,
    },

    '& $list': {
      backgroundColor: theme.comp.barSelect.listColorBackgroundPrimary,
      border: `1px solid ${theme.comp.barSelect.listColorBorderPrimary}`,
    },

    '& $option': {
      color: theme.comp.barSelect.optionColorTextPrimary,

      '&:hover': {
        backgroundColor: theme.comp.barSelect.optionColorBackgroundPrimaryHover,
      },
    },

    '& $optionActive': {
      backgroundColor: theme.comp.barSelect.optionColorBackgroundPrimaryHover,
    },
  },
  vertical: {
    '& $button': {
      '&$barSelectButton': {
        padding: [8, 16],
      },
      '&::after': {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      },
    },
  },

  button: {
    backgroundColor: 'transparent',

    '&::after': {
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },

    //locking button styles to md so size prop applies only to list and options
    '&$barSelectButton': {
      padding: [12, 16],
      borderTopLeftRadius: theme.comp.barSelect.inputShapeBorderRadiusTopLeft,
      borderTopRightRadius: theme.comp.barSelect.inputShapeBorderRadiusTopRight,
      borderBottomLeftRadius:
        theme.comp.barSelect.inputShapeBorderRadiusBottomLeft,
      borderBottomRightRadius:
        theme.comp.barSelect.inputShapeBorderRadiusBottomRight,

      '& $buttonArrowIcon': {
        width: 24,
        height: 24,
      },
    },
  },

  barSelectButton: {},

  buttonEmpty: {},

  buttonArrowIcon: {},

  list: {
    borderTopLeftRadius: theme.comp.barSelect.listShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.barSelect.listShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.barSelect.listShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.barSelect.listShapeBorderRadiusBottomRightMd,

    '&$small': {
      borderTopLeftRadius: theme.comp.barSelect.listShapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.barSelect.listShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.barSelect.listShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.barSelect.listShapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      borderTopLeftRadius: theme.comp.barSelect.listShapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.barSelect.listShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.barSelect.listShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.barSelect.listShapeBorderRadiusBottomRightLg,
    },
  },

  option: {
    borderTopLeftRadius: theme.comp.barSelect.optionShapeBorderRadiusTopLeftMd,
    borderTopRightRadius:
      theme.comp.barSelect.optionShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.barSelect.optionShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.barSelect.optionShapeBorderRadiusBottomRightMd,
  },

  optionActive: {},

  small: {
    '& $option': {
      borderTopLeftRadius:
        theme.comp.barSelect.optionShapeBorderRadiusTopLeftSm,
      borderTopRightRadius:
        theme.comp.barSelect.optionShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.barSelect.optionShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.barSelect.optionShapeBorderRadiusBottomRightSm,
    },
  },

  large: {
    '& $option': {
      borderTopLeftRadius:
        theme.comp.barSelect.optionShapeBorderRadiusTopLeftLg,
      borderTopRightRadius:
        theme.comp.barSelect.optionShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.barSelect.optionShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.barSelect.optionShapeBorderRadiusBottomRightLg,
    },
  },
}))

export interface BarSelectProps<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Список опций
   */
  options?: SelectProps<ListElement, ListItemElement>['options']
  /**
   * Текущее значение
   */
  value?: SingleSelectProps['value']
  /**
   * Обработчик изменения значения
   */
  onChange?: SingleSelectProps['onChange']
  /**
   * Свойства компонента Select
   */
  selectProps?: SelectProps<ListElement, ListItemElement>
}

const defaultListElement = 'ul'
const defaultListItemElement = 'li'

export const BarSelect = React.forwardRef(
  <
    ListElement extends React.ElementType = typeof defaultListElement,
    ListItemElement extends React.ElementType = typeof defaultListItemElement
  >(
    {
      classes,
      className: classNameProp,
      options,
      value,
      onChange,
      selectProps,
      ...rest
    }: BarSelectProps<ListElement, ListItemElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const isVertical = barContext.direction === Direction.vertical

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const className = clsx(classesMap.root, classNameProp, {
      [classesMap.dark]: DarkColors.includes(barContext.kind),
      [classesMap.light]: LightColors.includes(barContext.kind),
      [classesMap.primary]: barContext.kind === BarKinds.primary,
      [classesMap.vertical]: isVertical,
    })

    const selectClasses: SelectProps<ListElement, ListItemElement>['classes'] =
      {
        ...selectProps?.classes,
        button: clsx(
          classesMap.button,
          selectProps?.classes?.button,
          classesMap.barSelectButton
        ),
        buttonEmpty: clsx(
          classesMap.buttonEmpty,
          selectProps?.classes?.buttonEmpty
        ),
        buttonArrowIcon: clsx(
          classesMap.buttonArrowIcon,
          selectProps?.classes?.buttonArrowIcon
        ),
        list: clsx(classesMap.list, selectProps?.classes?.list, {
          [classesList.small]: selectProps?.size === ElementSize.sm,
          [classesList.large]: selectProps?.size === ElementSize.lg,
        }),
        option: clsx(classesMap.option, selectProps?.classes?.option),
        optionActive: clsx(
          classesMap.optionActive,
          selectProps?.classes?.optionActive
        ),
      }

    const dropdownProps: Partial<
      SelectProps<ListElement, ListItemElement>['dropdownProps']
    > = {
      ...selectProps?.dropdownProps,
      disablePortal: true,
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <Select
          {...selectProps}
          classes={selectClasses}
          dropdownProps={dropdownProps}
          options={options}
          value={value}
          multiple={false}
          onChange={onChange}
        />
      </div>
    )
  }
) as <
  ListElement extends React.ElementType = typeof defaultListElement,
  ListItemElement extends React.ElementType = typeof defaultListItemElement
>(
  props: BarSelectProps<ListElement, ListItemElement>
) => JSX.Element
