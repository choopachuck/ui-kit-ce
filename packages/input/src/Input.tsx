'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Labelled, LabelledProps } from '@v-uik/labelled'
import { ElementSize, ClearButtonProps } from '@v-uik/common'
import { InputBase, InputBaseProps } from './InputBase'
import { getTextLength } from '@v-uik/utils'
import { Classes } from './classes'

export interface InputProps<TCanClear extends boolean = boolean>
  extends Omit<InputBaseProps<TCanClear>, 'onFocusChange'>,
    Omit<LabelledProps, 'children' | 'classes'> {
  /**
   * Список классов
   */
  classes?: Partial<Classes> & Partial<ClearButtonProps['classes']>
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
  /**
   * Показывать ли счетчик введенных символов
   */
  showCount?: boolean
}

const useStyles = createUseStyles({
  container: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'end',
  },

  fullWidth: {
    width: '100%',
  },
})

const _Input = React.forwardRef(
  <TCanClear extends boolean = boolean>(
    {
      classes,
      className,
      label,
      labelProps,
      value,
      onChange,
      placeholder,
      inputProps,
      inputRef: inputRefProp,
      helperText,
      helperTextProps,
      fullWidth,
      disabled,
      error,
      size = ElementSize.md,
      prefix,
      suffix,
      showErrorIcon = true,
      errorIconTooltipProps,
      showCount,
      labelledClasses,
      description,
      keepHelperTextMinHeight,
      required,
      clearIcon,
      onClear,
      canClear,
      clearButtonInnerProps,
      ellipsis,
      ...rest
    }: InputProps<TCanClear>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [focused, setFocused] = React.useState(false)

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const containerClassName = clsx(classesMap.container, className, {
      [classesMap.fullWidth]: fullWidth,
      [classesMap?.disabled ?? '']: disabled,
      [classesMap?.error ?? '']: error,
      [classesMap?.focused ?? '']: focused,
      [classesMap?.small ?? '']: size === ElementSize.sm,
      [classesMap?.medium ?? '']: size === ElementSize.md,
      [classesMap?.large ?? '']: size === ElementSize.lg,
    })
    const inputBaseClasses = classes
      ? {
          root: classesMap?.inputContainer,
          input: classesMap?.input,
          inputSmall: classesMap?.inputSmall,
          inputMedium: classesMap?.inputMedium,
          inputLarge: classesMap?.inputLarge,
          prefix: classesMap?.prefix,
          suffix: classesMap?.suffix,
          clearButton: classesMap?.clearButton,
          inputClear: classesMap?.inputClear,
        }
      : undefined

    const labelSuffix = React.useMemo(() => {
      return showCount ? getTextLength(value, inputProps?.maxLength) : undefined
    }, [showCount, value, inputProps?.maxLength])

    return (
      <div {...rest} ref={ref} className={containerClassName}>
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label || showCount}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          disabled={disabled}
          labelProps={{
            ...labelProps,
            suffix: labelSuffix,
          }}
          error={error}
          helperTextProps={helperTextProps}
        >
          <InputBase
            classes={inputBaseClasses}
            prefix={prefix}
            suffix={suffix}
            inputRef={inputRefProp}
            inputProps={inputProps}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            fullWidth={fullWidth}
            error={error}
            showErrorIcon={showErrorIcon}
            errorIconTooltipProps={errorIconTooltipProps}
            value={value}
            clearIcon={clearIcon}
            canClear={canClear}
            clearButtonInnerProps={clearButtonInnerProps}
            ellipsis={ellipsis}
            onChange={onChange}
            onFocusChange={setFocused}
            onClear={onClear}
          />
        </Labelled>
      </div>
    )
  }
)

export const Input = _Input as <TCanClear extends boolean = boolean>(
  props: InputProps<TCanClear> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement
