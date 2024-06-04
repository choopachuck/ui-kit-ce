import { ButtonAriaActionEventHandler } from '@v-uik/hooks'
import { isSelectable, isClickable, KindProps } from './types'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export const getInputProps = (
  props: KindProps
): ComponentPropsWithRefFix<'input'> | undefined => {
  if (!isSelectable(props)) {
    return undefined
  }

  return {
    checked: props.checked,
    onChange: props?.onChange,
    name: props.name,
    ...(props?.inputProps ?? {}),
  }
}

export const getClickableProps = (
  props: KindProps
):
  | (Omit<ComponentPropsWithRefFix<'div'>, 'onClick'> & {
      onClick?: ButtonAriaActionEventHandler<HTMLDivElement>
    })
  | undefined => {
  if (!isClickable(props)) {
    return undefined
  }

  return {
    ...props.buttonProps,
    onClick: props?.onClick,
  }
}

export const getOmittedParams = (props: KindProps) => {
  if (isSelectable(props)) {
    return ['checked', 'onChange', 'inputProps', 'kind', 'disabled']
  } else if (isClickable(props)) {
    return ['kind', 'buttonProps', 'onClick', 'disabled']
  }

  return ['kind']
}
