'use client'

import * as React from 'react'
import { createUseStyles, clsx, useTheme, Theme } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { Text, TextProps, TextKinds } from '@v-uik/typography'
import { ButtonProps } from '@v-uik/button'
import { defaultPadding } from './constants'
import { IconClose } from './assets/IconClose'
import { CloseButton } from '@v-uik/common'
import { pick } from '@v-uik/utils'

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
      fontSize: theme.comp.drawerHeader.typographyFontSize,
      fontFamily: theme.comp.drawerHeader.typographyFontFamily,
      lineHeight: theme.comp.drawerHeader.typographyLineHeight,
      letterSpacing: theme.comp.drawerHeader.typographyLetterSpacing,
      fontWeight: theme.comp.drawerHeader.typographyFontWeight,
    },
  },
  titleTypography: {},

  subtitle: {
    marginTop: 8,
    color: theme.comp.drawerHeader.subtitleColorText,
    '&$subtitleTypography': {
      fontSize: theme.comp.drawerHeader.subtitleTypographyFontSize,
      fontFamily: theme.comp.drawerHeader.subtitleTypographyFontFamily,
      lineHeight: theme.comp.drawerHeader.subtitleTypographyLineHeight,
      letterSpacing: theme.comp.drawerHeader.subtitleTypographyLetterSpacing,
      fontWeight: theme.comp.drawerHeader.subtitleTypographyFontWeight,
    },
  },

  subtitleTypography: {},

  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },

  divider: {
    margin: `24px -${defaultPadding}px 0`,
    borderColor: theme.comp.drawerHeader.dividerColorBorder,
    borderWidth: 0,
    borderTopWidth: 1,
  },
}))

type Classes = {
  /** Стиль, применяемый к основному элементу */
  root?: string
  /** Стиль, применяемый к элементу c `showCloseButton='true'`*/
  withCloseButton?: string
  /** Стиль, применяемый к элементу заголовка `*/
  title?: string
  /** Стиль, применяемый к элементу заголовка при отсутствии `titleProps` */
  titleTypography?: string
  /** Стиль, применяемый к элементу подзаголовка */
  subtitle?: string
  /** Стиль, применяемый к элементу подзаголовка при отсутствии `titleProps` */
  subtitleTypography?: string
  /** Стиль, применяемый к элементу кнопки закрытия при `showCloseButton='false'` */
  closeButton?: string
  /** Стиль, применяемый к элементу разделителю */
  divider?: string
}

export interface DrawerHeaderProps extends React.ComponentPropsWithRef<'div'> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<Classes>
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
  closeButtonProps?: ButtonProps //TODO: 2.0 ButtonProps оставлены для обратной совместимости, должны быть HTMLProps Button
  /**
   * Обработчик нажатия кнопки закрытия
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Свойства элемента-разделителя
   */
  dividerProps?: React.HTMLAttributes<HTMLHRElement>
}

export const DrawerHeader = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      titleProps,
      subtitle,
      subtitleProps,
      showCloseButton = true,
      closeButtonProps,
      onClose,
      dividerProps,
      children,
      ...rest
    }: DrawerHeaderProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const className = clsx(classNameProp, classesMap.root, {
      [classesMap.withCloseButton]: showCloseButton,
    })

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

    const drawerHeaderComp = useTheme().comp.drawerHeader

    const closeButtonTokens = pick<
      typeof drawerHeaderComp,
      Theme['comp']['closeButton']
    >(drawerHeaderComp, /^closeButton/, (v) =>
      v.replace(/^(closeButton)([A-Z])/, (_$1, _$2, $3: string) =>
        $3.toLowerCase()
      )
    )

    return (
      <>
        <div ref={ref} className={className} {...rest}>
          <Text kind={TextKinds.h6} {...titleProps} className={titleClassName}>
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
            <CloseButton
              tokens={closeButtonTokens}
              onClick={onClose}
              {...closeButtonProps}
              className={clsx(
                classesMap.closeButton,
                closeButtonProps?.className
              )}
            >
              <IconClose />
            </CloseButton>
          )}
        </div>

        <hr
          {...dividerProps}
          className={clsx(classesMap.divider, dividerProps?.className)}
        />
      </>
    )
  }
)
