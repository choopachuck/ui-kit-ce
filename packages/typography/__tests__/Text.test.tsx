import * as React from 'react'
import { render } from '@testing-library/react'
import { Text, TextKinds, TTextKinds } from '../src'

const getTagByKind = (kind: string): string => {
  switch (kind) {
    case TextKinds.headline1:
      return 'h1'
    case TextKinds.headline2:
      return 'h2'
    case TextKinds.headline3:
      return 'h3'
    case TextKinds.headline4:
      return 'h4'
    case TextKinds.headline5:
      return 'h5'
    case TextKinds.titleLg:
      return 'h6'

    case TextKinds.displayLg:
    case TextKinds.displayMd:
    case TextKinds.displaySm:
    case TextKinds.titleMd:
    case TextKinds.titleSm:
    case TextKinds.subtitle1:
    case TextKinds.subtitle2:
      return 'p'
    case TextKinds.bodyXl:
    case TextKinds.bodyLg:
    case TextKinds.bodyMd:
    case TextKinds.bodySm:
    case TextKinds.body1:
    case TextKinds.body2:
      return 'div'
    case TextKinds.codeLg:
    case TextKinds.codeMd:
    case TextKinds.codeSm:
    case TextKinds.code1:
    case TextKinds.code2:
      return 'pre'
    case TextKinds.uiTextLg:
    case TextKinds.uiTextMd:
    case TextKinds.uiTextSm:
    case TextKinds.button:
    case TextKinds.caption:
    case TextKinds.overline:
      return 'span'
    default:
      return kind || 'div'
  }
}

const ellipsisStyle = `
  overflow: hidden;
  whiteSpace: nowrap;
  textOverflow: ellipsis;
`

it('handle default kind correctly', () => {
  const content = 'test content'
  const { getByText } = render(<Text>{content}</Text>)
  const element = getByText(content)
  expect(element.className).toMatch(/body2/)
  expect(element).not.toHaveStyle(ellipsisStyle)
  expect(element.tagName).toBe('DIV')
})

it('handle ellipsis prop correctly', () => {
  const content = 'test content'
  const { getByText } = render(<Text ellipsis>{content}</Text>)
  expect(getByText(content)).toHaveStyle(ellipsisStyle)
})

describe('handle text kinds correctly', () => {
  Object.keys(TextKinds).forEach((kind) => {
    it(`handle '${kind} kind correctly'`, () => {
      const content = 'test content'
      const { getByText } = render(
        <Text kind={kind as TTextKinds}>{content}</Text>
      )
      const element = getByText(content)
      expect(element.className).toMatch(new RegExp(`${kind}`))
      expect(element.tagName).toBe(getTagByKind(kind).toUpperCase())
    })
  })
})
