import { Breakpoints as DeprecatedBreakpoints } from '@v-uik/theme'

/**
 * Значение Breakpoints
 */
export type BreakpointsKeys = 'xs' | keyof DeprecatedBreakpoints

export type BreakpointsRecord<T> = Partial<Record<BreakpointsKeys, T>>

export type BreakpointsNumberValue =
  | number
  | BreakpointsRecord<number>
  | undefined
