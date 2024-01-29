import { Theme } from '../../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createElevation = (theme: Theme) => ({
  sm: theme.ref.shadow._20,
  md: theme.ref.shadow._40,
  lg: theme.ref.shadow._50,
  xl: theme.ref.shadow._60,
})
