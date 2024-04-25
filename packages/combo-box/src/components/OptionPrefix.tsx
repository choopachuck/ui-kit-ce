import React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { CheckboxProps } from '@v-uik/checkbox'

export type OptionPrefixComponents = {
  MultiCheckbox: React.ComponentType<CheckboxProps> | null
}

export type OptionPrefixProps<Option> = {
  option: Option
  multiple?: boolean
  selected?: boolean
  disabled?: boolean
  creating?: boolean
  components?: OptionPrefixComponents
  customOptionPrefix?: React.ReactNode
}

const useStyles = createUseStyles({
  checkbox: {
    marginRight: 11,
  },
})

export const OptionPrefix = <Option,>({
  selected,
  multiple,
  disabled,
  creating,
  customOptionPrefix,
  components,
}: OptionPrefixProps<Option>): JSX.Element => {
  const MultiCheckbox = components?.MultiCheckbox
  const classList = useStyles()

  const props: CheckboxProps = {
    disabled,
    checked: selected,
    className: clsx({
      [classList.checkbox]: !!customOptionPrefix,
    }),
  }

  if (multiple && !creating) {
    return (
      <>
        {MultiCheckbox && <MultiCheckbox {...props} />}
        {customOptionPrefix}
      </>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{customOptionPrefix}</>
}
