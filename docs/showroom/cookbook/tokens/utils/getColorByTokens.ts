import { Theme, getPathValue } from '@v-uik/base'
import { callExpression } from '../constants'

export function getColorByTokens(
  theme: Theme,
  colorToken: string,
  alphaToken: string
) {
  const color = getPathValue(theme, colorToken) as string
  const alpha = getPathValue(theme, alphaToken) as number

  return callExpression.setAlphaChannel(color, alpha)
}
