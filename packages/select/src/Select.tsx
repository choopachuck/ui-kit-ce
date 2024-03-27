'use client'

import * as React from 'react'
import { clsx, useTheme, createUseStyles } from '@v-uik/theme'
import { ElementSize } from '@v-uik/common'
import {
  useMergedRefs,
  useOutsideClick,
  useOutsideScroll,
  useOverscrollBehavior,
  useClassList,
  useGeneratedId,
  useBodyScrollLock,
} from '@v-uik/hooks'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { List, ListItem, ListItemProps, ListItemGroup } from '@v-uik/list'
import { useSelect } from './hooks'
import { SelectButton, SelectButtonProps } from './components'
import { SelectOptionIcon } from './assets/SelectOptionIcon'
import { BaseSelectProps, Option, Classes } from './interfaces'
import { isEqualKeyboardKeys, includesKeyboardKey } from '@v-uik/utils'
import { useSelectModifiers } from '@v-uik/popup'
import { Labelled } from '@v-uik/labelled'

const DEFAULT_OPTION_HEIGHT = 40

const getDynamicStyles = (props: SelectStyleProps) => ({
  list: {
    maxHeight: props.rows ? props.rows * DEFAULT_OPTION_HEIGHT : undefined,
  },
})

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
    width: '100%',
  },

  list: {
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    borderTopLeftRadius: theme.comp.select.listShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.select.listShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius: theme.comp.select.listShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.select.listShapeBorderRadiusBottomRightMd,

    '&$small': {
      borderTopLeftRadius: theme.comp.select.listShapeBorderRadiusTopLeftSm,
      borderTopRightRadius: theme.comp.select.listShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.select.listShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.select.listShapeBorderRadiusBottomRightSm,
    },

    '&$large': {
      borderTopLeftRadius: theme.comp.select.listShapeBorderRadiusTopLeftLg,
      borderTopRightRadius: theme.comp.select.listShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.select.listShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.select.listShapeBorderRadiusBottomRightLg,
    },
  },

  single: {
    backgroundColor: theme.comp.select.listColorBackground,
    boxShadow: theme.comp.select.listElevationShadow,
    border: `1px solid ${theme.comp.select.listColorBorder}`,
  },

  multiple: {
    maxHeight: 320,
    border: `1px solid ${theme.comp.select.listColorBorderMultiple}`,
  },

  option: {
    minWidth: 0,
    borderTopLeftRadius: theme.comp.select.optionShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.select.optionShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.select.optionShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.select.optionShapeBorderRadiusBottomRightMd,

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.comp.select.optionColorBackgroundHover,

      '&$optionDisabled': {
        cursor: 'default',
        backgroundColor: theme.comp.select.listColorBackground,
      },
    },
  },

  listError: {
    border: `1px solid ${theme.comp.select.listColorBorderMultipleError}`,
  },

  optionSelected: {
    backgroundColor: theme.comp.select.optionColorBackgroundSelected,
  },

  optionDisabled: {
    // Ставлю данное свойство для того, чтобы получать события от disabled-элемента
    pointerEvents: 'all',
  },

  optionActive: {
    backgroundColor: theme.comp.select.optionColorBackgroundHover,
  },

  small: {
    '& $option': {
      borderTopLeftRadius: theme.comp.select.optionShapeBorderRadiusTopLeftSm,
      borderTopRightRadius: theme.comp.select.optionShapeBorderRadiusTopRightSm,
      borderBottomLeftRadius:
        theme.comp.select.optionShapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.select.optionShapeBorderRadiusBottomRightSm,
    },
  },

  large: {
    '& $option': {
      borderTopLeftRadius: theme.comp.select.optionShapeBorderRadiusTopLeftLg,
      borderTopRightRadius: theme.comp.select.optionShapeBorderRadiusTopRightLg,
      borderBottomLeftRadius:
        theme.comp.select.optionShapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.select.optionShapeBorderRadiusBottomRightLg,
    },
  },

  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
  },
}))

type SelectStyleProps = {
  rows?: number
}

export type SingleSelectProps = {
  /**
   * Текущее значение
   */
  value?: string
  /**
   * Обработчик события выбора опции
   */
  onChange?(
    value: string,
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>
  ): void
  /**
   * Включить мультивыбор
   */
  multiple?: false
  /**
   * Пропсы для SelectButton
   */
  selectButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
}

export type MultiSelectProps = {
  value?: string[]
  onChange?(
    value: string[],
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>
  ): void
  multiple: true
  /**
   * Пропсы для SelectButton
   */
  selectButtonProps?: never
}

type TruncateProps = SingleSelectProps | MultiSelectProps

export type SelectProps<
  T extends React.ElementType,
  A extends React.ElementType
> = BaseSelectProps<T, A> &
  TruncateProps & {
    /**
     * JSS-классы для стилизации
     */
    classes?: Partial<Classes>
  }

const defaultListElement = 'ul'
const defaultListItemElement = 'li'

const ARROWS_KEYS = ['ArrowUp', 'ArrowDown']
const SUBMIT_KEYS = [' ', 'Enter']

export const Select = React.forwardRef(
  <
    ListElement extends React.ElementType = typeof defaultListElement,
    ListItemElement extends React.ElementType = typeof defaultListItemElement
  >(
    {
      classes,
      className: classNameProp,
      value,
      options = [],
      onChange,
      onKeyDown,
      limitByWidth,
      size = ElementSize.md,
      error,
      showErrorIcon = true,
      errorIconTooltipProps,
      dropdownProps,
      listProps,
      disabled,
      multiple = false,
      rows,
      label,
      labelProps,
      helperText,
      helperTextProps,
      groupBy,
      selectButtonProps = {},
      hideDropdownOnOutsideScroll = true,
      placeholder,
      description,
      labelledClasses,
      keepHelperTextMinHeight,
      required,
      ...rest
    }: SelectProps<ListElement, ListItemElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const theme = useTheme()

    const classesList = useStyles()

    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap?.small ?? '']: size === ElementSize.sm,
      [classesMap?.large ?? '']: size === ElementSize.lg,
      [classesMap?.error ?? '']: error,
    })
    const buttonClasses: SelectButtonProps['classes'] = classes
      ? {
          button: classesMap?.button,
          empty: classesMap?.buttonEmpty,
          content: classesMap?.buttonContent,
          text: classesMap?.buttonText,
          errorIcon: classesMap?.buttonErrorIcon,
          arrowIcon: classesMap?.buttonArrowIcon,
        }
      : undefined
    const listItemClasses: ListItemProps<ListItemElement>['classes'] = {
      disabled: classesMap.optionDisabled,
    }

    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const popupRef = React.useRef<HTMLDivElement | null>(null)

    const {
      groupedOptions,
      findEnabledOptionIndex,
      selectedOption,
      indexOfSelected,
      listRef,
      handleChangeValues,
      active,
      setActive,
      handleChangeActive,
    } = useSelect({
      groupBy,
      options,
      multiple,
      value,
    })

    const popperOptions: DropdownProps['popperOptions'] = {
      strategy: 'fixed',
      ...dropdownProps?.popperOptions,
    }

    const [isOpen, setIsOpen] = React.useState(false)

    const renderSelectButtonText = () => {
      if (
        placeholder &&
        (!selectedOption ||
          (!Array.isArray(selectedOption) && !selectedOption.value))
      ) {
        return placeholder
      }

      if (!Array.isArray(selectedOption) && selectedOption?.label) {
        return selectedOption?.label
      }
    }

    const popupModifiers = useSelectModifiers<ListItemElement>({
      modifiers: dropdownProps?.modifiers,
      limitByWidth,
      indexOfSelected: indexOfSelected.current,
      activeOption: active as ListItemElement,
      isOpened: isOpen,
      rows,
      //в режиме абсолютного позиционирования ломается логика расчёта сдвига, так что пока просто делаем как в комбобоксе
      openUnderAnchor: popperOptions.strategy !== 'fixed',
      enableFlip: popperOptions.strategy !== 'fixed',
      maxLength: options.length,
    })

    /* -------------------------------------------------------------------- */
    /* -----------------------Открытие/ закрытие--------------------------- */
    /* -------------------------------------------------------------------- */
    const close = React.useCallback(() => setIsOpen(false), [])
    const toggleOpen = () => setIsOpen(!isOpen)

    /* -------------------------------------------------------------------- */
    /* -----------------------Отрисовка children--------------------------- */
    /* -------------------------------------------------------------------- */
    const handleChange = (
      option: Option<ListItemElement>,
      e: React.MouseEvent<HTMLElement>
    ) => {
      let temp

      if (multiple) {
        indexOfSelected.current = undefined
        temp = handleChangeValues(option)
        indexOfSelected.current = options.indexOf(option)
      } else {
        temp = option.value
      }

      // @ts-ignore исправить позже
      onChange?.(temp, e)
      close()

      // при закрытии возвращаем фокус на кнопку
      if (buttonRef.current) {
        buttonRef.current.focus()
      }
    }

    const refOverscrollBehavior = useOverscrollBehavior<HTMLElement>()

    const mergedListRef = useMergedRefs([listRef, refOverscrollBehavior])

    /* -------------------------------------------------------------------- */
    /* -----------------------Событие вне селекта-------------------------- */
    /* -------------------------------------------------------------------- */
    const refOutsideClick = useOutsideClick(close)
    const refOutsideScroll = useOutsideScroll(close)

    const { lockOnMountNodeRef } = useBodyScrollLock()

    const mergedPopupRefs = useMergedRefs([
      popupRef,
      refOutsideClick,
      !hideDropdownOnOutsideScroll
        ? (lockOnMountNodeRef as (instance: HTMLDivElement | null) => void)
        : null,
    ])

    const mergedButtonRefs = useMergedRefs([
      buttonRef,
      hideDropdownOnOutsideScroll ? refOutsideScroll : null,
    ])

    React.useEffect(() => {
      if (!isOpen) {
        setActive(selectedOption)
      }
    }, [isOpen, selectedOption, setActive])

    /* -------------------------------------------------------------------- */
    /* ----------------------Управление с клавиатуры----------------------- */
    /* -------------------------------------------------------------------- */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        isEqualKeyboardKeys('Tab', e.key) ||
        isEqualKeyboardKeys('Escape', e.key)
      ) {
        if (isOpen) {
          close()
        }
      }

      if (SUBMIT_KEYS.includes(e.key)) {
        if (isOpen && active && active !== selectedOption) {
          e.preventDefault()
          let temp
          if (multiple) {
            temp = handleChangeValues(active)
          } else {
            temp = active.value as string
          }
          // @ts-ignore исправить позже
          onChange?.(temp, e)
          close()

          // при закрытии возвращаем фокус на кнопку
          if (buttonRef.current) {
            buttonRef.current.focus()
          }
        } else {
          toggleOpen()
        }
      }

      if (includesKeyboardKey(ARROWS_KEYS, e.key)) {
        e.preventDefault()

        if (!isOpen) {
          toggleOpen()
        } else {
          const currIndex = options.indexOf(active as Option<ListItemElement>)

          const nextIndex = findEnabledOptionIndex(
            currIndex,
            isEqualKeyboardKeys('ArrowUp', e.key)
          )
          handleChangeActive(options[nextIndex])
        }
      }

      onKeyDown?.(e)
    }

    /* -------------------------------------------------------------------- */
    /* ------------------Управление фокусом мультиселекта------------------ */
    /* -------------------------------------------------------------------- */
    const handleFocus = () => {
      if (listRef.current && multiple) {
        listRef.current.style.boxShadow = `0 0 0 2px ${theme.comp.select.listColorShadowMultipleFocus}`
        listRef.current.style.borderColor = 'transparent'
      }
    }

    const handleBlur = () => {
      if (listRef.current && multiple) {
        listRef.current.style.boxShadow = ''
        listRef.current.style.borderColor = error
          ? theme.comp.select.listColorBorderMultipleError
          : theme.comp.select.listColorBorderMultiple
      }
    }
    const helperTextId = useGeneratedId(helperTextProps?.id)

    const preventOnKeyDownSpace: React.KeyboardEventHandler<HTMLButtonElement> =
      React.useCallback((e) => {
        if (e.code === 'Space') {
          e.preventDefault()
        }
      }, [])

    const listItemBaseId = useGeneratedId()

    /**
     * Функция для генерации ID шника для свойства aria-activedescendant
     * @param value
     */
    const createAriaActiveDescendantId = (value: string): string =>
      `${listItemBaseId as string}-option-${value}`

    const renderListOption = (option: Option<ListItemElement>) => {
      const {
        value: optionValue,
        label,
        disabled: optionDisabled,
        ...restOptionProps
      } = option

      let isSelected: boolean
      const isOptionDisabled = optionDisabled || disabled

      // id нужен для aria-activedescendant
      const listId = createAriaActiveDescendantId(optionValue)

      if (multiple) {
        isSelected = value?.indexOf(optionValue) !== -1
      } else {
        isSelected = optionValue === value
      }

      const handleOptionMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        // это здесь для того, что не срабатывал onblur после выбора элемента
        e.preventDefault()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        restOptionProps?.onMouseDown?.(e)
      }

      const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!isOptionDisabled) {
          handleChange(option, e)
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        restOptionProps?.onClick?.(e)
      }

      const onMouseEnter = () => setActive(option)

      return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ListItem<ListItemElement>
          key={optionValue}
          id={listId}
          suffix={isSelected ? <SelectOptionIcon /> : undefined}
          selected={isSelected}
          aria-selected={isSelected}
          role="option"
          disabled={isOptionDisabled}
          {...restOptionProps}
          interactive={false}
          className={clsx(option.className, classesMap.option, {
            [classesMap.optionSelected ?? '']: multiple && isSelected,
            [classesMap.optionActive ?? '']: optionValue === active?.value,
          })}
          classes={listItemClasses}
          size={size}
          onMouseEnter={onMouseEnter}
          onMouseDown={handleOptionMouseDown}
          onClick={handleOptionClick}
        >
          {label}
        </ListItem>
      )
    }

    /**
     * Общие aria пропсы select
     */
    const commonSelectAriaProps = {
      'aria-label': label ? String(label) : undefined,
      'aria-describedby': helperText ? helperTextId : undefined,
      'aria-invalid': typeof error === 'undefined' ? undefined : error,
    }

    const content = (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Фокус устанавливается таким образом, чтобы не слетал фокус с первого элемента списка
      <List<ListElement>
        {...commonSelectAriaProps}
        {...listProps}
        ref={mergedListRef}
        style={{
          ...getDynamicStyles({ rows }).list,
          ...(listProps?.style ?? {}),
        }}
        role="listbox"
        interactive={!disabled && multiple}
        className={clsx(listProps?.className, classesMap.list, {
          [classesMap.single ?? '']: !multiple,
          [classesMap.multiple ?? '']: multiple,
          [classesMap.listError ?? '']: multiple && error,
          [classesMap?.small ?? '']: size === ElementSize.sm,
          [classesMap?.large ?? '']: size === ElementSize.lg,
          [classesMap?.disabled ?? '']: disabled,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {!groupBy &&
          options.map((option: Option<ListItemElement>) =>
            renderListOption(option)
          )}

        {groupBy &&
          groupedOptions &&
          groupedOptions.length &&
          groupedOptions.map(({ key, group, options }) => (
            <ListItemGroup key={key} label={group}>
              {options.map((option) => renderListOption(option))}
            </ListItemGroup>
          ))}
      </List>
    )

    if (multiple) {
      return (
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          error={error}
          disabled={disabled}
          labelProps={labelProps}
          helperTextProps={{
            ...helperTextProps,
            id: helperTextId,
          }}
        >
          {content}
        </Labelled>
      )
    }

    return (
      <div {...rest} ref={ref} className={className} onKeyDown={handleKeyDown}>
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          labelProps={labelProps}
          disabled={disabled}
          error={error}
          helperTextProps={{
            ...helperTextProps,
            id: helperTextId,
          }}
        >
          <Dropdown
            ref={mergedPopupRefs}
            action={DropdownTriggerType.hover}
            {...dropdownProps}
            placement="bottom-start"
            open={isOpen}
            content={content}
            modifiers={popupModifiers}
            popperOptions={popperOptions}
          >
            <SelectButton
              {...commonSelectAriaProps}
              {...selectButtonProps}
              ref={mergedButtonRefs}
              // id шник активного элемента (по которму перемещаются кнопками )
              aria-activedescendant={
                isOpen && active
                  ? createAriaActiveDescendantId(active.value)
                  : undefined
              }
              classes={buttonClasses}
              disabled={disabled}
              isOpen={isOpen}
              size={size}
              error={error}
              showErrorIcon={showErrorIcon}
              errorIconTooltipProps={errorIconTooltipProps}
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              emptyValue={
                !Array.isArray(selectedOption) && !selectedOption?.value
              }
              onClick={toggleOpen}
              onKeyDown={preventOnKeyDownSpace}
            >
              {renderSelectButtonText()}
            </SelectButton>
          </Dropdown>
        </Labelled>
      </div>
    )
  }
) as <
  ListElement extends React.ElementType = typeof defaultListElement,
  ListItemElement extends React.ElementType = typeof defaultListItemElement
>(
  props: SelectProps<ListElement, ListItemElement>
) => JSX.Element
