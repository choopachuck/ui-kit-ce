'use client'

import React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { IconError } from '../assets'
import { InlineNotificationStatusType } from '../types'
import { getClassnameByStatus } from '@v-uik/utils'

const useStyles = createUseStyles((theme) => ({
  icon: {
    flex: '0 0 24px',
    display: 'flex',
  },

  iconError: {
    color: theme.comp.inlineNotification.iconColorTextError,
  },
  iconWarning: {
    color: theme.comp.inlineNotification.iconColorTextWarning,
  },
  iconSuccess: {
    color: theme.comp.inlineNotification.iconColorTextSuccess,
  },
  iconInfo: {
    color: theme.comp.inlineNotification.iconColorTextInfo,
  },
  iconNeutral: {
    color: theme.comp.inlineNotification.iconColorTextNeutral,
  },
}))

export type IconClasses = {
  /** Стиль icon */
  icon?: string
  /** Стиль icon при status: error */
  iconError?: string
  /** Стиль icon при status: warning */
  iconWarning?: string
  /** Стиль icon при status: success */
  iconSuccess?: string
  /** Стиль icon при status: info */
  iconInfo?: string
  /** Стиль icon при status: neutral */
  iconNeutral?: string
}

type IconProps = {
  children?: React.ReactNode
  status: InlineNotificationStatusType
  /** только пользовательские classes */
  classes?: IconClasses
}

export const Icon: React.FC<IconProps> = ({ classes, status, children }) => {
  const classList = useStyles()
  const classesMap = useClassList(classList, classes)
  const className = getClassnameByStatus(
    status,
    {
      error: classesMap.iconError,
      warning: classesMap.iconWarning,
      success: classesMap.iconSuccess,
      info: classesMap.iconInfo,
      neutral: classesMap.iconNeutral,
    },
    classesMap.icon
  )

  return (
    <div className={className} aria-hidden="true">
      {typeof children === 'boolean' ? <IconError /> : children}
    </div>
  )
}
