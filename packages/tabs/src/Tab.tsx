import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { TabsContext } from './TabsContext'
import { TabClasses } from './interfaces'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export interface TabProps extends ComponentPropsWithRefFix<'button'> {
  /**
   * Список классов
   */
  classes?: Partial<TabClasses>
  /**
   * Значение вкладки
   */
  value: React.ReactText
  /**
   * Заголовок вкладки
   */
  header: React.ReactNode
  /**
   * Принудительный рендеринг контента во вкладках, а не ленивый рендеринг после нажатия на вкладки
   */
  forceRender?: boolean
}

export const Tab = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      value,
      header,
      onClick,
      forceRender,
      ...rest
    }: TabProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const tabsContext = React.useContext(TabsContext)

    const className = clsx(
      classNameProp,
      classes?.tab,
      tabsContext.value === value ? classes?.selected : ''
    )

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      tabsContext.onChange?.(value)
      onClick?.(event)
    }

    return (
      <button
        {...rest}
        ref={ref}
        className={className}
        type="button"
        onClick={handleClick}
      >
        <span className={classes?.text}>{header}</span>
      </button>
    )
  }
)
