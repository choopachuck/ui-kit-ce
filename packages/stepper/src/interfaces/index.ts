export type StepperClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу с `direction='vertical'` */
  vertical?: string
}

export type StepClasses = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу с `direction='vertical'` */
  vertical?: string
  /** Стиль, применяемый к элементу с `active='true'` */
  active?: string
  /** Стиль, применяемый к элементу с `completed='true'` */
  completed?: string
  /** Стиль, применяемый к элементу с `error='true'` */
  error?: string
  /** Стиль, применяемый к элементу с `clickable='true'` */
  clickable?: string
  /** Стиль, применяемый к контейнеру заголовка */
  labelContainer?: string
  /** Стиль, применяемый к контейнеру иконки */
  iconContainer?: string
  /** Стиль, применяемый к бейджу */
  badge?: string
  /** Стиль, применяемый к заголовку */
  label?: string
  /** Стиль, применяемый к линии между бейджами */
  connector?: string
  /** Стиль, применяемый к контейнеру описания */
  descriptionContainer?: string
  /** Стиль, применяемый к содержимому описания */
  description?: string
}
