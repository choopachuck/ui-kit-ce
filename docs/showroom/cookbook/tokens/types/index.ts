type TokenShared = {
  tokenName: string
  tokenFullName: string
}

export type StringValue = {
  kind: 'StringLiteral' | 'FirstLiteralToken' | 'PrefixUnaryExpression'
  value: string
}
export type PropertyValue = {
  kind: 'PropertyAccessExpression'
  value: string
}
export type CallValue = {
  kind: 'CallExpression'
  value: {
    action: string
    args: TokenValue[]
  }
}
export type TokenValue = StringValue | PropertyValue | CallValue

export type StringToken = StringValue & TokenShared
export type ProppertyToken = PropertyValue & TokenShared
export type CallExpressionToken = CallValue & TokenShared
export type ConditionToken = {
  kind: 'ConditionalExpression'
  value: {
    condition: PropertyValue
    trueValue: TokenValue
    falseValue: TokenValue
  }
} & TokenShared

export type TokenT =
  | StringToken
  | ProppertyToken
  | CallExpressionToken
  | ConditionToken

export type TokenMap = Record<string, TokenT>
export type TokenGroup = Record<string, TokenMap>
export type ThemeTokens = Record<string, TokenGroup>

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T
