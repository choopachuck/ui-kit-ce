import {
  InlineNotificationStatusType,
  InlineNotificationStatus,
} from '../types'
import { clsx } from '@v-uik/theme'

type StatusMap = {
  root: string
  success: string
  error: string
  warning: string
  info: string
  neutral: string
}

export const getClassnameByStatus = (
  status: InlineNotificationStatusType,
  statusMap: StatusMap
): string =>
  clsx(statusMap.root, {
    [statusMap.success]: status === InlineNotificationStatus.success,
    [statusMap.error]: status === InlineNotificationStatus.error,
    [statusMap.warning]: status === InlineNotificationStatus.warning,
    [statusMap.info]: status === InlineNotificationStatus.info,
    [statusMap.neutral]: status === InlineNotificationStatus.neutral,
  })
