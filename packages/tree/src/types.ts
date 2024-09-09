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
   * Флаг для выключения функциональности скрытия/раскрытия
   */
  disableExpand?: boolean
  /**
   * Флаг для включения функциональности чекбоксов
   */
  checkable?: boolean
  /**
   * Флаг для включения функциональности выбора узлов дерева
   */
  selectable?: boolean
  /**
   * Максимальное количество строк, которое будет отображаться в контенте узла дерева. Контент, который не помещается в заданное количество строк
   * будет скрываться за троеточием
   */
  maxContentLines?: number
  /**
   * Флаг для отображения иконок у узлов дерева
   */
  showIcons?: boolean
  /**
   * Флаг для отображения путей до элементов дерева
   */
  showTrails?: boolean
  /**
   * Флаг для включения половины базового отступа для узлов дерева
   */
  withHalfLevelSpacer?: boolean
  /**
   * Флаг для выключения возможности скрытия/раскрытия узла дерева при клике на узел
   */
  disableExpandOnClick?: boolean
  /**
   * Флаг для включения возможности отмечать чекбокс при клике на узел
   */
  enableCheckOnClick?: boolean
  /**
   * Флаг для выключения возможности выбора дерева при клике на узел
   */
  disableSelectOnClick?: boolean
  /**
   * Флаг для выключения возможности скрытия/раскрытия узла дерева при клике на узел
   */
  disableFocusTreeOnItemClick?: boolean
  /**
   * Базовый отступ узлов дерева
   */
  levelSpacer?: number
  /**
   * Флаг для включения функциональности множественного выбора узлов дерева. Актуально только для `selectMode="strict"` и `selectable="true"`
   */
  multipleSelect?: boolean
  /**
   * Функция обратного вызова, которая срабатывает при нажатии клавиатуры на сфокусированном дереве
   *
   * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия клавиатуры
   * @param {TreeNodeItem<TItem>} node Выбранный узел дерева
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
   * Функция обратного вызова, которая срабатывает при нажатии кнопки мыши на узел дерева
   *
   * @param {React.KeyboardEvent<HTMLUListElement>} event Объект события нажатия кнопки мыши
   * @param {TreeNodeItem<TItem>} node Выбранный узел дерева
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
   * Функция для получения HTML-свойств для кнопки скрытия/раскрытия узла дерева
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
   * Функция для получения HTML-свойств для группы дочерних узлов дерева
   *
   * @param Элемент дерева
   */
  getNodeGroupInnerProps?: (
    node: TreeNodeItem<TItem>
  ) => ComponentPropsWithoutRefFix<'ul'>
  /**
   * Функция для получения HTML-свойств для узла дерева
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
     * Свойство для переопределения компонентов Tree
     */
    components?: Partial<TreeComponents<TItem>>
    /**
     * Ссылка на компонент, содержащая функции для управления деревом
     */
    ref?:
      | ((instance: TreeImperativeHandlersRef<TItem> | null) => void)
      | React.RefObject<TreeImperativeHandlersRef<TItem>>
      | null
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
   * Объект данных узла дерева
   */
  data: TItem
  /**
   * Глубина вложенности узла дерева
   */
  depth: number
  /**
   * Размер узла дерева
   */
  size: TreeSizeType
  /**
   * Флаг заблокированного узла дерева
   */
  disabled: boolean
  /**
   * Ключ узла дерева
   */
  nodeKey: React.Key
  /**
   * Флаг раскрытого узла дерева
   */
  expanded: boolean
  /**
   * Флаг выбранного узла дерева
   */
  selected: boolean
  /**
   * Состояние загрузки узла дерева
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
       * Получить Ref на HTML-узел дерева
       *
       * @returns Объект-ссылка на HTML-узел дерева
       */
      getElementRef: () => React.RefObject<HTMLElement>
      /**
       * Получить узел дерева, который сейчас находится в фокусе
       *
       * @returns Объект данных узла дерева
       */
      getFocusItem: () => TreeNodeItem<TItem> | undefined
    }

export type GettersProps<TItem = TreeItem> = {
  /**
   * Объект функций для получения ключевых данных, необходимых для формирования метаданных узлов дерева
   */
  getters?: Partial<TreeGetters<TItem>>
}
