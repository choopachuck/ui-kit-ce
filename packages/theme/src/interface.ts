import {
  Breakpoints,
  Colors,
  Colourway,
  Palette,
  Shape,
  Typography,
  ZIndex,
} from './parts'
import { Ref } from './ref'
import { Sys } from './sys'
import { Comp } from './comp'

export interface Theme {
  ref: Ref
  sys: Sys
  comp: Comp
  shape: Shape
  zIndex: ZIndex
  /**
   * @deprecated будет удалено, используйте comp и sys
   */
  colors: Colors
  /**
   * @deprecated будет удалено, используйте comp и sys
   */
  colourway: Colourway
  palette: Palette
  typography: Typography
  breakpoints: Breakpoints
}

/**
 * Пользователь может явно переопределить все или некоторые токены.
 */
export type ThemeOptions = DeepPartial<Theme>

// eslint-disable-next-line @typescript-eslint/ban-types
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
