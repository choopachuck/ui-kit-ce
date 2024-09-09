export type TreeClasses = {
  /** Стиль, применяемый к дереву */
  root?: string
  /** Стиль, применяемый к дереву c `size='xs'` */
  rootExtraSmall?: string
  /** Стиль, применяемый к дереву c `size='sm'`*/
  rootSmall?: string
  /** Стиль, применяемый к дереву c `size='md'` */
  rootMedium?: string
  /** Стиль, применяемый к элементу дерева */
  item?: string
  /** Стиль, применяемый к группе элементов дерева */
  itemGroup?: string
  /** Стиль, применяемый к узлу дерева */
  node?: string
  /** Стиль, применяемый к элементу дерева с `size='xs'` */
  itemExtraSmall?: string
  /** Стиль, применяемый к элементу дерева с `size='sm'` */
  itemSmall?: string
  /** Стиль, применяемый к элементу дерева с `size='md'` */
  itemMedium?: string
  /** Стиль, применяемый к заблокированному элементу дерева */
  itemDisabled?: string
  /** Стиль, применяемый элементу дерева, который находится в фокусе */
  itemFocused?: string
  /** Стиль, применяемый элементу дерева, который подгружает данные */
  itemLoading?: string
  /** Стиль, применяемый к контейнеру всех элементов управления узла */
  nodeControlContainer?: string
  /** Стиль, применяемый ко всем элементам управления узла */
  nodeControl?: string
  /** Стиль, применяемый к контейнеру контента узла */
  nodeContentContainer?: string
  /** Стиль, применяемый к контенту узла дерева */
  nodeContent?: string
  /** Стиль, применяемый к иконке узла дерева */
  nodeIcon?: string
  /** Стиль, применяемый к раскрытому элементу дерева */
  itemExpanded?: string
  /** Стиль, применяемый к элементам с `disableExpand="false"` */
  itemExpandable?: string
  /** Стиль, применяемый к кнопке скрытия/раскрытия узла */
  nodeExpandButton?: string
  /** Стиль, применяемый к контейнеру пути узла дерева */
  trailContainer?: string
  /** Стиль, применяемый к вертикальному пути узла дерева */
  trailVertical?: string
  /** Стиль, применяемый к горизонтальному пути узла дерева */
  trailHorizohtal?: string
  /** Стиль, применяемый к выбранному элементу дерева */
  itemSelected?: string
  /** Стиль, применяемый к элементам с `selectable="true"` */
  itemSelectable?: string
  /** Стиль, применяемый к индикатору у выбранного узла дерева с `multipleSelect="true"` */
  selectedIndicator?: string
}
