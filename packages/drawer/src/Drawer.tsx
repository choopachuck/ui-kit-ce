'use client'

import * as React from 'react'
import { createUseStyles, clsx, Transition, CSSTransition } from '@v-uik/theme'
import { Portal, PortalProps } from '@v-uik/portal'
import { TrapFocus } from '@v-uik/common'
import {
  useMergedRefs,
  useBodyScrollLock,
  useLastActiveElementFocus,
  useClassList,
} from '@v-uik/hooks'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { DrawerPlacement, DrawerPlacementType } from './interfaces'
import { defaultPadding } from './constants'
import { Classes } from './interfaces/classes'

const transitionDuration = 250
const backdropTransition = `opacity ${transitionDuration}ms ease-in-out`
const drawerTransition = `transform ${transitionDuration}ms ease-out`
const defaultSize = 432

const getDynamicStyles = ({ width, height, placement }: DrawerStyleProps) => {
  return {
    content: {
      width:
        placement === DrawerPlacement.right ||
        placement === DrawerPlacement.left
          ? width || defaultSize
          : 'auto',
      height:
        placement === DrawerPlacement.top ||
        placement === DrawerPlacement.bottom
          ? height || defaultSize
          : 'auto',
    },
  }
}
const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer,
    color: theme.comp.drawer.colorText,
  },

  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.comp.drawer.backdropColorBackground,
    transition: backdropTransition,
  },

  nonModalContainer: {
    position: 'fixed',
    width: 0,
    zIndex: theme.zIndex.drawer,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    '&$top': {
      bottom: 'auto',
    },
    '&$bottom': {
      top: 'auto',
    },
    '&$left': {
      right: 'auto',
    },
    '&$right': {
      left: 'auto',
    },
  },

  top: {},
  bottom: {},
  left: {},
  right: {},
  hasBackdrop: {},
  isOpen: {},

  content: {
    boxSizing: 'border-box',

    '&$top': {
      borderTopLeftRadius:
        theme.comp.drawer.shapeBorderRadiusTopLeftPlacementTop,
      borderTopRightRadius:
        theme.comp.drawer.shapeBorderRadiusTopRightPlacementTop,
      borderBottomLeftRadius:
        theme.comp.drawer.shapeBorderRadiusBottomLeftPlacementTop,
      borderBottomRightRadius:
        theme.comp.drawer.shapeBorderRadiusBottomRightPlacementTop,
      maxHeight: 'calc(100vh - 32px)',

      bottom: 'auto',
      borderBottomWidth: 1,
    },
    '&$bottom': {
      borderTopLeftRadius:
        theme.comp.drawer.shapeBorderRadiusTopLeftPlacementBottom,
      borderTopRightRadius:
        theme.comp.drawer.shapeBorderRadiusTopRightPlacementBottom,
      borderBottomLeftRadius:
        theme.comp.drawer.shapeBorderRadiusBottomLeftPlacementBottom,
      borderBottomRightRadius:
        theme.comp.drawer.shapeBorderRadiusBottomRightPlacementBottom,
      maxHeight: 'calc(100vh - 32px)',

      top: 'auto',
      borderTopWidth: 1,
    },
    '&$left': {
      borderTopLeftRadius:
        theme.comp.drawer.shapeBorderRadiusTopLeftPlacementLeft,
      borderTopRightRadius:
        theme.comp.drawer.shapeBorderRadiusTopRightPlacementLeft,
      borderBottomLeftRadius:
        theme.comp.drawer.shapeBorderRadiusBottomLeftPlacementLeft,
      borderBottomRightRadius:
        theme.comp.drawer.shapeBorderRadiusBottomRightPlacementLeft,
      maxWidth: 'calc(100vw - 32px)',

      right: 'auto',
      borderRightWidth: 1,
    },
    '&$right': {
      borderTopLeftRadius:
        theme.comp.drawer.shapeBorderRadiusTopLeftPlacementRight,
      borderTopRightRadius:
        theme.comp.drawer.shapeBorderRadiusTopRightPlacementRight,
      borderBottomLeftRadius:
        theme.comp.drawer.shapeBorderRadiusBottomLeftPlacementRight,
      borderBottomRightRadius:
        theme.comp.drawer.shapeBorderRadiusBottomRightPlacementRight,
      maxWidth: 'calc(100vw - 32px)',

      left: 'auto',
      borderLeftWidth: 1,
    },
    position: 'absolute',
    '&$hasBackdrop': {
      position: 'fixed',
    },
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.drawer,
    padding: defaultPadding,
    backgroundColor: theme.comp.drawer.colorBackground,
    borderColor: theme.comp.drawer.colorBorder,
    borderStyle: theme.shape.borderStyle,
    '&$isOpen': {
      boxShadow: theme.comp.drawer.elevationShadow,
    },
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },

  drawerAppear: {
    transform: 'translateX(100%)',
  },

  drawerAppearNegative: {
    transform: 'translateX(-100%)',
  },

  drawerAppearVertical: {
    transform: 'translateY(100%)',
  },

  drawerAppearVerticalNegative: {
    transform: 'translateY(-100%)',
  },

  drawerAppearActive: {
    transform: 'none',
    transition: drawerTransition,
  },

  drawerExit: {
    transform: 'none',
  },

  drawerExitActive: {
    transition: drawerTransition,
    transform: 'translateX(100%)',
  },

  drawerExitActiveNegative: {
    transition: drawerTransition,
    transform: 'translateX(-100%)',
  },

  drawerExitActiveVertical: {
    transition: drawerTransition,
    transform: 'translateY(100%)',
  },

  drawerExitActiveVerticalNegative: {
    transition: drawerTransition,
    transform: 'translateY(-100%)',
  },
}))

interface DrawerStyleProps {
  /**
   * Расположение относительно границ экрана
   */
  placement?: DrawerPlacementType
  /**
   * Показать/скрыть затемнение фона
   */
  backdrop?: boolean
  /**
   * Показать/скрыть элемент
   */
  open?: boolean
  /**
   * Ширина элемента
   */
  width?: number | string
  /**
   * Высота элемента
   */
  height?: number | string
}

export interface DrawerProps
  extends DrawerStyleProps,
    React.ComponentPropsWithRef<'div'> {
  /**
   * CSS классы компонента
   */
  classes?: Partial<Classes>
  /**
   * Флаг блокировки скролла страницы
   */
  bodyScrollLock?: boolean
  /**
   * HTML-аттрибуты элемента фона окна
   */
  backdropProps?: React.HTMLAttributes<HTMLDivElement> & {
    ref?: React.Ref<HTMLDivElement>
  }
  /**
   * Свойства HTML-элемента панели
   */
  contentProps?: React.ComponentPropsWithRef<'div'>
  /**
   * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children
   */
  container?: PortalProps['container']
  /**
   * Отключить срабатывание обработчика onClose при нажатии клавиши Esc
   */
  disableEscapePressHandler?: boolean
  /**
   * Отключить срабатывание обработчика onClose при клике за пределами панели
   */
  disableBackdropClickHandler?: boolean
  /**
   * Обработчик закрытия окна
   */
  onClose?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void
}

export const Drawer = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      open = false,
      width,
      height,
      backdrop = true,
      bodyScrollLock = true,
      placement = DrawerPlacement.right,
      backdropProps,
      contentProps,
      container,
      onKeyDown: onKeyDownProp,
      disableEscapePressHandler,
      disableBackdropClickHandler,
      onClose,
      children,
      ...rest
    }: DrawerProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [transitionEnded, setTransitionEnded] = React.useState(true)

    const backdropRef = React.useRef(null)
    const drawerRef = React.useRef(null)

    useLastActiveElementFocus(open)

    const { lockOnMountNodeRef } = useBodyScrollLock()

    const mergedRef = useMergedRefs([
      ref,
      bodyScrollLock ? lockOnMountNodeRef : null,
    ])

    const classesList = useStyles()
    const dynamicStyles = getDynamicStyles({
      placement,
      backdrop,
      open,
      width,
      height,
    })
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root)
    const backdropClassName = clsx(
      backdropProps?.className,
      classesMap.backdrop
    )
    const contentClassName = clsx(contentProps?.className, classesMap.content, {
      [classesMap.top]: placement === DrawerPlacement.top,
      [classesMap.bottom]: placement === DrawerPlacement.bottom,
      [classesMap.left]: placement === DrawerPlacement.left,
      [classesMap.right]: placement === DrawerPlacement.right,
      [classesMap.hasBackdrop]: backdrop,
      [classesMap.isOpen]: open,
    })

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDownProp?.(event)

      if (
        !disableEscapePressHandler &&
        isEqualKeyboardKeys('Escape', event.key)
      ) {
        event.stopPropagation()
        onClose?.(event)
      }
    }

    const onBackDropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      backdropProps?.onClick?.(event)

      if (
        !disableBackdropClickHandler &&
        event.target === event.currentTarget
      ) {
        onClose?.(event)
      }
    }

    const handleEnterTransition = () => {
      setTransitionEnded(false)
    }

    const handleExitedTransition = () => {
      setTransitionEnded(true)
    }

    const transitionClassNames = React.useMemo(() => {
      const isVertical =
        placement === DrawerPlacement.top ||
        placement === DrawerPlacement.bottom
      const isNegativeTransformPosition =
        placement === DrawerPlacement.top || placement === DrawerPlacement.left

      let transitionAppearClassName: Extract<
        keyof typeof classesMap,
        | 'drawerAppear'
        | 'drawerAppearVertical'
        | 'drawerAppearNegative'
        | 'drawerAppearVerticalNegative'
      > = 'drawerAppear'

      let transitionExitClassName: Extract<
        keyof typeof classesMap,
        | 'drawerExitActive'
        | 'drawerExitActiveVertical'
        | 'drawerExitActiveNegative'
        | 'drawerExitActiveVerticalNegative'
      > = 'drawerExitActive'

      if (isVertical && isNegativeTransformPosition) {
        transitionAppearClassName = 'drawerAppearVerticalNegative'
        transitionExitClassName = 'drawerExitActiveVerticalNegative'
      } else {
        if (isVertical) {
          transitionAppearClassName = 'drawerAppearVertical'
          transitionExitClassName = 'drawerExitActiveVertical'
        }
        if (isNegativeTransformPosition) {
          transitionAppearClassName = 'drawerAppearNegative'
          transitionExitClassName = 'drawerExitActiveNegative'
        }
      }

      return {
        appear:
          transitionAppearClassName && classesMap[transitionAppearClassName],
        appearActive: classesMap.drawerAppearActive,
        exit: classesMap.drawerExit,
        exitActive:
          transitionExitClassName && classesMap[transitionExitClassName],
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placement])

    if (!open && transitionEnded) {
      return null
    }

    // CSSTransition используется для корректной работы анимации появления,
    // при использовании Transition, браузер оптимизирует и добавляет стили
    // для состояний enter и enter-active за один тик, тем самым ломая анимацию
    const drawer = (
      <CSSTransition
        appear
        nodeRef={drawerRef}
        in={open}
        timeout={transitionDuration}
        classNames={transitionClassNames}
        onEnter={handleEnterTransition}
        onExited={handleExitedTransition}
      >
        <div
          ref={drawerRef}
          role={backdrop ? 'dialog' : undefined}
          aria-modal={backdrop ? open : undefined}
          {...contentProps}
          style={{ ...dynamicStyles.content, ...(contentProps?.style ?? {}) }}
          className={contentClassName}
        >
          {children}
        </div>
      </CSSTransition>
    )

    if (!backdrop) {
      const drawerWithContainer = (
        <div
          {...rest}
          ref={mergedRef}
          className={clsx(classesMap.nonModalContainer, {
            [classesMap.top]: placement === DrawerPlacement.top,
            [classesMap.bottom]: placement === DrawerPlacement.bottom,
            [classesMap.left]: placement === DrawerPlacement.left,
            [classesMap.right]: placement === DrawerPlacement.right,
          })}
        >
          {drawer}
        </div>
      )

      if (container) {
        return <Portal container={container}>{drawerWithContainer}</Portal>
      }

      return drawerWithContainer
    }

    return (
      <Portal container={container}>
        <div
          ref={mergedRef}
          role="presentation"
          {...rest}
          className={className}
          onKeyDown={onKeyDown}
        >
          {backdrop && (
            <Transition
              appear
              nodeRef={backdropRef}
              in={open}
              timeout={transitionDuration}
            >
              {(state) => (
                <div
                  ref={backdropRef}
                  aria-hidden
                  {...backdropProps}
                  style={{
                    opacity:
                      state === 'entering' || state === 'entered' ? 1 : 0,
                    ...backdropProps?.style,
                  }}
                  className={backdropClassName}
                  onClick={onBackDropClick}
                />
              )}
            </Transition>
          )}

          <TrapFocus>{drawer}</TrapFocus>
        </div>
      </Portal>
    )
  }
)
