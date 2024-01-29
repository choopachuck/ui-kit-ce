import { Palette, Color } from './palette'

export type Colors = {
  text: {
    inverse: string
    default: string
    disabled: string
  }
  primary: Color
  success: Color
  monochrome: Color
  warn: Color
  error: Color
  info: Color
}

export const colors = (palette: Palette): Colors => ({
  text: {
    inverse: palette.white.$0,
    default: palette.black.$100,
    disabled: palette.greyWarm.$10,
  },

  primary: palette.green,
  success: palette.green,
  monochrome: palette.greyWarm,

  warn: palette.yellow,
  error: palette.red,
  info: palette.blue,
})
