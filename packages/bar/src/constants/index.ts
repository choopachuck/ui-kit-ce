export const BarKinds = {
  dark: 'dark',
  light: 'light',
  primary: 'primary',
} as const

export type BarKindsType = keyof typeof BarKinds

export const SubBarKinds = {
  dark: 'dark',
  darker: 'darker',
  light: 'light',
  lighter: 'lighter',
} as const

export type SubBarKindsType = keyof typeof SubBarKinds

export const DarkColors: string[] = [
  BarKinds.dark,
  SubBarKinds.dark,
  SubBarKinds.darker,
]

export const LightColors: string[] = [
  BarKinds.light,
  SubBarKinds.light,
  SubBarKinds.lighter,
]
