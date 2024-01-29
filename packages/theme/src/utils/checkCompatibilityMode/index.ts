import { Theme, ThemeOptions } from '../../interface'

export type ComponentName = Exclude<
  keyof Theme['comp'],
  'backwardCompatibilityMode'
>

export const checkCompatibilityMode = (
  theme: Theme | ThemeOptions,
  componentName?: ComponentName
): boolean => {
  return theme.comp
    ? theme.comp[componentName as ComponentName]?.backwardCompatibilityMode ??
        theme.comp.backwardCompatibilityMode ??
        true
    : true
}
