import { ThemeTokens, TokenGroup, TokenMap, TokenT, TokenValue } from '../types'
import { clearTokenName } from './clearTokenName'
//@ts-ignore
import themeTokens from '../../../theme-tokens.json'

/**
 * Функция находит все использования токена, по его имени
 *
 * @param tokenFullName - имя токена, по которому происходит поиск
 * @param deep - если включено, применит эту функции на каждый найденный токен по первому имени, и вернет массив из всех найденных (в том числе токены по первому имени)
 * @returns - массив найденных токенов, в которых используется tokenFullName
 */
export function findUsages(
  tokenFullName: string | string[],
  deep = false
): string[] {
  tokenFullName = Array.isArray(tokenFullName)
    ? tokenFullName.join('.')
    : tokenFullName
  const usages: string[] = []

  const recursiveFindUsages = (
    obj: ThemeTokens | TokenGroup | TokenMap,
    usages: string[],
    tokenFullName: string
  ) => {
    if (typeof obj !== 'object') {
      return
    }

    Object.keys(obj).forEach((key) => {
      if (!obj[key].tokenName) {
        return recursiveFindUsages(
          obj[key] as TokenMap | TokenGroup,
          usages,
          tokenFullName
        )
      }

      if (isUsed(obj[key] as TokenT | TokenValue, tokenFullName)) {
        usages.push(obj[key].tokenFullName as string)
      }
    })
  }

  recursiveFindUsages(themeTokens, usages, tokenFullName)
  deep && usages.forEach((x) => recursiveFindUsages(themeTokens, usages, x))

  return usages
}

/**
 * Асинхронная версия функции findUsages
 *
 * @param tokenFullName
 * @param themeTokens
 * @returns
 */
export const findUsagesAsync = (
  tokenFullName: string,
  themeTokens: ThemeTokens
): Promise<string[]> => {
  return new Promise((resolve) => {
    const res: string[] = []

    const helper = (obj: ThemeTokens | TokenGroup | TokenMap) => {
      if (typeof obj !== 'object') {
        return
      }

      Object.keys(obj).forEach((key) => {
        if (!obj[key].tokenName) {
          return helper(obj[key] as TokenMap | TokenGroup)
        }

        if (isUsed(obj[key] as TokenT | TokenValue, tokenFullName)) {
          res.push(obj[key].tokenFullName as string)
        }
      })
    }

    helper(themeTokens)

    resolve(res)
  })
}

function isUsed(v: TokenT | TokenValue, tokenFullName: string): boolean {
  switch (v.kind) {
    case 'PropertyAccessExpression': {
      return clearTokenName(v.value) === clearTokenName(tokenFullName)
    }
    case 'CallExpression': {
      return !!v.value.args.find((a) => isUsed(a, tokenFullName))
    }
    case 'ConditionalExpression': {
      return (
        isUsed(v.value.trueValue, tokenFullName) ||
        isUsed(v.value.falseValue, tokenFullName)
      )
    }
    default:
      return false
  }
}
