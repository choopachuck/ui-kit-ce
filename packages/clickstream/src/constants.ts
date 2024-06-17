export const CLICK_STREAM_EVENTS = ['click', 'change'] as const

export const CLICK_STREAM_INACTIVITY_TIME = 30000

export const CLICK_STREAM_BATCH_SIZE = 10

// Нотация нарушена для обратной совместимости с @sbol/clickstream-agent
export const CONNECTION_TYPES = {
  bluetooth: 'BLUETOOTH',
  cellular: 'CELLULAR',
  ethernet: 'ETHERNET',
  wifi: 'WIFI',
  mixed: 'UNKNOWN',
  none: 'UNKNOWN',
  wimax: 'UNKNOWN',
  other: 'UNKNOWN',
  unknown: 'UNKNOWN',
} as const

export const CLICK_STREAM_GENERIC_ATTRIBUTES = {
  OFF: 'data-click-stream-off',
} as const

export const ALIGNMENT = 10

export const MINUTES_IN_HOUR = 60

export const MS_IN_SECOND = 1000

export const SECONDS_IN_MINUTE = 60

export const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND
