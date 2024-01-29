export type BarClasses = {
  /** Стиль, применяемый к основному элементу */
  bar?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical и expanded */
  expanded?: string
}

export type SubBarClasses = {
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical и expanded */
  expanded?: string
  /** Стиль, применяемый к основному элементу */
  subBar?: string
  /** Стиль, применяемый к основному элементу, в состоянии lighter */
  lighter?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
  /** Стиль, применяемый к основному элементу, в состоянии darker */
  darker?: string
}

type BarItemClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к текстовому содержимому элемента */
  text?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к иконке, если она есть */
  icon?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
}

export type BarButtonClasses = BarItemClasses & {
  /** Стиль, применяемый к основному элементу, в случае, когда отсутствует текстовое содержимое */
  onlyIcon?: string
  /** Стиль, применяемый к основному элементу */
  button?: string
  /** Стиль, применяемый к основному элементу, в состоянии disabled */
  disabled?: string
}

export type BarDateClasses = BarItemClasses & {
  /** Стиль, применяемый к обертке над временем */
  time?: string
  /** Стиль, применяемый к обертке над датой */
  date?: string
}

export type BarMenuItemClasses = BarItemClasses & {
  /** Стиль, применяемый к основному элементу */
  menuItem?: string
  /** Стиль, применяемый к основному элементу, в состоянии selected, и без disabled */
  selected?: string
  /** Стиль, применяемый к основному элементу, в состоянии disabled */
  disabled?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
}

export type BarDropdownClasses = BarMenuItemClasses & {
  /** Стиль, применяемый к иконке, открывающей выпадашку */
  arrow?: string
  /** Стиль, применяемый к обертке опций */
  list?: string
}

export type BarDropdownItemClasses = {
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к контейнеру опций, в состоянии sm */
  small?: string
  /** Стиль, применяемый к основному элементу */
  medium?: string
  /** Стиль, применяемый к основному элементу, в состоянии lg */
  large?: string
  /** Стиль, применяемый к выпадашке, в состоянии dark */
  popupDark?: string
  /** Стиль, применяемый к выпадашке, в состоянии light */
  popupLight?: string
  /** Стиль, применяемый к выпадашке, в состоянии primary */
  popupPrimary?: string
  /** Стиль, применяемый к контейнеру опций */
  list?: string
}

export type BarSearchClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
}

export type BarSelectClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
}

export type BarDividerClasses = {
  /** Стиль, применяемый к основному элементу */
  divider?: string
  /** Стиль, применяемый к основному элементу, в состоянии vertical */
  vertical?: string
  /** Стиль, применяемый к основному элементу, в состоянии primary */
  primary?: string
  /** Стиль, применяемый к основному элементу, в состоянии dark */
  dark?: string
  /** Стиль, применяемый к основному элементу, в состоянии light */
  light?: string
  /** Стиль, применяемый к основному элементу, в состоянии major */
  major?: string
  /** Стиль, применяемый к основному элементу, в состоянии minor */
  minor?: string
}
