export type TreeClasses = {
  //#region Классы стилей основного дерева
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к основному элементу c `size='xs'` */
  rootExtraSmall?: string
  /** Стиль, применяемый к основному элементу c `size='sm'`*/
  rootSmall?: string
  /** Стиль, применяемый к основному элементу c `size='md'` */
  rootMedium?: string
  //#endregion

  //#region Классы стилей элементов дерева
  /** Стиль, применяемый к элементу дерева */
  item?: string
  /** Стиль, применяемый к группе элементов дерева */
  itemGroup?: string
  /** Стиль, применяемый к контейнеру элемента дерева */
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
  //#endregion

  //#region Классы стилей элементов управления
  /** Стиль, применяемый к контейнеру всех элементов управления деревом */
  nodeControlContainer?: string
  /** Стиль, применяемый ко всем элементам управления деревом */
  nodeControl?: string
  /** Стиль, применяемый к контейнеру контента у элемента дерева */
  nodeContentContainer?: string
  /** Стиль, применяемый к контенту у элемента дерева */
  nodeContent?: string
  /** Стиль, применяемый к иконке элемента дерева */
  nodeIcon?: string
  //#endregion

  /** Стиль, применяемый к раскрытому элементу дерева */
  itemExpanded?: string
  /** Стиль, применяемый к элементам с `disableExpand="false"` */
  itemExpandable?: string
  /** Стиль, применяемый к кнопке скрытия/раскрытия */
  nodeExpandButton?: string

  //#region Классы стилей для путей у элементов дерева
  /** Стиль, применяемый к контейнеру пути элемента дерева */
  trailContainer?: string
  /** Стиль, применяемый к вертикальному пути элемента дерева */
  trailVertical?: string
  /** Стиль, применяемый к горизонтальному пути элемента дерева */
  trailHorizohtal?: string
  //#endregion

  /** Стиль, применяемый к выбранному элементу дерева */
  itemSelected?: string
  /** Стиль, применяемый к элементам с `selectable="true"` */
  itemSelectable?: string
  /** Стиль, применяемый к индикатору у выбранного элементу дерева с `multipleSelect="true"` */
  selectedIndicator?: string
}
