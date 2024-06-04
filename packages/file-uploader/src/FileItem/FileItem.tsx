'use client'

import * as React from 'react'
import { Box, PolymorphicComponentProps } from '@v-uik/box'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { FileItemComponents, FileStatus, ProgressType } from './types'
import { FileItemIconButton } from './FileItemIconButton'
import DefaultExitIcon from './icons/ExitIcon'
import { FileItemStatus } from './FileItemStatus'
import {
  CircularProgress as DefaultCircularProgress,
  LinearProgress as DefaultLinearProgress,
} from '@v-uik/progress'
import { getIconSize } from './utils'
import DefaultSuccessIcon from './icons/SuccessIcon'
import DefaultErrorIcon from './icons/ErrorIcon'
import { FileItemClasses } from './classes'
import { ElementSizeType, ComponentPropsWithRefFix } from '@v-uik/common'

const defaultComponents: FileItemComponents = {
  ExitIcon: DefaultExitIcon,
  LinearProgress: DefaultLinearProgress,
  CircularProgress: DefaultCircularProgress,
  SuccessIcon: DefaultSuccessIcon,
  ErrorIcon: DefaultErrorIcon,
}

const useStyles = createUseStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.comp.fileItem.colorBackground,
    position: 'relative',

    '&::after': {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      content: '""',
      zIndex: 1,
      position: 'absolute',
      border: `1px solid ${theme.comp.fileItem.colorBorder}`,
      borderRadius: 'inherit',
    },

    '&$sm': {
      borderTopRightRadius: theme.comp.fileItem.shapeBorderRadiusTopRightSm,
      borderTopLeftRadius: theme.comp.fileItem.shapeBorderRadiusTopLeftSm,
      borderBottomLeftRadius: theme.comp.fileItem.shapeBorderRadiusBottomLeftSm,
      borderBottomRightRadius:
        theme.comp.fileItem.shapeBorderRadiusBottomRightSm,
    },
    '&$lg': {
      borderTopRightRadius: theme.comp.fileItem.shapeBorderRadiusTopRightLg,
      borderTopLeftRadius: theme.comp.fileItem.shapeBorderRadiusTopLeftLg,
      borderBottomLeftRadius: theme.comp.fileItem.shapeBorderRadiusBottomLeftLg,
      borderBottomRightRadius:
        theme.comp.fileItem.shapeBorderRadiusBottomRightLg,
    },
    '&$md': {
      borderTopRightRadius: theme.comp.fileItem.shapeBorderRadiusTopRightMd,
      borderTopLeftRadius: theme.comp.fileItem.shapeBorderRadiusTopLeftMd,
      borderBottomLeftRadius: theme.comp.fileItem.shapeBorderRadiusBottomLeftMd,

      borderBottomRightRadius:
        theme.comp.fileItem.shapeBorderRadiusBottomRightMd,
    },
  },
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    boxSizing: 'border-box',

    zIndex: 2,
    position: 'relative',

    '$sm &': {
      paddingTop: 6,
      paddingBottom: 6,
    },
    '$md &': {
      paddingTop: 8,
      paddingBottom: 8,
    },
    '$lg &': {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  content: {
    flex: 1,
    marginRight: 8,
    color: theme.comp.fileItem.colorText,
    fontSize: theme.comp.fileItem.typographyFontSize,
    fontFamily: theme.comp.fileItem.typographyFontFamily,
    lineHeight: theme.comp.fileItem.typographyLineHeight,
    fontWeight: theme.comp.fileItem.typographyFontWeight,
    letterSpacing: theme.comp.fileItem.typographyLetterSpacing,
  },
  info: {
    marginRight: 8,
    color: theme.comp.fileItem.infoColorText,
    fontSize: theme.comp.fileItem.infoTypographyFontSize,
    fontFamily: theme.comp.fileItem.infoTypographyFontFamily,
    lineHeight: theme.comp.fileItem.infoTypographyLineHeight,
    fontWeight: theme.comp.fileItem.infoTypographyFontWeight,
    letterSpacing: theme.comp.fileItem.infoTypographyLetterSpacing,
  },
  status: {
    marginRight: 8,
  },
  error: {
    '&$root:after': {
      borderColor: theme.comp.fileItem.colorBorderError,
    },
    '& $status': {
      color: theme.comp.fileItem.iconColorTextError,
    },
  },
  success: {
    '& $status': {
      color: theme.comp.fileItem.iconColorTextSuccess,
    },
  },
  progress: {
    '$root&': {
      background: theme.comp.fileItem.colorBackgroundProgress,
    },
  },
  errorText: {
    paddingLeft: 16,
    paddingRight: 16,
    borderTop: `1px solid ${theme.comp.fileItem.dividerColor}`,
    color: theme.comp.fileItem.errorTextColorText,
    fontFamily: theme.comp.fileItem.errorTextTypographyFontFamily,
    fontWeight: theme.comp.fileItem.errorTextTypographyFontWeight,
    fontSize: theme.comp.fileItem.errorTextTypographyFontSize,
    lineHeight: theme.comp.fileItem.errorTextTypographyLineHeight,
    letterSpacing: theme.comp.fileItem.errorTextTypographyLetterSpacing,

    '$sm &': {
      paddingTop: 6,
      paddingBottom: 6,
    },

    '$md &': {
      paddingTop: 4,
      paddingBottom: 4,
    },

    '$lg &': {
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
  buttonsContainer: {
    display: 'flex',
    '$sm &': {
      marginRight: -8,
    },
    '$md &': {
      marginRight: -8,
    },
    '$lg &': {
      marginRight: -12,
    },
  },
  linearProgress: {
    padding: [0, 16, 12],
  },
  sm: {},
  md: {},
  lg: {},
}))

const defaultElement = 'div'

export type FileItemOwnProps = {
  /**
   * Размер элемента
   */
  size?: ElementSizeType
  children: React.ReactNode
  /**
   * Статус success | error | progress
   */
  status?: FileStatus
  classes?: FileItemClasses
  /**
   * Калбек для кнопки с крестиком
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Тип прогресса. Используется при status='progress'
   * circular - круговой загрузчик
   * linear - линейный загрузчик
   */
  progressType?: ProgressType
  /**
   * Текст ошибки
   */
  errorText?: React.ReactNode
  /**
   * Число прогресса. Используется при status='progress'
   */
  progress?: number
  /**
   * Контент инфо
   */
  info?: React.ReactNode
  /**
   * Рендер проп для дополнительных кнопок-иконок
   * @param props
   */
  renderIconButtons?: (props: { size: ElementSizeType }) => React.ReactNode
  /**
   * Проп для замены иконок и внутренних компонент
   */
  components?: Partial<FileItemComponents>
} & ComponentPropsWithRefFix<typeof defaultElement>

export type FileItemProps<E extends React.ElementType> =
  PolymorphicComponentProps<E, FileItemOwnProps>

export const FileItem = React.forwardRef(
  <E extends React.ElementType = typeof defaultElement>(
    {
      ref,
      as,
      children,
      size = 'md',
      className: classNameProps,
      classes,
      progress,
      progressType = 'circular',
      onCancel,
      status,
      errorText,
      info,
      renderIconButtons,
      components: componentsProps = {},
      ...props
    }: FileItemProps<E>,
    innerRef: typeof ref
  ) => {
    const classList = useStyles()
    const classesMap = useClassList(classList, classes)

    const className = clsx(
      classesMap.root,
      classesMap[size],
      status && {
        [classesMap.error]: status === 'error',
        [classesMap.progress]: status === 'progress',
        [classesMap.success]: status === 'success',
      },
      classNameProps
    )

    const { ExitIcon, LinearProgress, ...fileItemStatusComponents } =
      React.useMemo(
        () => ({ ...defaultComponents, ...componentsProps }),
        [componentsProps]
      )

    const iconButtons = React.useMemo(
      () => renderIconButtons?.({ size }) || null,
      [size, renderIconButtons]
    )

    return (
      <Box
        ref={innerRef}
        className={className}
        as={as ?? defaultElement}
        {...props}
      >
        <div className={classesMap.container}>
          <div className={classesMap.content}>{children}</div>
          {info && <div className={classesMap.info}>{info}</div>}
          {status && (
            <FileItemStatus
              components={fileItemStatusComponents}
              progress={progress}
              status={status}
              progressType={progressType}
              className={classesMap.status}
              size={size}
            />
          )}
          {(iconButtons || onCancel) && (
            <div className={classesMap.buttonsContainer}>
              {iconButtons}
              {onCancel && (
                <FileItemIconButton size={size} onClick={onCancel}>
                  <ExitIcon {...getIconSize(size)} />
                </FileItemIconButton>
              )}
            </div>
          )}
        </div>
        {status === 'progress' && progressType === 'linear' && (
          <LinearProgress
            className={classesMap.linearProgress}
            size="md"
            value={progress}
            max={100}
          />
        )}
        {errorText && <div className={classesMap.errorText}>{errorText}</div>}
      </Box>
    )
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: FileItemProps<E>
) => JSX.Element
