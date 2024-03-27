import * as React from 'react'
import { ElementSizeType } from '@v-uik/common'
import { TooltipProps } from '@v-uik/tooltip'
import { DropdownProps } from '@v-uik/dropdown'
import { ListProps } from '@v-uik/list'

import { FilterOption } from '../utils'
import { LabelledProps } from '@v-uik/labelled'

export type Options<Option> = Option[]

export type SingleValue<Option> = Option | null

export type MultiValue<Option> = Option[]

export type CommonProps<Option> = {
  canClear?: boolean
  hasValue: boolean
  clearValue: (e: ComboboxEvent) => void
  error?: boolean
  isMulti: boolean
  onOpen: (value: boolean) => void
  opened: boolean
  options: Options<Option>
  withTags: boolean
  selectedValue: Options<Option>
  isSearchable?: boolean
}

export interface BaseComboBoxProps<
  Option,
  ListElement extends React.ElementType
> extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Omit<LabelledProps, 'children' | 'classes'> {
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
  /**
   * Можно ли очищать всё поле
   */
  canClear?: boolean
  /**
   * Отключить отображение выбранных опций внутри поля
   */
  disableVisibleSelectedValue?: boolean
  /**
   * Разделитель для опций в режиме `multiple`, без тегов
   */
  delimiter?: string
  /**
   * Заблокировать поле
   */
  disabled?: boolean
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: Partial<DropdownProps>
  /**
   * Индикатор ошибки
   */
  error?: boolean
  /**
   * Свойства компонента Tooltip для иконки ошибки
   */
  errorIconTooltipProps?: Omit<TooltipProps, 'children'>
  /**
   * Функция для переопределения логики поиска
   */
  filterOption?: (option: FilterOption<Option>, inputValue: string) => boolean
  /**
   * Функция переопределения заголовка опции
   * @default option.label
   */
  getOptionLabel?: (option: Option) => string
  /**
   * Функция переопределения префикса выводимого в элементе опции
   * @default option.prefix
   */
  getOptionPrefix?: (option: Option) => React.ReactNode
  /**
   * Функция переопределения суффикса выводимого в элементе опции
   * @default option.suffix
   */
  getOptionSuffix?: (option: Option) => React.ReactNode
  /**
   * Функция переопределения значения опции
   * @default option.value
   */
  getOptionValue?: (option: Option) => string
  /**
   * Группировка опций по признаку
   */
  groupBy?: (option: Option) => string
  /**
   * Значение текстового поля
   */
  inputValue?: string
  /**
   * Вспомогательный элемент перед полем ввода
   */
  inputPrefix?: React.ReactNode
  /**
   * Вспомогательный элемент после поля ввода
   */
  inputSuffix?: React.ReactNode
  /**
   * Функция переопределения логики блокировки опции
   * @default option.disabled
   */
  isOptionDisabled?: (option: Option) => boolean
  /**
   * Разрешен ли поиск. Неактуален для Creatable/Autocomplete.
   */
  isSearchable?: boolean
  /**
   * Данный флаг устанавливает максимальную ширину выпадашки равной ширине самого селекта
   */
  limitByWidth?: boolean
  /**
   * Свойства компонента List
   */
  listProps?: ListProps<ListElement>
  /**
   * Текст если ничего не найдено
   */
  noOptionsText?: string
  /**
   * Обработчик изменения текстового поля
   */
  onInputChange?: (value: string, event?: ComboBoxInputEvent) => void
  /**
   * Если true, всплывающее окно откроется при фокусе на поле
   */
  openOnFocus?: boolean
  /**
   * Если true, всплывающее окно откроется при клике на поле
   */
  openOnClick?: boolean
  /**
   * Список опций
   */
  options?: Options<Option>
  /**
   * Заполнитель поля (подсказка внутри поля)
   */
  placeholder?: string
  /**
   * Количество отображаемых строк за раз внутри выпадашки
   */
  rows?: number
  /**
   * Показать дополнительную иконку ошибки
   */
  showErrorIcon?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Скрывать дропдаун при скроле вне дропдауна
   */
  hideDropdownOnOutsideScroll?: boolean
  /**
   * Функция задает, как отображать label внутри списка
   */
  formatOptionLabel?: (label: string, inputValue?: string) => React.ReactNode
  /**
   * Дополнительное условие, которое отвечает за раскрытость дропдауна
   */
  opened?: boolean
  /**
   * Показывать ли стрелку раскрывающегося списка
   */
  showArrow?: boolean
  /**
   * Показывать ли чек-марку при выборе опции
   */
  showCheckMark?: boolean
  /**
   * Идет ли процесс загрузки
   */
  loading?: boolean
  /**
   * Показывается в процессе загрузки
   */
  loadingLabel?: React.ReactNode
  /**
   * Пропсы innerProps для компонента Control
   */
  controlInnerProps?: Partial<JSX.IntrinsicElements['div']>
  /**
   * Cбрасывает введенное значение, при событии blur. Актуален только для isSearchable
   */
  clearInputOnBlur?: boolean
  /**
   * Показывать ли разделитель у создаваемой опции. Актуален только для Creatable
   */
  isCreatableDivided?: boolean
  /**
   * Функция, которая будет вызываться перед каждым открытием меню
   */
  onMenuOpen?: () => void
  /**
   * Функция, которая будет вызываться перед каждым закрытием меню
   */
  onMenuClose?: () => void
}

export type ComboboxEvent =
  | React.MouseEvent<HTMLElement>
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLSpanElement>

export type ComboBoxInputEvent = ComboBoxClearEvent // типы добавляются по мере необходимости
type ComboBoxClearEvent = 'select-clear' | 'delete-clear'

export type ComboboxChangeReason =
  | 'clear'
  | 'force-clear'
  | 'select'
  | 'select-enter'
  | 'select-arrows'
  | 'delete'

type MultiChoiceProps<Option> = {
  /**
   * Текущее значение
   */
  value?: Options<Option> | string[]
  /**
   * Обработчик события выбора опции
   *
   * @param {string} value - массив значений строк с применением функции getOptionValue
   * @param {ComboboxEvent} e — эвент события
   * @param {Options<Option>} fullValue - массив полных значений
   * @param {ComboboxChangeReason} reason - тип изменения значения поля
   */
  onChange?(
    value: string[],
    e: ComboboxEvent,
    fullValue?: MultiValue<Option>,
    reason?: ComboboxChangeReason
  ): void
  /**
   * Отключить закрытие при выборе опции. Неактуален для одиночного выбора/Autocomplete
   */
  disableCloseOnSelect?: boolean
  /**
   * Выбранные опции отображаются в виде тегов. Неактуален для одиночного выбора
   */
  withTags?: boolean
  /**
   * Включить мультивыбор. Неактуален для Autocomplete
   */
  multiple: true
  /**
   * Настраивает количество отображаемых тегов, если включена опция `withTags`
   * для отображения тегов в поле ввода.
   *
   * Если опций будет больше указанного лимита, они будут скрыты и появится тег
   * с указанием скрытых опций, формата `+n`.
   */
  limitTags?: number
  selectOnFocus?: never
}

type SingleChoiceProps<Option> = {
  value?: Option | string
  /**
   * Обработчик события выбора опции
   *
   * @param {string} value - значение отдаваемое по функции getOptionValue
   * @param {ComboboxEvent} e — эвент события
   * @param {Option} fullValue - полное значение (объект)
   * @param {ComboboxChangeReason} reason - тип изменения значения поля
   */
  onChange?(
    value: string,
    e: ComboboxEvent,
    fullValue?: SingleValue<Option>,
    reason?: ComboboxChangeReason
  ): void
  multiple?: false
  disableCloseOnSelect?: never
  withTags?: never
  limitTags?: never
  /**
   * Выделять слово в текстовом поле при фокусе. Неактуален для множественного выбора.
   */
  selectOnFocus?: boolean
}

export type TruncateProps<Option> =
  | SingleChoiceProps<Option>
  | MultiChoiceProps<Option>

export type GroupType<Option> = {
  key: number
  index: number
  group: string
  options: Options<Option>
}

export interface Accessors<Option> {
  getOptionValue: (option: Option) => string
  getOptionLabel: (option: Option) => string
}

export type Classes = {
  /** Стиль, применяемый к контейнеру основного элемента  */
  root?: string
  /** Стиль, применяемый к контейнеру основного элемента с `size='sm` */
  small?: string
  /** Стиль, применяемый к контейнеру основного элемента с `size='md` */
  medium?: string
  /** Стиль, применяемый к контейнеру основного элемента с `size='lg`  */
  large?: string
  /** Стиль, применяемый к основному элементу, в состоянии error */
  error?: string
  /** Стиль, применяемый к иконке ошибки */
  errorIcon?: string
  /** Стиль, применяемый к полю ввода, в состоянии isSearchable */
  input?: string
  /** Стиль, применяемый к вспомогательному элементу перед полем ввода */
  inputPrefix?: string
  /** Стиль, применяемый к вспомогательному элементу после поля ввода */
  inputSuffix?: string
  /** Стиль, применяемый к иконке стрелки, в состоянии showArrow */
  inputArrowIcon?: string
  /** Стиль, применяемый к обертке поля ввода */
  inputContent?: string
  /** Стиль, применяемый к иконке ошибки */
  inputErrorIcon?: string
  /** Стиль, применяемый к основной форме ввода и выбора значений */
  inputRoot?: string
  /** Стиль, применяемый к полю ввода в состоянии disabled */
  inputDisabled?: string
  /** Стиль, применяемый к обертке (списку) отображаемых элементов */
  list?: string
  /** Стиль, применяемый к каждому отображаемому элементу */
  option?: string
  /** Стиль, применяемый к каждому отображаемому элементу с `size='sm` */
  optionSmall?: string
  /** Стиль, применяемый к каждому отображаемому элементу с `size='md` */
  optionMedium?: string
  /** Стиль, применяемый к каждому отображаемому элементу с `size='lg` */
  optionLarge?: string
  /** Стиль, применяемый к каждому отображаемому элементу, в состоянии active */
  optionActive?: string
  /** Стиль, применяемый к каждому отображаемому элементу, в состоянии disabled */
  optionDisabled?: string
  /** Стиль, применяемый к тексту каждого отображаемого элемента` */
  optionText?: string
  /** Стиль, применяемый к типографии текста каждого отображаемого элемента` */
  optionTextTypography?: string
  /** Стиль, применяемый к каждому отображаемому элементу, в состоянии selected */
  selectedOption?: string
  /** Стиль, применяемый к индикатору процесса загрузки, в состоянии loading */
  loading?: string
  /** Стиль, применяемый к текстовому содержимому выводимого элемента,
   *  или к содержимому каждого элемента, выводимого через запятую внутри формы ввода */
  text?: string
  /** Стиль, применяемый к каждому выводимому элементу, при выводе через теги, в состоянии multiple */
  tag?: string
  /** Стиль, применяемый к чекбоксу, в состоянии multiple */
  checkBox?: string
  /** Стиль, применяемый к разделителю у создаваемой опции, в состоянии Creatable */
  creatableDivider?: string
  /** Стиль, применяемый к счетчику тегов, в состоянии withTags и Counter */
  counter?: string
  /** Стиль, применяемый к фокусированному тегу, при управлении стрелками лево/право */
  focused?: string
}
