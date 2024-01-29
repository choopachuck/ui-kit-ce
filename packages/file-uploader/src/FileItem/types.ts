import React from 'react'
import { LinearProgressProps, CircularProgressProps } from '@v-uik/progress'

/**
 * Статус файла
 */
export type FileStatus = 'error' | 'success' | 'progress'
/**
 * Тип прогресса
 */
export type ProgressType = 'circular' | 'linear'

export interface FileItemIconProps extends React.SVGAttributes<SVGElement> {}

// Тип нужен для валидного использования кастомных компонентов в таблице
type Component<P> = React.ComponentType<P> | React.ForwardRefExoticComponent<P>

export type FileItemComponents = {
  ExitIcon: Component<FileItemIconProps>
  SuccessIcon: Component<FileItemIconProps>
  ErrorIcon: Component<FileItemIconProps>
  LinearProgress: Component<LinearProgressProps>
  CircularProgress: Component<CircularProgressProps>
}
