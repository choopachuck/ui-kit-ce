import * as React from 'react'
import { ListItemProps, ListProps } from '@v-uik/list'
import { ElementSizeType } from '@v-uik/common'
import { TooltipProps } from '@v-uik/tooltip'
import { DropdownProps } from '@v-uik/dropdown'
import { LabelledProps } from '@v-uik/labelled'

export type Option<E extends React.ElementType> = Omit<
  ListItemProps<E>,
  'value'
> & {
  /**
   * Уникальное значение опции
   */
  value: string
  /**
   * Лейбл, который отображается при выборе опции
   */
  label: React.ReactNode
}

export interface BaseSelectProps<
  ListElement extends React.ElementType,
  ListItemElement extends React.ElementType
> extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange'>,
    Omit<LabelledProps, 'children' | 'classes'> {
  /**
   * Список опций
   */
  options?: Option<ListItemElement>[]
  /**
   * Данный флаг устанавливает максимальную ширину выпадашки равной ширине самого селекта
   */
  limitByWidth?: boolean
  /**
   * Размер поля
   */
  size?: ElementSizeType
  /**
   * Индикатор ошибки
   */
  error?: boolean
  /**
   * Показать дополнительную иконку ошибки
   */
  showErrorIcon?: boolean
  /**
   * Свойства компонента Tooltip для иконки ошибки
   */
  errorIconTooltipProps?: Omit<TooltipProps, 'children'>
  /**
   * Свойства компонента Dropdown
   */
  dropdownProps?: Partial<DropdownProps>
  /**
   * Свойства компонента List
   */
  listProps?: ListProps<ListElement>
  /**
   * Заблокировать поле
   */
  disabled?: boolean
  /**
   * Количество отображаемых строк за раз
   */
  rows?: number
  /**
   * Группировка опций по признаку
   */
  groupBy?(option: Option<ListItemElement>): string
  /**
   * Скрывать дропдаун при скроле вне дропдауна
   */
  hideDropdownOnOutsideScroll?: boolean
  /**
   * Отображать placeholder из атрибута, а не из опции
   */
  placeholder?: string
  /**
   * Список классов для компонента Labelled
   */
  labelledClasses?: LabelledProps['classes']
}

export type Classes = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу с `size='sm'` */
  small?: string
  /** Стиль, применяемый к элементу с `size='md'` */
  medium?: string
  /** Стиль, применяемый к элементу с `size='lg'` */
  large?: string
  /** Стиль, применяемый к элементу с `error='true'` */
  error?: string
  /** Стиль, применяемый к элементу выбора */
  button?: string
  /** Стиль, применяемый к элементу выбора, когда он пустой */
  buttonEmpty?: string
  /** Стиль, применяемый к содержимому элемента выбора */
  buttonContent?: string
  /** Стиль, применяемый к тексту элемента выбора */
  buttonText?: string
  /** Стиль, применяемый к иконке ошибке */
  buttonErrorIcon?: string
  /** Стиль, применяемый к индикатору открытия */
  buttonArrowIcon?: string
  /** Стиль, применяемый к выпадашке */
  list?: string
  /** Стиль, применяемый к опции */
  option?: string
  /** Стиль, применяемый к опции с `size='sm'` */
  optionSm?: string
  /** Стиль, применяемый к опции с `size='md'` */
  optionMd?: string
  /** Стиль, применяемый к опции с `size='lg'` */
  optionLg?: string
  /** Стиль, применяемый к тексту опции` */
  optionText?: string
  /** Стиль, применяемый к типографии текста опции` */
  optionTextTypography?: string
  /** Стиль, применяемый к активной опции (hover) */
  optionActive?: string
  /** Стиль, применяемый к выбранной опции */
  optionSelected?: string
  /** Стиль, применяемый к заблокированной опции */
  optionDisabled?: string
  /** Стиль, применяемый к элементу выбора с `multiple='true'` */
  multiple?: string
  /** Стиль, применяемый к элементу выбора с `multiple='false'` */
  single?: string
  /** Стиль, применяемый к выпадашке с `error='true'` */
  listError?: string
  /** Стиль, применяемый к элементу выбора с `disabled='true'` */
  disabled?: string
}
