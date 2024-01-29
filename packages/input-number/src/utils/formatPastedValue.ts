type FormatOnPasteParams = {
  value: string
  groupSeparator: string
  decimalSeparator: string
}

const replace = (base: string, delimiter: string, replacer: string): string =>
  base.split(delimiter).join(replacer)

const NEGATIVE_SIGN = '-'
const POSITIVE_SIGN = '+'

export const formatPastedValue = ({
  value: valueArg,
  groupSeparator,
  decimalSeparator,
}: FormatOnPasteParams): string => {
  let sign = ''
  let value = valueArg

  if (value.startsWith(NEGATIVE_SIGN) || value.startsWith(POSITIVE_SIGN)) {
    sign = value[0]

    value = value.slice(1)
  }

  // Регэксп на поиск символа разделителя дробной и целой части (дробная часть отделяется только запятой и точкой)
  const re = /(,|\.)/gm

  // Поиск индекса начала дробной части
  let lastIndex = null
  do {
    lastIndex = re.lastIndex
    re.test(value)
  } while (re.lastIndex)

  if (!lastIndex) {
    const groupSeparatorValue =
      value.slice(0, lastIndex - 1).match(/\D/)?.[0] ?? ''

    const num = groupSeparatorValue
      ? replace(value, groupSeparatorValue, groupSeparator)
      : value

    return [sign, num].join('')
  }

  const integer = value.slice(0, lastIndex - 1)

  const fractional = value.slice(lastIndex)

  const decimalDelimiterValue = value[lastIndex - 1]

  const groupSeparatorValue = integer.match(/\D/)?.[0] ?? ''

  if (!groupSeparatorValue) {
    const num = [integer, fractional].join(decimalSeparator)

    return [sign, num].join('')
  }

  if (groupSeparatorValue === decimalDelimiterValue) {
    return [sign, replace(value, groupSeparatorValue, groupSeparator)].join('')
  }

  const num = [
    replace(integer, groupSeparatorValue, groupSeparator),
    fractional,
  ].join(decimalSeparator)

  return [sign, num].join('')
}
