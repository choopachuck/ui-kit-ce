import * as React from 'react'

import { ProgressType, FileStatus, FileItemComponents } from './types'
import { getIconSize } from './utils'
import { ElementSizeType } from '@v-uik/common'

export type FileItemStatusComponents = Omit<
  FileItemComponents,
  'LinearProgress' | 'ExitIcon'
>

type FileItemStatusProps = {
  className?: string
  status: FileStatus
  progressType?: ProgressType
  progress?: number
  size?: ElementSizeType
  components: FileItemStatusComponents
}

export const FileItemStatus: React.FC<FileItemStatusProps> = ({
  className,
  status,
  progressType,
  progress,
  size = 'md',
  components,
}) => {
  const { CircularProgress, ErrorIcon, SuccessIcon } = components

  if (status === 'error') {
    return <ErrorIcon className={className} {...getIconSize(size)} />
  }

  if (status === 'success') {
    return <SuccessIcon className={className} {...getIconSize(size)} />
  }

  if (status === 'progress' && progressType === 'circular') {
    return (
      <CircularProgress
        hideTrack
        className={className}
        value={progress}
        max={100}
        thickness={5}
        size={size === 'sm' ? 'sm' : 'md'}
      />
    )
  }

  return null
}

export default React.memo(FileItemStatus)
