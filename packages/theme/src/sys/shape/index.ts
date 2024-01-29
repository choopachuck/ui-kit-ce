import { Theme } from '../../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createShape = (theme: Theme) => ({
  borderRadiusNone: theme.ref.radius.none,
  borderRadiusSm: theme.ref.radius.xs,
  borderRadiusMd: theme.ref.radius.xs,
  borderRadiusLg: theme.ref.radius.xs,
  borderRadiusXl: theme.ref.radius.sm,
  borderRadiusCircle: theme.ref.radius.circle,
})
