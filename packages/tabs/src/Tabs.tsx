'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { hasElementType, isEqualKeyboardKeys } from '@v-uik/utils'
import {
  Direction,
  DirectionType,
  ComponentPropsWithRefFix,
} from '@v-uik/common'
import { Tab, TabProps } from './Tab'
import { TabsContext, TabsContextValue } from './TabsContext'
import { TabsClasses } from './interfaces'

const useStyles = createUseStyles((theme) => ({
  root: {
    color: theme.comp.tabs.rootColorText,
  },

  tabs: {
    display: 'flex',
    overflowX: 'auto',
    boxSizing: 'border-box',
  },

  tab: {
    display: 'flex',
    alignItems: 'center',
    flex: '0 0 auto',
    position: 'relative',
    padding: [8, 16],
    borderTopLeftRadius: theme.comp.tabs.tabShapeBorderRadiusTopLeftHorizontal,
    borderTopRightRadius:
      theme.comp.tabs.tabShapeBorderRadiusTopRightHorizontal,
    borderBottomLeftRadius:
      theme.comp.tabs.tabShapeBorderRadiusBottomLeftHorizontal,
    borderBottomRightRadius:
      theme.comp.tabs.tabShapeBorderRadiusBottomRightHorizontal,
    border: 0,
    backgroundColor: 'transparent',
    color: theme.comp.tabs.tabColorText,

    '&:disabled': {
      color: theme.comp.tabs.tabColorTextDisabled,
      pointerEvents: 'none',
    },

    '&:hover:not(:disabled):not($selected)': {
      color: theme.comp.tabs.tabColorTextHover,
      backgroundColor: theme.comp.tabs.tabColorBackgroundHover,
      cursor: 'pointer',
    },

    '&:focus': {
      outline: 'none',
    },

    '&:focus-visible': {
      boxShadow: `inset 0 0 0 2px ${theme.comp.tabs.tabColorShadowFocus}`,
    },
  },

  text: {
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',

    fontFamily: theme.comp.tabs.tabTypographyFontFamily,
    fontWeight: theme.comp.tabs.tabTypographyFontWeight,
    fontSize: theme.comp.tabs.tabTypographyFontSize,
    lineHeight: theme.comp.tabs.tabTypographyLineHeight,
    letterSpacing: theme.comp.tabs.tabTypographyLetterSpacing,
  },

  selected: {
    boxShadow: 'none',
    color: theme.comp.tabs.tabColorTextSelected,

    '&:not(:focus-visible)::after': {
      content: '""',
      backgroundColor: theme.comp.tabs.tabIndicatorColorBackgroundSelected,
      position: 'absolute',
      display: 'block',
      height: '2px',
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: [1, 1, 0, 0],
    },
  },

  content: {
    flex: 1,
    padding: [12, 16],
    boxShadow: `0 -${theme.shape.borderWidth}px 0 0 ${theme.comp.tabs.contentColorShadow}`,

    //TODO: оставлено для визуальной обратной совместимости.
    //По аналогии с Modal и Drawer токенов и внутренней стилизации типографики
    //для контента тут быть не должно. Удалить в 2.0
    fontFamily: theme.typography.fontFamily.text,
    fontWeight: theme.typography.fontWeight.regular,
    fontSize: theme.typography.fontSize.body2,
    lineHeight: theme.typography.lineHeight.body2,
    letterSpacing: theme.typography.letterSpacing.body2,
  },

  vertical: {
    display: 'flex',
    height: 'inherit',
    maxHeight: 'inherit',
    minHeight: 'inherit',

    '&>$tabs': {
      flexDirection: 'column',
      overflowY: 'auto',
      '&>$tab': {
        borderTopLeftRadius:
          theme.comp.tabs.tabShapeBorderRadiusTopLeftVertical,
        borderTopRightRadius:
          theme.comp.tabs.tabShapeBorderRadiusTopRightVertical,
        borderBottomLeftRadius:
          theme.comp.tabs.tabShapeBorderRadiusBottomLeftVertical,
        borderBottomRightRadius:
          theme.comp.tabs.tabShapeBorderRadiusBottomRightVertical,
        '&$selected': {
          '&::after': {
            height: 'auto',
            top: 0,
            left: 'auto',
            width: 2,
            borderRadius: [1, 0, 0, 1],
          },
        },
      },
    },

    '&>$content': {
      boxShadow: `-${theme.shape.borderWidth}px 0 0 0 ${theme.comp.tabs.contentColorShadow}`,
    },

    '&$filled': {
      '&>$tabs': {
        '&>$tab': {
          borderTopLeftRadius:
            theme.comp.tabs.tabShapeBorderRadiusTopLeftFilledVertical,
          borderTopRightRadius:
            theme.comp.tabs.tabShapeBorderRadiusTopRightFilledVertical,
          borderBottomLeftRadius:
            theme.comp.tabs.tabShapeBorderRadiusBottomLeftFilledVertical,
          borderBottomRightRadius:
            theme.comp.tabs.tabShapeBorderRadiusBottomRightFilledVertical,

          '&$selected': {
            boxShadow: `inset ${theme.shape.borderWidth}px 0 0 ${theme.comp.tabs.tabColorShadowFilledSelected},
                                inset 0 -${theme.shape.borderWidth}px 0 ${theme.comp.tabs.tabColorShadowFilledSelected},
                                inset 0 ${theme.shape.borderWidth}px 0 ${theme.comp.tabs.tabColorShadowFilledSelected}`,

            '&::after': {
              height: 'auto',
              left: 'auto',
              right: 0,
              top: 8,
              bottom: 8,
            },

            '&:focus-visible': {
              boxShadow: `inset 0 0 0 2px ${theme.comp.tabs.tabColorShadowFilledFocus}`,
            },
          },
        },
      },

      '&>$content': {
        marginTop: 0,
        marginLeft: -theme.shape.borderWidth,
        flex: 1,
        borderTopLeftRadius:
          theme.comp.tabs.contentShapeBorderRadiusTopLeftFilledVertical,
        borderTopRightRadius:
          theme.comp.tabs.contentShapeBorderRadiusTopRightFilledVertical,
        borderBottomLeftRadius:
          theme.comp.tabs.contentShapeBorderRadiusBottomLeftFilledVertical,
        borderBottomRightRadius:
          theme.comp.tabs.contentShapeBorderRadiusBottomRightFilledVertical,
      },
    },
  },

  filled: {
    '&>$tabs': {
      '&>$tab': {
        borderTopLeftRadius:
          theme.comp.tabs.tabShapeBorderRadiusTopLeftFilledHorizontal,
        borderTopRightRadius:
          theme.comp.tabs.tabShapeBorderRadiusTopRightFilledHorizontal,
        borderBottomLeftRadius:
          theme.comp.tabs.tabShapeBorderRadiusBottomLeftFilledHorizontal,
        borderBottomRightRadius:
          theme.comp.tabs.tabShapeBorderRadiusBottomRightFilledHorizontal,
        '&$selected': {
          backgroundColor: theme.comp.tabs.tabColorBackgroundFilledSelected,
          boxShadow: `inset 0 ${theme.shape.borderWidth}px ${theme.comp.tabs.tabColorShadowFilledSelected},
                              inset -${theme.shape.borderWidth}px 0 ${theme.comp.tabs.tabColorShadowFilledSelected},
                              inset ${theme.shape.borderWidth}px 0 ${theme.comp.tabs.tabColorShadowFilledSelected}`,

          '&::after': {
            left: 16,
            right: 16,
          },

          '&:focus-visible': {
            boxShadow: `inset 0 0 0 2px ${theme.comp.tabs.tabColorShadowFilledFocus}`,
          },
        },
      },
    },

    '&>$content': {
      marginTop: -theme.shape.borderWidth,
      backgroundColor: theme.comp.tabs.contentColorBackgroundFilled,
      borderWidth: theme.shape.borderWidth,
      borderStyle: theme.shape.borderStyle,
      borderColor: theme.comp.tabs.contentColorBorderFilled,
      borderTopLeftRadius:
        theme.comp.tabs.contentShapeBorderRadiusTopLeftFilledHorizontal,
      borderTopRightRadius:
        theme.comp.tabs.contentShapeBorderRadiusTopRightFilledHorizontal,
      borderBottomLeftRadius:
        theme.comp.tabs.contentShapeBorderRadiusBottomLeftFilledHorizontal,
      borderBottomRightRadius:
        theme.comp.tabs.contentShapeBorderRadiusBottomRightFilledHorizontal,
      boxShadow: 'none',
    },
  },
}))

export const TabsKinds = {
  default: 'default',
  filled: 'filled',
} as const

export type TTabsKinds = keyof typeof TabsKinds

export interface TabsProps
  extends Omit<ComponentPropsWithRefFix<'div'>, 'onChange'> {
  /**
   * Список классов
   */
  classes?: Partial<TabsClasses>
  /**
   * Тип стиля табов.
   * default - по-умолчанию,
   * filled - с заливкой,
   */
  kind?: TTabsKinds
  /**
   * Направление расположения табов.
   */
  direction?: DirectionType
  /**
   * Значение выбранного таба
   */
  value?: React.ReactText
  /**
   * Обработчик изменения выбранного таба
   */
  onChange?: (value: React.ReactText) => void
  /**
   * Значение по умолчанию
   */
  defaultValue?: React.ReactText
  /**
   * Флаг, указывающий выбор таба с помощью кнопок навигации (стрелик)
   */
  keyboardAutoSelect?: boolean
}

const ARROW_RIGHT_KEY = 'ArrowRight'
const ARROW_LEFT_KEY = 'ArrowLeft'
const ARROW_UP_KEY = 'ArrowUp'
const ARROW_DOWN_KEY = 'ArrowDown'

export const Tabs = React.forwardRef(
  (
    {
      className: classNameProp,
      onChange,
      value,
      children,
      direction = Direction.horizontal,
      classes,
      kind = TabsKinds.default,
      defaultValue,
      keyboardAutoSelect = true,
      ...rest
    }: TabsProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.vertical]: direction === Direction.vertical,
      [classesMap.filled]: kind === TabsKinds.filled,
    })

    const tabsRef = React.useRef<HTMLDivElement>(null)

    const [currentValue, setCurrentValue] = React.useState(
      value ?? defaultValue ?? '0'
    )

    React.useEffect(() => {
      if (value !== currentValue) {
        const newVal = value ?? defaultValue ?? '0'
        setCurrentValue(newVal)
      }
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    const getValidChildren = () => {
      return React.Children.toArray(children).filter((child) => {
        return hasElementType(child, Tab)
      })
    }

    const handleChange = React.useCallback(
      (value: React.ReactText) => {
        setCurrentValue(value)
        onChange?.(value)
      },
      [setCurrentValue, onChange]
    )

    const renderTabs = () => {
      return React.Children.map(getValidChildren(), (child) => {
        if (React.isValidElement<TabProps>(child)) {
          const { value } = child.props

          const isSelected = value === currentValue

          const classes = {
            ...child.props.classes,
            tab: clsx(child.props.classes?.tab, classesMap.tab),
            selected: clsx(child.props.classes?.selected, classesMap.selected),
            text: clsx(child.props.classes?.text, classesMap.text),
          }

          /**
           * aria пропсы + обычные пропсы
           */
          const props = {
            tabIndex: isSelected ? 0 : -1,
            'aria-selected': isSelected,
            role: 'tab',
            'aria-controls': value as string,
            'aria-disabled': child.props.disabled,
            ...child.props,
          }

          return <Tab {...props} classes={classes} />
        }

        return null
      })
    }

    const renderContent = () => {
      return React.Children.map(getValidChildren(), (child) => {
        if (React.isValidElement<TabProps>(child)) {
          const { value, children, forceRender } = child.props

          const isSelected = value === currentValue

          if (isSelected && !forceRender) {
            return <div className={classesMap.content}>{children}</div>
          }

          if (forceRender) {
            return (
              <div
                className={classesMap.content}
                style={{ display: isSelected ? undefined : 'none' }}
              >
                {children}
              </div>
            )
          }
        }

        return null
      })
    }

    const tabsContext = React.useMemo<TabsContextValue>(
      () => ({
        value: currentValue,
        onChange: handleChange,
      }),
      [currentValue, handleChange]
    )

    // TODO вынести в утилиты
    const findFocusableSibling = (
      element: HTMLElement,
      previous = false
    ): HTMLElement | null => {
      const sibling = previous
        ? (element.previousElementSibling as HTMLElement)
        : (element.nextElementSibling as HTMLElement)

      if (sibling) {
        if (sibling.getAttribute('aria-disabled') !== 'true') {
          return sibling
        } else {
          return findFocusableSibling(sibling, previous)
        }
      }

      return null
    }

    // TODO вынести в утилиты
    const findLastFocusableSibling = (
      element: HTMLElement,
      previous = false
    ): HTMLElement | null => {
      let lastSibling: HTMLElement | null = null
      let currentSibling = findFocusableSibling(element, previous)

      while (currentSibling) {
        lastSibling = currentSibling
        currentSibling = findFocusableSibling(currentSibling, previous)
      }

      return lastSibling
    }

    const searchNextSiblingInTabs = React.useCallback(
      (element: HTMLElement, previous: boolean): HTMLElement | null => {
        const sibling = findFocusableSibling(element, previous)

        if (sibling) {
          return sibling
        }

        return findLastFocusableSibling(element, !previous)
      },
      [findFocusableSibling, findLastFocusableSibling]
    )

    /**
     * Калбек для отработки нажатия на кнопку
     */
    const handleOnKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
      React.useCallback(
        (event) => {
          const currentFocusableElement =
            document.activeElement as HTMLElement | null

          if (!tabsRef.current || !currentFocusableElement) {
            return
          }
          const tabElementsArray = Array.from(
            tabsRef.current.children
          ) as (HTMLElement | null)[]

          /**
           * Проверка на то, что фокусированный элемент находится в Tabs
           */
          if (!tabElementsArray.includes(currentFocusableElement)) {
            return
          }

          let sibling: HTMLElement | null = null

          /**
           * В зависиомсти от direction будут отрабатываться разные клавиши. (https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)
           */
          if (direction === Direction.horizontal) {
            if ([ARROW_LEFT_KEY, ARROW_RIGHT_KEY].includes(event.key)) {
              event.preventDefault()
              sibling = searchNextSiblingInTabs(
                currentFocusableElement,
                isEqualKeyboardKeys(ARROW_LEFT_KEY, event.key)
              )
            }
          }

          if (direction === Direction.vertical) {
            if ([ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
              event.preventDefault()
              sibling = searchNextSiblingInTabs(
                currentFocusableElement,
                isEqualKeyboardKeys(ARROW_UP_KEY, event.key)
              )
            }
          }

          if (sibling) {
            sibling.focus()
            if (keyboardAutoSelect) {
              sibling.click()
            }
          }
        },
        [keyboardAutoSelect, direction, searchNextSiblingInTabs]
      )

    return (
      <div {...rest} ref={ref} className={className}>
        <div
          ref={tabsRef}
          className={classesMap.tabs}
          role="tablist"
          aria-orientation={direction}
          onKeyDown={handleOnKeyDown}
        >
          <TabsContext.Provider value={tabsContext}>
            {renderTabs()}
          </TabsContext.Provider>
        </div>
        {renderContent()}
      </div>
    )
  }
)
