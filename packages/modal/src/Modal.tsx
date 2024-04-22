'use client'

import * as React from 'react'
import { createUseStyles, clsx, Transition } from '@v-uik/theme'
import { Portal, PortalProps } from '@v-uik/portal'
import { TrapFocus, ComponentPropsWithRefFix } from '@v-uik/common'
import {
  useGeneratedId,
  useMergedRefs,
  useBodyScrollLock,
  useLastActiveElementFocus,
  useClassList,
} from '@v-uik/hooks'
import { isEqualKeyboardKeys } from '@v-uik/utils'
import { ModalContext, ModalContextValue } from './ModalContext'
import { Classes } from './classes'

const modalContentMargin = 32

const transitionDuration = 250
const transition = `opacity ${transitionDuration}ms ease-in-out`

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: theme.zIndex.modal,
    color: theme.comp.modal.colorText,
  },

  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.comp.modal.backdropColorBackground,
    transition,
  },

  modalContainer: {
    height: '100%',
    outline: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: `calc(100% - ${2 * modalContentMargin}px)`,
    maxHeight: `calc(100% - ${2 * modalContentMargin}px)`,
    margin: modalContentMargin,
    padding: 32,
    backgroundColor: theme.comp.modal.colorBackground,
    borderTopLeftRadius: theme.comp.modal.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.modal.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.modal.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.modal.shapeBorderRadiusBottomRight,
    transition,
    boxShadow: theme.comp.modal.elevationShadow,

    [`@media screen and (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: 'calc(100% - 32px)',
      maxHeight: 'calc(100% - 32px)',
      margin: 16,
      padding: 24,
    },
  },
}))

interface ModalStylesProps {
  /**
   * Ширина модального окна
   */
  width?: number | string
}

export interface ModalProps
  extends ModalStylesProps,
    ComponentPropsWithRefFix<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
  /**
   * Флаг открытия модального окна
   */
  open?: boolean
  /**
   * HTML-аттрибуты элемента фона окна
   */
  backdropProps?: ComponentPropsWithRefFix<'div'>
  /**
   * HTML-аттрибуты элемента модального окна
   */
  contentProps?: ComponentPropsWithRefFix<'div'>
  /**
   * HTML-элемент или функция, возвращающая HTML-элемент, в который рендерится children
   */
  container?: PortalProps['container']
  /**
   * Отключить срабатывание обработчика onClose при нажатии клавиши Esc
   */
  disableEscapePressHandler?: boolean
  /**
   * Отключить срабатывание обработчика onClose при клике за пределами модального окна
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

export const Modal = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      'aria-labelledby': ariaLabelledbyProp,
      'aria-describedby': ariaDescribedbyProp,
      open = false,
      width = 432,
      backdropProps,
      contentProps,
      container,
      onKeyDown: onKeyDownProp,
      disableEscapePressHandler,
      disableBackdropClickHandler,
      onClose,
      children,
      ...rest
    }: ModalProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [transitionEnded, setTransitionEnded] = React.useState(true)

    const backdropRef = React.useRef(null)
    const contentRef = React.useRef(null)

    useLastActiveElementFocus(open)

    const { lockOnMountNodeRef } = useBodyScrollLock()

    const mergedRef = useMergedRefs([ref, lockOnMountNodeRef])

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root)
    const backdropClassName = clsx(
      backdropProps?.className,
      classesMap.backdrop
    )
    const contentClassName = clsx(
      contentProps?.className,
      classesMap.modalContent
    )

    const ariaLabelledby = useGeneratedId(ariaLabelledbyProp)

    const modalContextValue = React.useMemo<ModalContextValue>(
      () => ({
        titleId: ariaLabelledby,
        onClose,
      }),
      [ariaLabelledby, onClose]
    )

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

    if (!open && transitionEnded) {
      return null
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
                  opacity: state === 'entering' || state === 'entered' ? 1 : 0,
                  ...backdropProps?.style,
                }}
                className={backdropClassName}
                onClick={onBackDropClick}
              />
            )}
          </Transition>

          <TrapFocus>
            <Transition
              appear
              nodeRef={contentRef}
              in={open}
              timeout={transitionDuration}
              onEnter={handleEnterTransition}
              onExited={handleExitedTransition}
            >
              {(state) => (
                <div
                  ref={contentRef}
                  tabIndex={-1}
                  role="presentation"
                  className={classesMap.modalContainer}
                >
                  <div
                    role="dialog"
                    aria-modal={open}
                    aria-labelledby={ariaLabelledby}
                    aria-describedby={ariaDescribedbyProp}
                    {...contentProps}
                    style={{
                      width,
                      opacity:
                        state === 'entering' || state === 'entered' ? 1 : 0,
                      ...contentProps?.style,
                    }}
                    className={contentClassName}
                  >
                    <ModalContext.Provider value={modalContextValue}>
                      {children}
                    </ModalContext.Provider>
                  </div>
                </div>
              )}
            </Transition>
          </TrapFocus>
        </div>
      </Portal>
    )
  }
)
