import { setAlphaChannel } from '@v-uik/base'

export const callExpression = {
  setAlphaChannel: (a: unknown, b: unknown) =>
    setAlphaChannel(...argumentsConverter.setAlphaChannel(a, b)),
}

const argumentsConverter = {
  setAlphaChannel: (a: unknown, b: unknown) =>
    [String(a), Number(b)].filter(Boolean) as [string, number | undefined],
}
