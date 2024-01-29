export const hasMaskSybmols = (value: string, format: string): boolean => {
  if (!value || !format) {
    return false
  }

  const letterRegexp = new RegExp(/[A-Za-z0-9]/)
  for (let i = 0; i < value.length; i++) {
    if (letterRegexp.test(value[i]) !== letterRegexp.test(format[i])) {
      return true
    }
  }

  return false
}
