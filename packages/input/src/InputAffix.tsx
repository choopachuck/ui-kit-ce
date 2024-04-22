'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export const InputAffixType = {
  prefix: 'prefix',
  suffix: 'suffix',
} as const

export type TInputAffixType = keyof typeof InputAffixType

export interface InputAffixProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * Тип аффикса
   */
  type?: TInputAffixType
  /**
   * Отключен ли инпут
   */
  disabled?: boolean
}

const useStyles = createUseStyles((theme) => ({
  affix: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    cursor: 'default',
    zIndex: 2,

    '&$disabled': {
      cursor: 'not-allowed',
    },
  },

  disabled: {},

  prefix: {
    color: theme.comp.input.prefixColorText,
    marginRight: 8,

    '&$disabled': {
      color: theme.comp.input.prefixColorTextDisabled,
    },
  },

  suffix: {
    color: theme.comp.input.suffixColorText,
    marginLeft: 8,

    '&$disabled': {
      color: theme.comp.input.suffixColorTextDisabled,
    },
  },
}))

export const InputAffix: React.FC<InputAffixProps> = ({
  className: classNameProp,
  type = InputAffixType.prefix,
  disabled,
  children,
  ...rest
}: InputAffixProps) => {
  const classesList = useStyles()
  const className = clsx(classesList.affix, classNameProp, {
    [classesList.disabled]: disabled,
    [classesList.prefix]: type === InputAffixType.prefix,
    [classesList.suffix]: type === InputAffixType.suffix,
  })

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  )
}
