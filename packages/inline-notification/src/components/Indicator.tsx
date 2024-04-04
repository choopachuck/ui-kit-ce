'use client'

import React from 'react'
import { createUseStyles } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { InlineNotificationStatusType } from '../types'
import { getClassnameByStatus } from '../utils/getClassnameByStatus'

const useStyles = createUseStyles((theme) => ({
  indicator: {
    width: 4,
    borderRadius: 1,
    flexShrink: 0,
  },

  indicatorError: {
    backgroundColor:
      theme.comp.inlineNotification.indicatorColorBackgroundError,
  },
  indicatorWarning: {
    backgroundColor:
      theme.comp.inlineNotification.indicatorColorBackgroundWarning,
  },
  indicatorSuccess: {
    backgroundColor:
      theme.comp.inlineNotification.indicatorColorBackgroundSuccess,
  },
  indicatorInfo: {
    backgroundColor: theme.comp.inlineNotification.indicatorColorBackgroundInfo,
  },
  indicatorNeutral: {
    backgroundColor:
      theme.comp.inlineNotification.indicatorColorBackgroundNeutral,
  },
}))

export type IndicatorClasses = {
  /** Стиль indicator */
  indicator?: string
  /** Стиль indicator при status: error */
  indicatorError?: string
  /** Стиль indicator при status: warning */
  indicatorWarning?: string
  /** Стиль indicator при status: success */
  indicatorSuccess?: string
  /** Стиль indicator при status: info */
  indicatorInfo?: string
  /** Стиль indicator при status: neutral */
  indicatorNeutral?: string
}

type IndicatorProps = {
  status: InlineNotificationStatusType
  /** только пользовательские classes */
  classes?: IndicatorClasses
}

export const Indicator: React.FC<IndicatorProps> = ({ classes, status }) => {
  const classList = useStyles()
  const classesMap = useClassList(classList, classes)
  const className = getClassnameByStatus(status, {
    root: classesMap.indicator,
    error: classesMap.indicatorError,
    warning: classesMap.indicatorWarning,
    success: classesMap.indicatorSuccess,
    info: classesMap.indicatorInfo,
    neutral: classesMap.indicatorNeutral,
  })

  return <div className={className} aria-hidden="true" />
}
