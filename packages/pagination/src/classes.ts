export type PaginationClasses = {
  /** Стиль, применяемый к основному элементу пагинации */
  root?: string
  /** Стиль, применяемый ко всем элементам пагинации */
  item?: string
  /** Стиль, применяемый ко всем элементам пагинации с `size="sm"` */
  itemSmall?: string
  /** Стиль, применяемый ко всем элементам пагинации с `size="md"` */
  itemMedium?: string
  /** Стиль, применяемый ко всем элементам пагинации с `size="lg"` */
  itemLarge?: string
  /** Стиль, применяемый ко всем неактивным элементам пагинации */
  itemDisabled?: string
  /** Стиль, применяемый к активному элементу пагинации */
  itemSelected?: string
  /** Стиль, применяемый к индикатору активного элемента */
  selectedIndicator?: string
  /** Стиль, применяемый к индикатору активного элемента с `size="sm"` */
  selectedIndicatorSmall?: string
  /** Стиль, применяемый к индикатору активного элемента с `size="md"` */
  selectedIndicatorMedium?: string
  /** Стиль, применяемый к индикатору активного элемента с `size="lg"` */
  selectedIndicatorLarge?: string
  /** Стиль, применяемый к индикатору заблокированного активного элемента */
  selectedIndicatorDisabled?: string
  /** Стиль, применяемый ко всем скрытым элементам пагинации */
  itemOverflow?: string
  /** Стиль, применяемый ко всем навигационным кнопкам пагинации */
  navigationButton?: string
  /** Стиль, применяемый к навигационной кнопке предыдущей страницы */
  navigationButtonPrevious?: string
  /** Стиль, применяемый к навигационной кнопке следующей страницы  */
  navigationButtonNext?: string
  /** Стиль, применяемый к навигационной кнопке первой страницы */
  navigationButtonFirst?: string
  /** Стиль, применяемый к навигационной кнопке последней страницы  */
  navigationButtonLast?: string
}
