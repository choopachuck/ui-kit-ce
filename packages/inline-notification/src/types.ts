export const InlineNotificationKind = {
  filled: 'filled',
  outlined: 'outlined',
} as const

export type InlineNotificationKindType = keyof typeof InlineNotificationKind

export const InlineNotificationStatus = {
  neutral: 'neutral',
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
} as const

export type InlineNotificationStatusType = keyof typeof InlineNotificationStatus
