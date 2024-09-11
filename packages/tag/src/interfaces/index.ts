import { TagKinds, TagColor } from '../constants'
import { ComponentPropsWithRefFix } from '@v-uik/common'
import { TTagElementSizeType } from '..'
import { TagComponentsConfig } from '../components'

export type TagClasses = {
  /** Стиль, применяемый к основному элементу */
  tag?: string
  /** Стиль, применяемый к элементу с `size='xs'` */
  extraSmall?: string
  /** Стиль, применяемый к элементу с `size='sm'` */
  small?: string
  /** Стиль, применяемый к элементу с `size='md'` */
  medium?: string
  /** Стиль, применяемый к элементу с `size='lg'` */
  large?: string
  /** Стиль, применяемый к элементу с `kind='lite'` */
  lite?: string
  /** Стиль, применяемый к элементу с `kind='secondary'` */
  secondary?: string
  /** Стиль, применяемый к элементу с `kind='primary'` */
  primary?: string
  /** Стиль, применяемый к элементу с `kind='color'` */
  color?: string
  /** Стиль, применяемый к тексту */
  text?: string
  /** Стиль, применяемый к тексту с `size='xs'` */
  textExtraSmall?: string
  /** Стиль, применяемый к тексту с `size='sm'` */
  textSmall?: string
  /** Стиль, применяемый к тексту с `size='md'` */
  textMedium?: string
  /** Стиль, применяемый к тексту с `size='lg'` */
  textLarge?: string
  /**
   * Стиль, применяемый к кнопке закрытия
   * @deprecated оставлено для обратной совместимости, используйте `closeButton`
   * */
  deleteButton?: string
  /** Стиль, применяемый к кнопке закрытия*/
  closeButton?: string
  /** Стиль, применяемый к */
  clickable?: string
  /** Стиль, применяемый к кликабельному тегу */
  selected?: string
  /** Стиль, применяемый к тегу с `dragged='true'` */
  dragged?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
}

export type TagInputClasses = {
  /** Стиль, применяемый к контейнеру */
  container?: string
  /** Стиль, применяемый к элементу input */
  input?: string
  /** Стиль, применяемый к элементу input с `size='xs'` */
  inputXs?: string
  /** Стиль, применяемый к элементу input с `size='sm'` */
  inputSm?: string
  /** Стиль, применяемый к элементу input с `size='md'` */
  inputMd?: string
  /** Стиль, применяемый к элементу input с `size='lg'` */
  inputLg?: string
  /** Стиль, применяемый к элементу с `disabled='true'` */
  disabled?: string
  /** Стиль, применяемый к элементу при фокусе */
  focused?: string
  /** Стиль, применяемый к элементу с `size='xs'` */
  extraSmall?: string
  /** Стиль, применяемый к элементу с `size='sm'` */
  small?: string
  /** Стиль, применяемый к элементу с `size='md'` */
  medium?: string
  /** Стиль, применяемый к элементу с `size='lg'` */
  large?: string
  /** Стиль, применяемый к тегу */
  tag?: string
  /** Стиль, применяемый к тексту внутри тега */
  text?: string
  /** Стиль, применяемый к тексту с `size='xs'` */
  textExtraSmall?: string
  /** Стиль, применяемый к тексту с `size='sm'` */
  textSmall?: string
  /** Стиль, применяемый к тексту с `size='md'` */
  textMedium?: string
  /** Стиль, применяемый к тексту с `size='lg'` */
  textLarge?: string
  /** Стиль, применяемый к иконке добавления */
  addIcon?: string
}

export type TTagKinds = keyof typeof TagKinds
export type TTagColor = keyof typeof TagColor

export type BaseTagProps = {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<TagClasses>
  /**
   * Размер тэга
   */
  size?: TTagElementSizeType
  /**
   * Свойство для переопределения элементов Tag
   */
  components?: TagComponentsConfig
  /**
   * Свойство для отображения состояния disabled элемента Tag
   */
  disabled?: boolean
}

export interface CommonProps
  extends ComponentPropsWithRefFix<'button'>,
    BaseTagProps {}

/**
 * Свойства компонента в зависимости от типа Tag
 */
export type TruncateProps =
  | {
      /**
       * Тип тега, по умолчанию lite
       */
      kind?: Exclude<TTagKinds, 'color'>
      /**
       * Обработчик, вызываемый при удалении тега
       */
      onDelete?: (
        event:
          | React.MouseEvent<HTMLSpanElement>
          | React.KeyboardEvent<HTMLSpanElement>
      ) => void
      /**
       * Обработчик, вызываемый при клике на тэг
       */
      onClick?: (event: React.MouseEvent<HTMLElement>) => void
      /**
       * Свойство определяющее состояние тега: выбран или нет. Неактуален для типа 'color'
       */
      selected?: boolean
      /**
       * Свойство определяющее цвет тега. Актуален только для типа 'color'
       */
      color?: never
      /**
       * Свойство определяющее состояния тега во время его перемещения. Реализован только класс. Неактуален для типа 'color'
       */
      dragged?: boolean
      /**
       * Дополнительные свойства для кнопки удаления
       */
      deleteButtonProps?: ComponentPropsWithRefFix<'span'>
    }
  | {
      kind: Extract<TTagKinds, 'color'>
      onDelete?: never
      deleteButtonProps?: never
      onClick?: never
      color?: TTagColor
      selected?: never
      dragged?: never
    }
