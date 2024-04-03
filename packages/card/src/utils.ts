import { ButtonAriaActionEventHandler } from '@v-uik/hooks'
import { isSelectable, isClickable, CardProps, KindProps } from './types'

export const getInputProps = (
  props: KindProps
): React.HTMLProps<HTMLInputElement> | undefined => {
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
  | (Omit<React.HTMLProps<HTMLDivElement>, 'onClick'> & {
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

export const getOmittedParams = (props: CardProps) => {
  if (isSelectable(props)) {
    return ['checked', 'onChange', 'inputProps', 'kind', 'disabled']
  } else if (isClickable(props)) {
    return ['kind', 'buttonProps', 'onClick', 'disabled']
  }

  return ['kind']
}
