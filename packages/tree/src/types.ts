import {
  TreeItem,
  UseTreeProps,
  UseTreeReturnProps,
  TreeNodeItem,
  UseKeyboardReturnProps,
  TreeGetters,
} from './hooks'
import { TreeSizeType } from './common'
import { TreeClasses } from './classes'
import { ComponentPropsWithoutRefFix } from '@v-uik/common'
import { TreeComponents } from './userComponents'

export type TreeProps<TItem = TreeItem> = UseTreeProps<TItem> &
  TreeBaseProps<TItem> &
  TreeAdditionalProps<TItem> &
  GettersProps<TItem>

type TreeHandlers = Pick<
  UseTreeReturnProps,
  'toggleCheck' | 'toggleExpand' | 'toggleSelect' | 'toggleSelectRange'
>

type TreeBaseProps<TItem = TreeItem> = {
  /**
   * Размер дерева
   */
  size?: TreeSizeType
  /**
   * Флаг заблокированного дерева
   */
  disabled?: boolean
  /**
   * Флаг для выключения функционала скрытия/раскрытия элементов дерева
   */
  disableExpand?: boolean
  /**
   * Флаг для включения функционала чекбоксов у элементов дерева
   */
  checkable?: boolean
  /**
   * Флаг для включения функционала выбора элементов дерева
   */
  selectable?: boolean
  /**
   * Максимальное количество строк, которое будет отображаться в контенте элементов дерева. Контент, который не помещается в заданное количество строк
   * будет скрываться за троеточием
   */
  maxContentLines?: number
  /**
   * Флаг для отображения иконок у элементов дерева
   */
  showIcons?: boolean
  /**
   * Флаг для отображения путей у элементов дерева
   */
  showTrails?: boolean
  /**
   * Флаг для включения полуотступов у элементов дерева
   */
  withHalfLevelSpacer?: boolean
  /**
   * Флаг для выключения возможности скрытия/раскрытия элемента дерева при клике
   */
  disableExpandOnClick?: boolean
  /**
   * Флаг для включения возможности отмечать чекбокс у элемента дерева при клике
   */
  enableCheckOnClick?: boolean
  /**
   * Флаг для включения возможности выбора элемента дерева при клике
   */
  disableSelectOnClick?: boolean
  /**
   * Флаг для выключения возможности скрытия/раскрытия элемента дерева при клике
   */
  disableFocusTreeOnItemClick?: boolean
  /**
   * Базовый отступ элементов дерева относительно их уровня вложенности
   */
  levelSpacer?: number
  /**
   * Флаг для включения функционала множественного выбора элементов дерева. Актуально только для `selectMode="strict"` и `selectable="true"`
   */
  multipleSelect?: boolean
  /**
   * Функция обратного вызова, которая срабатывает при нажатии клавиатуры на сфокусированном дереве
   *
   * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия клавиатуры
   * @param {TreeNodeItem<TItem>} node Сфокусированный элемент дерева
   * @param {TreeHandlers} Объект с функциями для работы с деревом
   *
   * @returns Если функция возвращает значение, то поведение управления с клавиатуры по умолчанию отключается
   */
  onTreeKeyDown?: (
    event: React.KeyboardEvent<HTMLUListElement>,
    node: TreeNodeItem<TItem>,
    handlers: TreeHandlers
  ) => void | boolean
  /**
   * Функция обратного вызова, которая срабатывает при нажатии кнопки мыши на элемент дерева
   *
   * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши
   * @param {TreeNodeItem<TItem>} node Сфокусированный элемент дерева
   * @param {TreeHandlers} Объект с функциями для работы с деревом
   *
   * @returns Если функция возвращает значение, то поведение нажатия кнопки мыши по умолчанию отключается
   */
  onNodeClick?: (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    node: TreeNodeItem<TItem>,
    handlers: TreeHandlers
  ) => void | boolean
  /**
   * Функция для получения HTML-свойств для кнопки скрытия/раскрытия дерева
   *
   * @param Элемент дерева
   */
  getExpandButtonInnerProps?: (
    node: TreeNodeItem<TItem>
  ) => ComponentPropsWithoutRefFix<'button'>
  /**
   * Функция для получения HTML-свойств для элемента дерева
   *
   * @param Элемент дерева
   */
  getItemInnerProps?: (
    node: TreeNodeItem<TItem>
  ) => ComponentPropsWithoutRefFix<'li'>
  /**
   * Функция для получения HTML-свойств для группы дочерних элементов дерева
   *
   * @param Элемент дерева
   */
  getNodeGroupInnerProps?: (
    node: TreeNodeItem<TItem>
  ) => ComponentPropsWithoutRefFix<'ul'>
  /**
   * Функция для получения HTML-свойств для внутреннего контейнера элемента дерева
   *
   * @param Элемент дерева
   */
  getNodeInnerProps?: (
    node: TreeNodeItem<TItem>
  ) => ComponentPropsWithoutRefFix<'span'>
}

type TreeAdditionalProps<TItem = TreeItem> =
  ComponentPropsWithoutRefFix<'ul'> & {
    /**
     * CSS классы компонента
     */
    classes?: TreeClasses
    /**
     * Свойство для переопределения элементов Tree
     */
    components?: Partial<TreeComponents<TItem>>
  }

export type TreeNodeListProps<TItem = TreeItem> = UseTreeReturnProps<TItem> &
  TreeBaseProps<TItem> &
  Pick<UseTreeProps<TItem>, 'selectMode' | 'onLoadData'> & {
    lastParentsOnLevelMap?: LastParentsOnLevelMap
  }

export type TreeRootProps<TItem = TreeItem> = UseTreeReturnProps<TItem> &
  TreeBaseProps<TItem> &
  ComponentPropsWithoutRefFix<'ul'> &
  Pick<UseTreeProps<TItem>, 'selectMode'>

export type TreeBaseComponentProps<TItem = TreeItem> = {
  /**
   * Объект данных элемента дерева
   */
  data: TItem
  /**
   * Глубина вложенности элемента дерева
   */
  depth: number
  /**
   * Размер элемента дерева
   */
  size: TreeSizeType
  /**
   * Флаг заблокированного элемента дерева
   */
  disabled: boolean
  /**
   * Ключ элемента дерева
   */
  nodeKey: React.Key
  /**
   * Флаг раскрытого элемента дерева
   */
  expanded: boolean
  /**
   * Флаг выбранного элемента дерева
   */
  selected: boolean
  /**
   * Состояние загрузки элемента дерева
   */
  loading: boolean
}

export type LastParentsOnLevelMap = Record<
  React.Key,
  { depth: undefined | number; parentKey: React.Key | undefined }
>

export type TreeImperativeHandlersRef<TItem = TreeItem> =
  UseKeyboardReturnProps &
    TreeHandlers & {
      /**
       * Получить Ref на HTML-элемент дерева
       *
       * @returns Объект-ссылка на HTML-элемент дерева
       */
      getElementRef: () => React.RefObject<HTMLElement>
      /**
       * Получить элемент дерева, который сейчас находится в фокусе
       *
       * @returns Объект данных элемента дерева
       */
      getFocusItem: () => TreeNodeItem<TItem> | undefined
    }

export type GettersProps<TItem = TreeItem> = {
  /**
   * Объект функций для получения ключевых данных, необходимых для формирования метаданных элементов дерева
   */
  getters?: Partial<TreeGetters<TItem>>
}
