import { UsePaginationProps, PaginationItem } from './hooks'
import { PaginationClasses } from './classes'
import { ElementSizeType, ComponentPropsWithRefFix } from '@v-uik/common'
import { PaginationComponentsConfig } from './components'

export type PaginationProps = ComponentPropsWithRefFix<'nav'> &
  UsePaginationProps & {
    /**
     * CSS классы компонента
     */
    classes?: PaginationClasses
    /**
     * Размер элементов пагинации
     */
    size?: ElementSizeType
    /**
     * Состояние блокировки элементов пагинации
     */
    disabled?: boolean
    /**
     * Свойство для переопределения элементов `Pagination`
     */
    components?: PaginationComponentsConfig
    /**
     * Флаг скрытия кнопки навигации к первой странице
     */
    showNavigationFirst?: boolean
    /**
     * Флаг скрытия кнопки навигации к последней странице
     */
    showNavigationLast?: boolean
    /**
     * Флаг скрытия кнопки навигации к предыдущей странице
     */
    hideNavigationPrevious?: boolean
    /**
     * Флаг скрытия кнопки навигации к следующей странице
     */
    hideNavigationNext?: boolean
    /**
     * Свойства для кнопки навигации к первой странице
     */
    firstButtonProps?: ComponentPropsWithRefFix<'button'>
    /**
     * Свойства для кнопки навигации к первой странице
     */
    lastButtonProps?: ComponentPropsWithRefFix<'button'>
    /**
     * Свойства для кнопки навигации к предыдущей странице
     */
    previousButtonProps?: ComponentPropsWithRefFix<'button'>
    /**
     * Свойства для кнопки навигации к следующей странице
     */
    nextButtonProps?: ComponentPropsWithRefFix<'button'>
    /**
     * Функция для получения свойства для каждого скрытого элемента
     */
    getPaginationOverflowButtonProps?: (
      item: PaginationItem
    ) => ComponentPropsWithRefFix<'button'>
    /**
     * Функция для получения свойства для каждого элемента страницы
     */
    getPaginationPageButtonProps?: (
      item: PaginationItem
    ) => ComponentPropsWithRefFix<'button'>
  }
