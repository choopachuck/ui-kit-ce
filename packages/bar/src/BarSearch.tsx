'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { InputBase, InputBaseProps } from '@v-uik/input'
import { Direction } from '@v-uik/common'
import { SearchIcon } from './assets/SearchIcon'
import { BarContext } from './BarContext'
import { BarKinds, DarkColors, LightColors } from './constants'
import { BarSearchClasses as Classes } from './interfaces/classes'

const useStyles = createUseStyles((theme) => ({
  root: {
    '& $disabled': {
      backgroundColor: 'transparent',
    },
  },

  dark: {
    '& $disabled': {
      '&$inputContainer': {
        color: theme.comp.barSearch.inputColorTextDarkDisabled,
      },
      '& $prefix': {
        color: theme.comp.barSearch.inputColorTextDarkDisabled,
      },

      '& $suffix': {
        color: theme.comp.barSearch.inputColorTextDarkDisabled,
      },

      '& $input': {
        '&::placeholder': {
          color: theme.comp.barSearch.inputColorTextDarkDisabled,
        },
      },
    },

    '& $inputContainer': {
      color: theme.comp.barSearch.inputColorTextDark,
      '&::after': {
        borderColor: theme.comp.barSearch.inputColorBorderDark,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSearch.inputColorBackgroundDarkHover,

        '&::after': {
          borderColor: theme.comp.barSearch.inputColorBorderDarkHover,
        },
      },

      '&$focused': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSearch.inputColorShadowDarkFocus}`,
      },
    },

    '& $input': {
      '&::placeholder': {
        color: theme.comp.barSearch.placeholderColorTextDark,
      },
    },

    '& $prefix': {
      color: theme.comp.barSearch.prefixColorTextDark,
    },

    '& $suffix': {
      color: theme.comp.barSearch.suffixColorTextDark,
    },
  },

  light: {
    '& $disabled': {
      '&$inputContainer': {
        color: theme.comp.barSearch.inputColorTextLightDisabled,
      },
      '& $prefix': {
        color: theme.comp.barSearch.inputColorTextLightDisabled,
      },

      '& $suffix': {
        color: theme.comp.barSearch.inputColorTextLightDisabled,
      },

      '& $input': {
        '&::placeholder': {
          color: theme.comp.barSearch.inputColorTextLightDisabled,
        },
      },
    },

    '& $inputContainer': {
      color: theme.comp.barSearch.inputColorTextLight,
      '&::after': {
        borderColor: theme.comp.barSearch.inputColorBorderLight,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSearch.inputColorBackgroundLightHover,

        '&::after': {
          borderColor: theme.comp.barSearch.inputColorBorderLightHover,
        },
      },

      '&$focused': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSearch.inputColorShadowLightFocus}`,
      },
    },

    '& $input': {
      '&::placeholder': {
        color: theme.comp.barSearch.placeholderColorTextLight,
      },
    },

    '& $prefix': {
      color: theme.comp.barSearch.prefixColorTextLight,
    },

    '& $suffix': {
      color: theme.comp.barSearch.suffixColorTextLight,
    },
  },

  primary: {
    '& $disabled': {
      '& $prefix': {
        color: theme.comp.barSearch.inputColorTextPrimaryDisabled,
      },

      '& $suffix': {
        color: theme.comp.barSearch.inputColorTextPrimaryDisabled,
      },

      '& $input': {
        color: theme.comp.barSearch.inputColorTextPrimaryDisabled,

        '&::placeholder': {
          color: theme.comp.barSearch.inputColorTextPrimaryDisabled,
        },
      },
    },

    '& $inputContainer': {
      '&::after': {
        borderColor: theme.comp.barSearch.inputColorBorderPrimary,
      },

      '&:hover': {
        backgroundColor: theme.comp.barSearch.inputColorBackgroundPrimaryHover,

        '&::after': {
          borderColor: theme.comp.barSearch.inputColorBorderPrimaryHover,
        },
      },

      '&$focused': {
        boxShadow: `inset 0 0 0 2px ${theme.comp.barSearch.inputColorShadowPrimaryFocus}`,
      },
    },

    '& $input': {
      color: theme.comp.barSearch.inputColorTextPrimary,

      '&::placeholder': {
        color: theme.comp.barSearch.placeholderColorTextPrimary,
      },
    },

    '& $prefix': {
      color: theme.comp.barSearch.prefixColorTextPrimary,
    },

    '& $suffix': {
      color: theme.comp.barSearch.suffixColorTextPrimary,
    },
  },

  vertical: {
    '& $inputContainer': {
      '&::after': {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
      },
    },

    '& $input': {
      margin: [8, 0],
    },
  },

  inputContainer: {
    borderTopLeftRadius: theme.comp.barSearch.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.barSearch.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.barSearch.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.barSearch.shapeBorderRadiusBottomRight,
    backgroundColor: 'transparent',

    '&::after': {
      borderTopWidth: 0,
      borderBottomWidth: 0,
    },
  },

  focused: {},

  input: {
    margin: [12, 0],
  },

  prefix: {},

  suffix: {},

  disabled: {},
}))

export interface BarSearchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Classes
  /**
   * Значение поля
   */
  value?: string
  /**
   * Обработчик изменения значения
   */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Свойства компонента InputBase
   */
  inputProps?: InputBaseProps
}

export const BarSearch = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      value,
      onChange,
      inputProps,
      ...rest
    }: BarSearchProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const barContext = React.useContext(BarContext)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const className = clsx(classesMap.root, classNameProp, {
      [classesMap.dark]: DarkColors.includes(barContext.kind),
      [classesMap.light]: LightColors.includes(barContext.kind),
      [classesMap.primary]: barContext.kind === BarKinds.primary,
      [classesMap.vertical]: barContext.direction === Direction.vertical,
    })

    const inputClasses: InputBaseProps['classes'] = {
      ...inputProps?.classes,
      root: clsx(inputProps?.classes?.root, classesMap.inputContainer),
      focused: clsx(inputProps?.classes?.focused, classesMap.focused),
      input: clsx(inputProps?.classes?.input, classesMap.input),
      prefix: clsx(inputProps?.classes?.prefix, classesMap.prefix),
      suffix: clsx(inputProps?.classes?.suffix, classesMap.suffix),
      disabled: classesMap.disabled,
    }

    return (
      <div {...rest} ref={ref} className={className}>
        <InputBase
          prefix={<SearchIcon />}
          {...inputProps}
          fullWidth
          classes={inputClasses}
          error={false}
          size={undefined}
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
)
