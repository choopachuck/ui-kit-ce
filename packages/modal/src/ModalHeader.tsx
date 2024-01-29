'use client'

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Text, TextProps, TextKinds } from '@v-uik/typography'
import { Button, ButtonColor, ButtonKinds, ButtonProps } from '@v-uik/button'
import { ModalContext } from './ModalContext'
import { IconClose } from './assets/IconClose'
import { HeaderClasses } from './classes'

const useStyles = createUseStyles((theme) => ({
  root: {
    position: 'relative',
    flex: '0 0 auto',
  },

  withCloseButton: {
    paddingRight: 40,
  },

  title: {
    '&$titleTypography': {
      fontFamily: theme.comp.modalHeader.typographyFontFamily,
      fontSize: theme.comp.modalHeader.typographyFontSize,
      fontWeight: theme.comp.modalHeader.typographyFontWeight,
      letterSpacing: theme.comp.modalHeader.typographyLetterSpacing,
      lineHeight: theme.comp.modalHeader.typographyLineHeight,
    },
  },
  titleTypography: {},

  subtitle: {
    marginTop: 8,
    color: theme.comp.modalHeader.subtitleColorText,
    '&$subtitleTypography': {
      fontFamily: theme.comp.modalHeader.subtitleTypographyFontFamily,
      fontSize: theme.comp.modalHeader.subtitleTypographyFontSize,
      fontWeight: theme.comp.modalHeader.subtitleTypographyFontWeight,
      letterSpacing: theme.comp.modalHeader.subtitleTypographyLetterSpacing,
      lineHeight: theme.comp.modalHeader.subtitleTypographyLineHeight,
    },
  },
  subtitleTypography: {},

  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    minWidth: 40,
    padding: 7,

    '&:not(:disabled)': {
      color: theme.comp.modalHeader.closeButtonColorText,

      '&:hover': {
        color: theme.comp.modalHeader.closeButtonColorTextHover,
        backgroundColor: theme.comp.modalHeader.closeButtonColorBackgroundHover,
      },

      '&:hover:active': {
        color: theme.comp.modalHeader.closeButtonColorTextActive,
        backgroundColor:
          theme.comp.modalHeader.closeButtonColorBackgroundActive,
      },
    },
  },
}))

export interface ModalHeaderProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<HeaderClasses>
  /**
   * Свойства компонента заголовка
   */
  titleProps?: TextProps
  /**
   * Подзаголовок модального окна
   */
  subtitle?: React.ReactNode
  /**
   * Свойства компонента подзаголовка
   */
  subtitleProps?: TextProps
  /**
   * Отображать ли кнопку закрытия
   */
  showCloseButton?: boolean
  /**
   * Свойства кнопки закрытия
   */
  closeButtonProps?: ButtonProps
}

export const ModalHeader = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      titleProps,
      subtitle,
      subtitleProps,
      showCloseButton = true,
      closeButtonProps,
      children,
      ...rest
    }: ModalHeaderProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.withCloseButton]: showCloseButton,
    })

    const modalContext = React.useContext(ModalContext)

    const onCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      modalContext.onClose?.(event)
      closeButtonProps?.onClick?.(event)
    }

    const titleClassName = clsx(classesMap.title, titleProps?.className, {
      [classesMap.titleTypography]: !titleProps?.kind,
    })

    const subtitleClassName = clsx(
      classesMap.subtitle,
      subtitleProps?.className,
      {
        [classesMap.subtitleTypography]: !subtitleProps?.kind,
      }
    )

    return (
      <div ref={ref} className={className} {...rest}>
        <Text
          kind={TextKinds.h6}
          {...titleProps}
          id={modalContext.titleId}
          className={titleClassName}
        >
          {children}
        </Text>

        {subtitle && (
          <Text
            kind={TextKinds.subtitle1}
            {...subtitleProps}
            className={subtitleClassName}
          >
            {subtitle}
          </Text>
        )}

        {showCloseButton && (
          <Button
            kind={ButtonKinds.ghost}
            color={ButtonColor.secondary}
            {...closeButtonProps}
            className={clsx(
              classesMap.closeButton,
              closeButtonProps?.className
            )}
            onClick={onCloseClick}
          >
            <IconClose />
          </Button>
        )}
      </div>
    )
  }
)
