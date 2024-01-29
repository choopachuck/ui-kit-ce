import React from 'react'

export const getOptionLabel = <Option>(option: Option): string =>
  (option as { label?: unknown }).label as string

export const getOptionValue = <Option>(option: Option): string =>
  (option as { value?: unknown }).value as string

export const isOptionDisabled = <Option>(option: Option): boolean =>
  !!(option as { disabled?: unknown })?.disabled

export const getOptionSuffix = <Option>(option: Option): React.ReactNode =>
  (option as { suffix?: unknown }).suffix as React.ReactNode

export const getOptionPrefix = <Option>(option: Option): React.ReactNode =>
  (option as { prefix?: unknown }).prefix as React.ReactNode
