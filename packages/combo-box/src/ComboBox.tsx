'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { ElementSize, DATA_V_UIK_INPUT_TYPE } from '@v-uik/common'
import { InputAffix, InputAffixType } from '@v-uik/input'
import { Dropdown, DropdownProps, DropdownTriggerType } from '@v-uik/dropdown'
import { CircularProgress } from '@v-uik/progress'
import { ListProps, scrollElement } from '@v-uik/list'
import {
  includesKeyboardKey,
  isEqualKeyboardKeys,
  warning,
  dispatchChangeEvent,
} from '@v-uik/utils'
import { ComboBoxOptionIcon } from './assets/ComboBoxOptionIcon'

import { useSelectModifiers } from '@v-uik/popup'
import {
  useMergedRefs,
  useOutsideClick,
  useOutsideScroll,
  useGeneratedId,
  useForceSecondRender,
  useValue,
} from '@v-uik/hooks'
import { Tooltip } from '@v-uik/tooltip'
import { ErrorIcon } from './assets/ErrorIcon'

import { ComboBoxComponentsConfig, getComponents } from './components'
import {
  BaseComboBoxProps,
  Classes,
  ComboboxEvent,
  ComboBoxInputEvent,
  CommonProps,
  GroupType,
  Options,
  TruncateProps,
  ComboboxChangeReason,
  SingleValue,
  MultiValue,
} from './interfaces'
import {
  getOptionLabel as getOptionLabelBuiltin,
  getOptionPrefix as getOptionPrefixBuiltin,
  getOptionSuffix as getOptionSuffixBuiltin,
  getOptionValue as getOptionValueBuiltin,
  isOptionDisabled as isOptionDisabledBuiltin,
} from './builtins'
import {
  createFilter,
  formatValueToOption,
  valueTernary,
  isArrayOfStrings,
  toOption,
  isCounter,
} from './utils'
import { HiddenPropsContext } from './context'
import { defaultOptionItemElement, defaultOptionListElement } from './config'
import { Labelled } from '@v-uik/labelled'

const DEFAULT_OPTION_HEIGHT = 40

export type ComboBoxStyleProps = {
  rows?: number
  isSearchable?: boolean
}

enum Arrow {
  UP = 'ArrowUp',
  RIGHT = 'ArrowRight',
  DOWN = 'ArrowDown',
  LEFT = 'ArrowLeft',
}
const UPANDDOWN_KEYS: Arrow[] = [Arrow.UP, Arrow.DOWN]
const LEFTANDRIGHT_KEYS: Arrow[] = [Arrow.LEFT, Arrow.RIGHT]
const SUBMIT_KEYS = ['', 'Enter']
const DELETE_KEYS = ['Delete', 'Backspace']

const getDynamicStyles = (
  props: ComboBoxStyleProps
): Record<string, React.CSSProperties> => ({
  list: {
    maxHeight: props.rows ? props.rows * DEFAULT_OPTION_HEIGHT : undefined,
  },
})

const useStyles = createUseStyles((theme) => ({
  list: {
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    backgroundColor: theme.comp.comboBox.listColorBackground,
    boxShadow: theme.comp.comboBox.listElevationShadow,
    border: `1px solid ${theme.comp.comboBox.listColorBorder}`,
  },

  option: {
    minWidth: 0,

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.comp.comboBox.optionColorBackgroundHover,

      '&$optionDisabled': {
        cursor: 'default',
        backgroundColor: theme.comp.comboBox.listColorBackground,
      },
    },
  },

  optionSmall: {
    borderTopLeftRadius: theme.comp.comboBox.optionShapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.comboBox.optionShapeBorderRadiusTopRightSm,
    borderBottomLeftRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomRightSm,
  },

  optionMedium: {
    borderTopLeftRadius: theme.comp.comboBox.optionShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.comboBox.optionShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomRightMd,
  },

  optionLarge: {
    borderTopLeftRadius: theme.comp.comboBox.optionShapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.comboBox.optionShapeBorderRadiusTopRightLg,
    borderBottomLeftRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius:
      theme.comp.comboBox.optionShapeBorderRadiusBottomRightLg,
  },

  selectedOption: {
    backgroundColor: theme.comp.comboBox.optionColorBackgroundSelected,
  },

  optionDisabled: {
    // Ставлю данное свойство для того, чтобы получать события от disabled-элемента
    pointerEvents: 'all',
  },

  optionActive: {
    backgroundColor: theme.comp.comboBox.optionColorBackgroundHover,
  },

  errorIcon: {
    color: theme.comp.comboBox.alertIconColorText,
  },

  text: {},

  creatableDivider: {
    marginTop: 3,
    marginBottom: 4,
  },

  small: {
    borderTopLeftRadius: theme.comp.comboBox.listShapeBorderRadiusTopLeftSm,
    borderTopRightRadius: theme.comp.comboBox.listShapeBorderRadiusTopRightSm,
    borderBottomLeftRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomLeftSm,
    borderBottomRightRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomRightSm,

    '& $errorIcon': {
      width: 16,
      height: 16,
    },
  },

  medium: {
    borderTopLeftRadius: theme.comp.comboBox.listShapeBorderRadiusTopLeftMd,
    borderTopRightRadius: theme.comp.comboBox.listShapeBorderRadiusTopRightMd,
    borderBottomLeftRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomLeftMd,
    borderBottomRightRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomRightMd,
  },

  large: {
    borderTopLeftRadius: theme.comp.comboBox.listShapeBorderRadiusTopLeftLg,
    borderTopRightRadius: theme.comp.comboBox.listShapeBorderRadiusTopRightLg,
    borderBottomLeftRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomLeftLg,
    borderBottomRightRadius:
      theme.comp.comboBox.listShapeBorderRadiusBottomRightLg,
  },

  counter: {
    flex: '0 0 auto',
  },

  checkbox: {
    marginRight: 11,
  },
}))

export type ComboboxProps<
  Option,
  ListElement extends React.ElementType = typeof defaultOptionListElement,
  ListItem extends React.ElementType = typeof defaultOptionItemElement
> = BaseComboBoxProps<Option, ListItem> &
  TruncateProps<Option> & {
    /**
     * CSS классы компонента
     */
    classes?: Classes
    /**
     * Свойство для переопределения элементов Combobox
     */
    components?: ComboBoxComponentsConfig<Option, ListElement, ListItem>
  }

const defaultFilterOption = createFilter()
const defaultOptions: Options<unknown> = []

export const ComboBox = React.forwardRef(
  <
    Option,
    ListElement extends React.ElementType = typeof defaultOptionListElement,
    ListItemElement extends React.ElementType = typeof defaultOptionItemElement
  >(
    {
      canClear,
      className: classNameProp,
      classes,
      components,
      delimiter = ', ',
      disableCloseOnSelect = false,
      disableVisibleSelectedValue = false,
      disabled,
      dropdownProps,
      error,
      errorIconTooltipProps,
      filterOption = defaultFilterOption,
      getOptionLabel = getOptionLabelBuiltin,
      getOptionPrefix = getOptionPrefixBuiltin,
      getOptionSuffix = getOptionSuffixBuiltin,
      getOptionValue = getOptionValueBuiltin,
      groupBy,
      helperText,
      helperTextProps,
      id,
      isOptionDisabled = isOptionDisabledBuiltin,
      isSearchable,
      label,
      labelProps,
      limitByWidth,
      limitTags,
      listProps,
      multiple = false,
      noOptionsText,
      onChange,
      onInputChange,
      onKeyDown,
      openOnFocus,
      openOnClick = true,
      options = defaultOptions as Options<Option>,
      placeholder: placeHolderProp,
      rows = 10,
      selectOnFocus,
      showErrorIcon = false,
      size = ElementSize.md,
      value: valueProp,
      withTags = false,
      hideDropdownOnOutsideScroll = true,
      formatOptionLabel,
      opened: propsOpened,
      showArrow = true,
      showCheckMark = true,
      inputInnerProps,
      inputValue: inputValueProp,
      inputPrefix,
      inputSuffix,
      clearInputOnBlur = false,
      loading,
      loadingLabel = 'Загрузка...',
      controlInnerProps = {},
      isCreatableDivided,
      onMenuOpen,
      onMenuClose,
      description,
      labelledClasses,
      keepHelperTextMinHeight,
      required,
      inputProps,
      ...rest
    }: ComboboxProps<Option, ListElement, ListItemElement>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    useForceSecondRender(propsOpened)

    const { backfill, recoveryBackfillInputValue: recoveryBackfillInputValue } =
      React.useContext(HiddenPropsContext)

    const classList = useStyles()
    const dynamicStyles = getDynamicStyles({ rows })

    const {
      onBlur: onControlBlur,
      onFocus: onControlFocus,
      onMouseDown: onControlMouseDown,
      ...restControlInnerProps
    } = controlInnerProps

    warning(
      !(typeof valueProp === 'string' || isArrayOfStrings(valueProp)),
      'ComboBox',
      'параметр `value` имеет новый формат `Option`, используйте его, в версии `2.X.X` он будет окончательно изменен на `Option`.'
    )

    const classesMap = {
      list: clsx(classList.list, classes?.list),
      option: clsx(classList.option, classes?.option),
      optionSmall: clsx(classList.optionSmall, classes?.optionSmall),
      optionMedium: clsx(classList.optionMedium, classes?.optionMedium),
      optionLarge: clsx(classList.optionLarge, classes?.optionLarge),
      selectedOption: clsx(classList.selectedOption, classes?.selectedOption),
      optionActive: clsx(classList.optionActive, classes?.optionActive),
      optionDisabled: clsx(classList.optionDisabled, classes?.optionDisabled),
      optionText: classes?.optionText,
      optionTextTypography: classes?.optionTextTypography,
      optionMultiPrefix: classes?.optionMultiPrefix,
      errorIcon: clsx(
        classList.errorIcon,
        classes?.errorIcon,
        classes?.inputErrorIcon
      ),
      text: clsx(classList.text, classes?.text),
      input: classes?.input,
      inputArrowIcon: classes?.inputArrowIcon,
      inputContent: classes?.inputContent,
      inputRoot: classes?.inputRoot,
      inputDisabled: classes?.inputDisabled,
      tag: classes?.tag,
      counter: clsx(classes?.counter, classList.counter),
      small: clsx(classList.small, classes?.small),
      medium: clsx(classList.medium, classes?.medium),
      large: clsx(classList.large, classes?.large),
      error: clsx(classes?.error),
      root: classes?.root,
      inputPrefix: classes?.inputPrefix,
      inputSuffix: classes?.inputSuffix,
      loading: classes?.loading,
      creatableDivider: clsx(
        classes?.creatableDivider,
        classList.creatableDivider
      ),
      focused: classes?.focused,
    }

    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg

    classesMap.list = clsx(classesMap.list, {
      [classesMap.small]: isSmall,
      [classesMap.medium]: isMedium,
      [classesMap.large]: isLarge,
    })

    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.small]: isSmall,
      [classesMap.medium]: isMedium,
      [classesMap.large]: isLarge,
      [classesMap.error]: error,
    })

    const inputRootRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const rootRef = React.useRef<HTMLDivElement>(null)
    const popupRef = React.useRef<HTMLDivElement | null>(null)
    const indexOfSelected = React.useRef<number>()
    const listRef = React.useRef<HTMLElement | null>(null)

    const hiddenInputRef = React.useRef<HTMLInputElement>(null)
    const hiddenInputMergedRef = useMergedRefs([
      hiddenInputRef,
      inputProps?.ref ?? null,
    ])

    const [focused, setFocused] = React.useState(false)
    const [opened, setOpened] = React.useState<boolean>(false)
    const [inputValue, setInputValue] = useValue(inputValueProp, {
      fallbackValue: '',
    })
    const [hasGrouping, setHasGrouping] = React.useState(false)

    const formatValueFromProp = React.useCallback(
      (value) => {
        return formatValueToOption<Option>(value, options, getOptionValue)
      },
      [options, getOptionValue]
    )

    const [selectedValue, setSelectedValue] = useValue(valueProp, {
      formatValueFromProp,
      fallbackValue: defaultOptions as Options<Option>,
    })

    // после ввода в autocomplete, введенное значение должно стать опцией с возможностью очистки при canClear
    React.useEffect(() => {
      if (backfill) {
        setSelectedValue(
          inputValue ? [toOption(inputValue) as unknown as Option] : []
        )
      }
    }, [backfill, inputValue, setSelectedValue])

    const [active, setActive] = React.useState<Option | undefined>(undefined)
    const [selectedActive, setSelectedActive] = React.useState<
      Option | undefined
    >(undefined)

    const popperOptions: DropdownProps['popperOptions'] = {
      strategy: 'fixed',
      ...dropdownProps?.popperOptions,
    }

    const toCategorizedOption = (option: Option, inputValue: string) => {
      const label = getOptionLabel(option)
      const value = getOptionValue(option)

      return filterOption({ label, value, option }, inputValue)
    }

    const filteredOptions = React.useMemo(() => {
      return options.filter((option) => toCategorizedOption(option, inputValue))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, options])

    const isPopupOpen = React.useMemo(() => {
      if (propsOpened !== undefined) {
        return propsOpened
      }

      return opened && (!!noOptionsText || !!filteredOptions.length)
    }, [noOptionsText, filteredOptions, propsOpened, opened])

    // костыль на срабатывание onStateChange
    React.useEffect(() => {
      dropdownProps?.onStateChange?.(isPopupOpen)
    }, [dropdownProps?.onStateChange, isPopupOpen]) // eslint-disable-line

    const popupModifiers = useSelectModifiers<Option>({
      modifiers: dropdownProps?.modifiers,
      limitByWidth,
      indexOfSelected: indexOfSelected.current,
      activeOption: active,
      openUnderAnchor: true,
      enableFlip: true,
      isOpened: isPopupOpen,
      rows,
      maxLength: options.length,
    })

    const groupedOptions = React.useMemo(():
      | GroupType<Option>[]
      | undefined => {
      if (groupBy) {
        setHasGrouping(true)

        return options
          .filter((option) => toCategorizedOption(option, inputValue))
          .reduce((acc: GroupType<Option>[], option: Option, index: number) => {
            const group = groupBy(option)

            if (acc.length > 0 && acc[acc.length - 1].group === group) {
              acc[acc.length - 1].options.push(option)
            } else {
              acc.push({
                key: index,
                index,
                group,
                options: [option],
              })
            }

            return acc
          }, [])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, groupBy, inputValue])

    // ==============================
    // Методы
    // ==============================

    const close = React.useCallback(
      (e?: Event) => {
        if (e && popupRef.current?.contains(e.target as Node)) {
          return
        }

        onMenuClose?.()

        setOpened(false)
      },
      [onMenuClose]
    )

    const open = React.useCallback(() => {
      onMenuOpen?.()

      setOpened(true)
    }, [onMenuOpen])

    const closeWithUnFocus = React.useCallback(
      (e?: Event) => {
        close(e)
        setFocused(false)
      },
      [close]
    )

    const handleOutsideClick = React.useCallback(
      (e?: Event) => {
        if (e && listRef.current?.contains(e.target as Node)) {
          close(e)
        } else {
          closeWithUnFocus(e)
        }
      },
      [close, closeWithUnFocus, listRef]
    )

    const handleListRef = React.useCallback(
      (node: HTMLElement) => {
        listRef.current = node
      },
      [listRef]
    )

    const isOptionSelected = (option: Option) =>
      selectedValue.findIndex(
        (x) => getOptionValue(option) === getOptionValue(x)
      ) > -1

    const handleMenuOpen = (open: boolean) => {
      if (!open) {
        return
      }

      // при открытии меню устанавливаем активный элемент
      handleChangeActive(selectedValue[selectedValue.length - 1])
    }

    //TODO: переписать
    const handlePopupIndicator = () => {
      if (opened) {
        close()
      } else {
        open()
      }
    }

    const handleOpen = () => {
      setSelectedActive(undefined)

      if (!focused) {
        setFocused(true)
      }

      if (!disabled) {
        handlePopupIndicator()

        // при открытии меню устанавливаем активный элемент
        handleChangeActive(selectedValue[selectedValue.length - 1])
      }
    }

    const hasValue = () => selectedValue.length > 0

    const canChangeValue = (option?: Option) => {
      if (multiple || canClear) {
        return true
      }

      // при единичном выборе c флагом canClear=false разрешаем менять значение только на другое, отличное от текущего
      // без возможности обнулить значение
      return (
        selectedValue.length === 0 ||
        (!!option &&
          getOptionValue(option) !== getOptionValue(selectedValue[0]))
      )
    }

    const refOutsideClick = useOutsideClick(handleOutsideClick)
    const refOutsideScroll = useOutsideScroll(close)

    const mergedRootRefs = useMergedRefs([
      rootRef,
      ref,
      hideDropdownOnOutsideScroll ? refOutsideScroll : null,
    ])
    const mergedListRef = useMergedRefs([listProps?.ref, handleListRef])
    const mergedControlRef = useMergedRefs([inputRootRef, refOutsideClick])

    const generateInlineValue = (value: Options<Option> | undefined) =>
      value
        ? (Array.isArray(value) ? value : [value]).reduce(
            (accum, v, index) =>
              accum.concat(index ? ', ' : '', getOptionLabel(v)),
            ''
          )
        : ''

    // ==============================
    // Функции управления состоянием
    // ==============================

    const handleChange = (
      value: string & string[],
      e: ComboboxEvent,
      fullValue?: SingleValue<Option> & MultiValue<Option>,
      reason?: ComboboxChangeReason
    ) => {
      onChange?.(value, e, fullValue, reason)
      if (hiddenInputRef.current) {
        dispatchChangeEvent(
          hiddenInputRef.current,
          generateInlineValue(fullValue)
        )
      }
    }

    const handleChangeInputValue = (
      value: string,
      event: ComboBoxInputEvent = 'input'
    ) => {
      if (value !== inputValue) {
        onInputChange?.(value, event)
      }

      setInputValue(value)
    }

    const handleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      e.stopPropagation()

      open()
      handleChangeInputValue(e.target.value)
    }

    const handleChangeValues = (
      option: Option,
      event: ComboboxEvent,
      reason: ComboboxChangeReason
    ) => {
      if (!canChangeValue(option)) {
        return
      }
      let optionsClone = [...selectedValue]

      const index = optionsClone.findIndex(
        (x) => getOptionValue(x) === getOptionValue(option)
      )

      if (index !== -1) {
        optionsClone.splice(index, 1)
        setSelectedValue(optionsClone)
      } else {
        if (multiple) {
          optionsClone = [...optionsClone, option]
          setSelectedValue(optionsClone)
        } else {
          setSelectedValue([option])
          optionsClone = [option]
        }

        // выбираем индекс активного элемента
        indexOfSelected.current = options.findIndex(
          (x) => getOptionValue(x) === getOptionValue(option)
        )
      }

      const resultValues = optionsClone.map((item) => getOptionValue(item))

      //TODO: исправить когда обновится версия тс
      // @ts-ignore
      handleChange(
        // @ts-ignore
        valueTernary(multiple, resultValues, resultValues[0] ?? ''),
        event,
        valueTernary(multiple, optionsClone, optionsClone[0]),
        reason
      )
    }

    const handleOptionClick = (option: Option, event: ComboboxEvent) => {
      if (isOptionDisabled(option)) {
        return
      }

      handleChangeValues(option, event, 'select')

      handleChangeInputValue('', 'select-clear')
      setFocused(true)
      if (!disableCloseOnSelect) {
        close()
      }

      // это здесь для того, что не срабатывал onblur после выбора элемента
      event.preventDefault()
    }

    const handleClear = (event: ComboboxEvent) => {
      event.stopPropagation()

      if (inputValue) {
        handleChangeInputValue('', 'select-clear')
      } else {
        setSelectedValue([])
        //TODO: исправить когда обновится версия тс
        // @ts-ignore
        handleChange(valueTernary(multiple, [], ''), event, undefined, 'clear')
      }

      // сбрасываем активный элемент в 0
      indexOfSelected.current = 0

      // это здесь для того, что не срабатывал onblur после очищения комбобокса
      event.preventDefault()
    }

    const handleForceClear = (event: ComboboxEvent) => {
      if (!canChangeValue()) {
        return
      }
      event.stopPropagation()

      handleChangeInputValue('', 'select-clear')
      setSelectedValue([])
      //TODO: исправить когда обновится версия тс
      handleChange(
        // @ts-ignore
        valueTernary(multiple, [], ''),
        event,
        undefined,
        'force-clear'
      )

      // сбрасываем активный элемент в 0
      indexOfSelected.current = 0

      // это здесь для того, что не срабатывал onblur после очищения комбобокса
      event.preventDefault()
    }

    const handleDeleteOption = (event: ComboboxEvent, option: Option) => {
      handleChangeValues(option, event, 'delete')
    }

    const handleChangeActive = (option: Option | undefined) => {
      setActive(option)
      if (option) {
        scrollListToOption(option)
      }
    }

    // ==============================
    // Управление фокусом
    // ==============================

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      onControlBlur?.(e)
      setFocused(false)

      if (clearInputOnBlur) {
        handleChangeInputValue('', 'select-clear')
      }

      // сбрасывает значение, после ухода фокуса с компонента
      if (e.target === inputRootRef.current) {
        setSelectedActive(undefined)
      }
    }

    const handleMouseDownDropdown: React.MouseEventHandler = (e) => {
      if (openOnClick) {
        e.stopPropagation()
      }
      handleOpen()
    }

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      onControlFocus?.(e)
      setFocused(true)

      if (openOnFocus && !disabled && !opened) {
        open()
      }

      if (isSearchable && !selectedActive) {
        inputRef.current?.focus()
      }

      if (selectOnFocus) {
        inputRef.current?.select()
      }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      onControlMouseDown?.(event)
      if (openOnClick && !disabled) {
        handleMouseDownDropdown(event)
      }
    }

    // Имитируем работу элементов <label for="..."></label> и <input />
    // так как при isSearchable = false нет элемента <input />. Поэтому при клике на
    // label сразу вызываем фокус у <Control />.
    const handleLabelClick = (
      event: React.MouseEvent<HTMLLabelElement, MouseEvent>
    ) => {
      labelProps?.onClick?.(event)
      if (labelProps?.htmlFor === controlInnerProps?.id) {
        inputRootRef.current?.focus()
      }
    }

    const findEnabledOptionIndex = (
      currentIndex: number,
      reverse?: boolean
    ) => {
      let index = currentIndex + (reverse ? -1 : 1)

      while (isOptionDisabled(filteredOptions[index])) {
        reverse ? index-- : index++
      }

      if (reverse) {
        return index >= 0 ? index : currentIndex
      }

      return index < filteredOptions.length ? index : currentIndex
    }

    const findBeginingOptionIndex = (reverse: boolean) => {
      let index = reverse ? filteredOptions.length - 1 : 0

      while (isOptionDisabled(filteredOptions[index])) {
        reverse ? index-- : index++
      }

      return index
    }

    const scrollListToOption = (element: Option) => {
      const nextIndex = options.indexOf(element)

      const list = listRef.current
      if (list && list.scrollHeight > list.clientHeight) {
        const nextActiveOption = list.getElementsByTagName('li')[nextIndex]
        const listPadding = parseFloat(
          window.getComputedStyle(list).getPropertyValue('padding-top') || '0'
        )

        scrollElement(
          listRef.current,
          nextActiveOption,
          listPadding,
          hasGrouping
        )
      }
    }

    // ==============================
    // Управление с клавиатуры
    // ==============================

    // TODO: создать отдельные функции на каждый символ, а то не читается
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        isEqualKeyboardKeys('Tab', e.key) ||
        isEqualKeyboardKeys('Escape', e.key)
      ) {
        if (isPopupOpen) {
          close()
        }
      }

      if (includesKeyboardKey(DELETE_KEYS, e.key)) {
        // в случае Counter/Without Tags , удаляем все сразу
        if (!backfill && (isCounter(limitTags) || !withTags)) {
          if (!inputValue?.length) {
            handleForceClear(e)
          }
        } else if (selectedActive) {
          handleDeleteOption(e, selectedActive)
          setFocused(true)
          inputRef.current?.focus()
        } else if (multiple && selectedValue.length > 0) {
          if (document.activeElement !== inputRef.current || !inputValue) {
            handleDeleteOption(e, selectedValue[selectedValue.length - 1])
          }
        } else {
          // когда длина строки при стирании достигает одного очищаем
          if (inputValue?.length === 1) {
            handleForceClear(e)
            setFocused(true)
          }

          if (document.activeElement !== inputRef.current || !inputValue) {
            handleChangeInputValue('', 'delete-clear')
          }

          setSelectedValue([])
        }
      }

      if (includesKeyboardKey(SUBMIT_KEYS, e.key)) {
        // ничего не делать, если нет опций
        if (isSearchable && !filteredOptions.length) {
          return
        }

        if (selectedActive) {
          isSearchable
            ? inputRef.current?.focus()
            : inputRootRef.current?.focus()
        }

        if (isPopupOpen && ((active && !multiple) || multiple)) {
          e.preventDefault()
          if (!backfill) {
            const value = active ?? filteredOptions[0]
            handleChangeValues(value, e, 'select-enter')

            handleChangeInputValue('', 'select-clear')
          }
          if (!disableCloseOnSelect) {
            close()
          }
        } else {
          handleOpen()
        }
      }

      if (includesKeyboardKey(UPANDDOWN_KEYS, e.key)) {
        e.preventDefault()

        if (!focused && inputRef.current) {
          inputRef.current.focus()
        }

        if (!isPopupOpen) {
          handleOpen()
        } else {
          const currIndex = active ? filteredOptions.indexOf(active) : undefined
          const nextIndex = active
            ? findEnabledOptionIndex(
                currIndex as number,
                isEqualKeyboardKeys('ArrowUp', e.key)
              )
            : findBeginingOptionIndex(isEqualKeyboardKeys('ArrowUp', e.key))

          const nextOption = filteredOptions[nextIndex]
          handleChangeActive(nextOption)

          if (backfill) {
            if (currIndex !== nextIndex) {
              if (nextOption) {
                handleChangeValues(nextOption, e, 'select-arrows')
              }
            }

            // возврат к исходному введенному значению
            recoveryBackfillInputValue?.((inputValue: string) => {
              if (currIndex === nextIndex) {
                handleChangeValues(
                  toOption(inputValue) as unknown as Option,
                  e,
                  'select-arrows'
                )
                handleChangeActive(undefined)
              }
            })
          }
        }
      }

      if (includesKeyboardKey(LEFTANDRIGHT_KEYS, e.key)) {
        // активируем выбор стрелками, только если работаем с тегами и есть выбранные опции
        if (withTags && selectedValue.length && !isCounter(limitTags)) {
          const limitedSelectedValue = selectedValue.slice(0, limitTags)

          const currIndex = limitedSelectedValue.indexOf(
            selectedActive as Option
          )

          // стрелка влево
          if (e.key === Arrow.LEFT) {
            if (isPopupOpen) {
              close()
            }

            const nextElement =
              currIndex > -1
                ? limitedSelectedValue[currIndex - 1]
                : limitedSelectedValue[limitedSelectedValue.length - 1]

            if (nextElement) {
              setSelectedActive(nextElement)
            }

            // стрелка вправо
          } else {
            if (currIndex > -1) {
              const nextElement = limitedSelectedValue[currIndex + 1]
              if (nextElement) {
                setSelectedActive(nextElement)
              } else {
                setSelectedActive(undefined)
                inputRef.current?.focus()
                setFocused(true)
              }
            }
          }
        }
      } else {
        setSelectedActive(undefined)
        inputRef.current?.focus()
      }

      onKeyDown?.(e)
    }

    // это нужно, чтобы handleFocus юзался с актуальным значением selectedActive
    React.useEffect(() => {
      if (selectedActive) {
        inputRootRef.current?.focus()
        setFocused(false)
      }
    }, [selectedActive])

    // ==============================
    // Методы отрисовки
    // ==============================

    const {
      ClearIndicator,
      Control,
      DropdownIndicator,
      IndicatorContainer,
      Input,
      MultiValue,
      MultiCheckbox,
      SelectContainer,
      SingleValue,
      ValueContainer,
      Placeholder,
      OptionList,
      OptionItem,
      OptionPrefix,
      OptionSuffix,
    } = getComponents<Option, ListElement, ListItemElement>(components)

    const commonProps: CommonProps<Option> = {
      canClear,
      clearValue: handleClear,
      error,
      hasValue: hasValue(),
      isMulti: multiple,
      onOpen: setOpened,
      opened: isPopupOpen,
      options,
      selectedValue,
      withTags,
      isSearchable,
    }

    const dropdownId = useGeneratedId(dropdownProps?.id)
    const helperTextId = useGeneratedId(helperTextProps?.id)
    const inputId = useGeneratedId()
    const labelId = useGeneratedId(labelProps?.id)
    const listItemBaseId = useGeneratedId()

    const createAriaActiveDescendantId = (value: string): string =>
      `${listItemBaseId as string}-option-${value}`

    const getActiveDescendant = (): string | undefined => {
      if (opened && active) {
        return createAriaActiveDescendantId(getOptionLabel(active))
      }

      return undefined
    }

    const renderMultiValue = (option: Option) => {
      const key = `${getOptionLabel(option)}-${getOptionValue(option)}`
      const isFocused = option === selectedActive

      return (
        <MultiValue
          key={key}
          {...commonProps}
          classes={{ tag: classesMap.tag, focused: classesMap.focused }}
          isFocused={isFocused}
          size={size}
          deleteButtonProps={{
            onMouseDown: (e) => {
              e.preventDefault()
              e.stopPropagation()
            },
            onClick: (e) => {
              handleDeleteOption(e, option)
            },
          }}
        >
          {getOptionLabel(option)}
        </MultiValue>
      )
    }

    const renderPlaceholderOrValue = () => {
      // если нет значения или отключено отображение опций выводим placeholder
      if (!hasValue() || disableVisibleSelectedValue) {
        const defaultPlaceHolder = isSearchable ? 'Поиск' : 'Выберите опцию'
        const placeholder = placeHolderProp ?? defaultPlaceHolder

        return inputValue ? null : (
          <Placeholder {...commonProps} key="placeholder" isDisabled={disabled}>
            {placeholder}
          </Placeholder>
        )
      }

      if (hasValue()) {
        if (multiple && withTags) {
          // вывод для лимитированных тегов
          if (limitTags !== undefined) {
            if (limitTags >= 0) {
              const printableTags = selectedValue.slice(0, limitTags)

              return (
                <>
                  {printableTags.map(renderMultiValue)}
                  {selectedValue.length - printableTags.length > 0 && (
                    <MultiValue
                      key="count"
                      {...commonProps}
                      classes={{ tag: classesMap.counter }}
                    >
                      {limitTags ? '+' : ''}
                      {selectedValue.length - printableTags.length}
                    </MultiValue>
                  )}
                </>
              )
            }
          }

          // вывод тегов
          return selectedValue.map(renderMultiValue)
        }

        // вывод через запятую
        if (multiple && !withTags) {
          return (
            <SingleValue
              {...commonProps}
              classes={{
                singleValue: classesMap.text,
              }}
            >
              {selectedValue
                .map((option) => getOptionLabel(option))
                .join(delimiter)}
            </SingleValue>
          )
        }
      }

      // это условие здесь чтобы "затирать" одиночное значение при поиске
      if (inputValue) {
        return null
      }

      // одиночное значение
      if (!multiple) {
        const singleValue = selectedValue[0]

        return (
          <SingleValue
            {...commonProps}
            classes={{
              singleValue: classesMap.text,
            }}
          >
            {getOptionLabel(singleValue)}
          </SingleValue>
        )
      }
    }

    const renderInput = () => {
      if (isSearchable) {
        return (
          <Input
            {...commonProps}
            ref={inputRef}
            classes={{ input: classesMap.input }}
            innerProps={{
              'aria-autocomplete': 'list',
              'aria-controls': dropdownId,
              'aria-disabled': disabled,
              'aria-expanded': isPopupOpen,
              autoCapitalize: 'none',
              autoComplete: 'off',
              autoCorrect: 'off',
              disabled: disabled,
              id: inputId,
              onChange: handleSearchOption,
              spellCheck: false,
              tabIndex: disabled ? -1 : 0,
              type: 'text',
              value: inputValue,
              ...inputInnerProps,
            }}
            isDisabled={disabled}
          />
        )
      }
    }

    const renderClearIndicator = () => {
      if (canClear && hasValue()) {
        return (
          <ClearIndicator
            {...commonProps}
            disabled={disabled}
            size={size}
            innerProps={{
              'aria-label': 'clearButton',
              onClick: backfill ? handleForceClear : handleClear,
            }}
          />
        )
      }
    }

    const renderDropdownIndicator = () => {
      if (showArrow) {
        return (
          <DropdownIndicator
            {...commonProps}
            classes={{ arrowIcon: classesMap.inputArrowIcon }}
            isDisabled={disabled}
            size={size}
            innerProps={{
              onMouseDown: handleMouseDownDropdown,
            }}
          />
        )
      }
    }

    const renderLoadingIndicator = () => {
      if (loading) {
        return (
          <CircularProgress
            hideTrack
            className={classesMap.loading}
            size="md"
          />
        )
      }
    }

    const renderErrorIcon = () => {
      const errorIcon = <ErrorIcon className={classesMap.errorIcon} />

      if (showErrorIcon && error) {
        if (errorIconTooltipProps) {
          return (
            <Tooltip single indicator {...errorIconTooltipProps}>
              {errorIcon}
            </Tooltip>
          )
        } else {
          return errorIcon
        }
      }

      return undefined
    }

    const renderOptionPrefix = (option: Option, isCreating?: boolean) => {
      const isSelected = isOptionSelected(option)
      const isDisabled = isOptionDisabled(option)

      const props = {
        disabled,
        checked: isSelected,
        className: clsx({
          [classList.checkbox]: !!getOptionPrefix(option),
        }),
      }

      //Если пользователь не прокидовал кастомный компонент
      if (OptionPrefix === undefined) {
        if (multiple && !isCreating) {
          return (
            <>
              {MultiCheckbox && <MultiCheckbox {...props} />}
              {getOptionPrefix(option)}
            </>
          )
        }

        return getOptionPrefix(option)
      }

      return OptionPrefix ? (
        <OptionPrefix
          option={option}
          multiple={multiple}
          creating={isCreating}
          selected={isSelected}
          disabled={isDisabled}
          components={{ MultiCheckbox }}
          customOptionPrefix={getOptionPrefix(option)}
        />
      ) : null
    }

    const renderOptionSuffix = (option: Option) => {
      const isSelected = isOptionSelected(option)

      if (OptionSuffix === undefined) {
        if (!multiple && isSelected) {
          return (
            <>
              {getOptionSuffix(option)}
              {showCheckMark && <ComboBoxOptionIcon />}
            </>
          )
        }

        return getOptionSuffix(option)
      }

      return OptionSuffix ? (
        <OptionSuffix
          selected={isSelected}
          option={option}
          multiple={multiple}
          customOptionSuffix={getOptionSuffix(option)}
          showCheckMark={showCheckMark}
        />
      ) : null
    }

    const content = () => {
      return (
        <OptionList
          listProps={{
            ref: mergedListRef,
            role: 'list',
            className: clsx(listProps?.className, classesMap.list),
            ...(listProps as Omit<ListProps<ListElement>, 'children'>),
            style: { ...dynamicStyles.list, ...(listProps?.style || {}) },
          }}
          {...commonProps}
          renderOptionPrefix={renderOptionPrefix}
          renderOptionSuffix={renderOptionSuffix}
          groupBy={groupBy}
          groupedOptions={groupedOptions}
          filteredOptions={filteredOptions}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          noOptionsText={noOptionsText}
          isOptionDisabled={isOptionDisabled}
          isOptionSelected={isOptionSelected}
          active={active}
          setActive={setActive}
          isCreatableDivided={isCreatableDivided}
          createAriaActiveDescendantId={createAriaActiveDescendantId}
          commonOptionItemProps={{
            interactive: false,
            classes: { disabled: classesMap.optionDisabled },
            role: 'option',
            size,
          }}
          optionClasses={{
            option: classesMap.option,
            optionSmall: classesMap.optionSmall,
            optionMedium: classesMap.optionMedium,
            optionLarge: classesMap.optionLarge,
            optionText: classesMap.optionText,
            optionTextTypography: classesMap.optionTextTypography,
            selectedOption: classesMap.selectedOption,
            optionActive: classesMap.optionActive,
            creatableDivider: classesMap.creatableDivider,
            noOptionsText: classesMap.option,
            optionLoading: classesMap.option,
            optionDisabled: classesMap.optionDisabled,
            prefix: classesMap.optionMultiPrefix,
          }}
          formatOptionLabel={formatOptionLabel}
          inputValue={inputValue}
          loadingLabel={loadingLabel}
          loading={loading}
          OptionItemComponent={OptionItem}
          onSelectOption={handleOptionClick}
        />
      )
    }

    const handleHiddenInputRef = (element: HTMLInputElement | null) => {
      if (element && selectedValue && !element.value) {
        element.value = generateInlineValue(selectedValue)
      }

      return hiddenInputMergedRef(element)
    }

    const hiddenInput = (
      <input
        {...{ [DATA_V_UIK_INPUT_TYPE]: 'combo-box' }}
        {...inputProps}
        ref={handleHiddenInputRef}
        type="hidden"
      />
    )

    return (
      <SelectContainer
        {...rest}
        ref={mergedRootRefs}
        {...commonProps}
        isDisabled={disabled}
        isFocused={focused}
        classes={{
          root: className,
        }}
        innerProps={{
          id,
          onKeyDown: handleKeyDown,
        }}
      >
        <Labelled
          size={size}
          classes={labelledClasses}
          label={label}
          helperText={helperText}
          description={description}
          keepHelperTextMinHeight={keepHelperTextMinHeight}
          required={required}
          labelProps={{
            ...labelProps,
            onClick: handleLabelClick,
          }}
          disabled={disabled}
          error={error}
          helperTextProps={{
            ...helperTextProps,
            id: helperTextId,
          }}
        >
          <Dropdown
            ref={popupRef}
            id={dropdownId}
            action={DropdownTriggerType.hover}
            placement="bottom-start"
            {...dropdownProps}
            content={content()}
            modifiers={popupModifiers}
            open={isPopupOpen}
            popperOptions={popperOptions}
            onStateChange={handleMenuOpen}
          >
            <Control
              ref={mergedControlRef}
              {...commonProps}
              isFocused={focused}
              size={size}
              classes={{
                focused: classesMap.focused,
                rootControl: classesMap.inputRoot,
                disabled: classesMap.inputDisabled,
              }}
              isDisabled={disabled}
              innerProps={{
                'aria-activedescendant': getActiveDescendant(),
                'aria-describedby': helperText ? helperTextId : undefined,
                'aria-expanded': isPopupOpen,
                'aria-invalid': error ?? undefined,
                'aria-labelledby': labelId,
                'aria-disabled': disabled,
                onFocus: handleFocus,
                onBlur: handleBlur,
                onMouseDown: handleClick,
                role: 'combobox',
                tabIndex: isSearchable || disabled ? -1 : 0,
                ...restControlInnerProps,
              }}
            >
              {inputPrefix && (
                <InputAffix
                  className={classesMap.inputPrefix}
                  type={InputAffixType.prefix}
                  disabled={disabled}
                >
                  {inputPrefix}
                </InputAffix>
              )}
              <ValueContainer
                {...commonProps}
                isDisabled={disabled}
                classes={{ valueContainer: classesMap.inputContent }}
                isFocused={focused}
                withTags={withTags}
                disableVisibleSelectedValue={disableVisibleSelectedValue}
              >
                {renderPlaceholderOrValue()}
                {renderInput()}
              </ValueContainer>

              <IndicatorContainer
                {...commonProps}
                isDisabled={disabled}
                classes={{
                  indicatorContainer: classes?.inputIndicatorContainer,
                }}
              >
                {renderLoadingIndicator()}
                {renderClearIndicator()}
                {renderErrorIcon()}
                {renderDropdownIndicator()}
              </IndicatorContainer>

              {inputSuffix && (
                <InputAffix
                  className={classesMap.inputSuffix}
                  type={InputAffixType.suffix}
                  disabled={disabled}
                >
                  {inputSuffix}
                </InputAffix>
              )}
            </Control>
          </Dropdown>
          {hiddenInput}
        </Labelled>
      </SelectContainer>
    )
  }
) as <
  Option,
  ListElement extends React.ElementType = typeof defaultOptionListElement,
  ListItem extends React.ElementType = typeof defaultOptionItemElement
>(
  props: ComboboxProps<Option, ListElement, ListItem>
) => JSX.Element
