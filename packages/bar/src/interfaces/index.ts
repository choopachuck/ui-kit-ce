import { DirectionType, ComponentPropsWithRefFix } from '@v-uik/common'
import { BarKindsType, SubBarKindsType } from '../constants'
import { BarClasses, SubBarClasses } from './classes'

export interface BarProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: BarClasses
  /**
   * Направление расположения элементов
   */
  direction?: DirectionType
  /**
   * Определяет тип компонента.
   */
  kind?: BarKindsType
  /**
   * Раскрыть бар (только для вертикального)
   */
  expanded?: boolean
}

export interface SubBarProps extends ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: SubBarClasses
  /**
   * Направление расположения элементов
   */
  direction?: DirectionType
  /**
   * Цвет компонента
   */
  kind?: SubBarKindsType
  /**
   * Раскрыть саббар (только для вертикального)
   */
  expanded?: boolean
}
