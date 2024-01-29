import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { useText } from './useText'

type Classes = Partial<
  Record<
    //v2
    | 'displayLg'
    | 'displayMd'
    | 'displaySm'
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'headline4'
    | 'headline5'
    | 'titleLg'
    | 'titleMd'
    | 'titleSm'
    | 'bodyXl'
    | 'bodyLg'
    | 'bodyMd'
    | 'bodySm'
    | 'uiTextLg'
    | 'uiTextMd'
    | 'uiTextSm'
    | 'codeLg'
    | 'codeMd'
    | 'codeSm'

    //v1
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'overline'
    | 'code1'
    | 'code2'

    //modifiers
    | 'ellipsis'
    | 'gutterBottom'
    | 'root',
    string
  >
>

export const TextKinds = {
  //v2
  displayLg: 'displayLg',
  displayMd: 'displayMd',
  displaySm: 'displaySm',
  headline1: 'headline1',
  headline2: 'headline2',
  headline3: 'headline3',
  headline4: 'headline4',
  headline5: 'headline5',
  titleLg: 'titleLg',
  titleMd: 'titleMd',
  titleSm: 'titleSm',
  bodyXl: 'bodyXl',
  bodyLg: 'bodyLg',
  bodyMd: 'bodyMd',
  bodySm: 'bodySm',
  uiTextLg: 'uiTextLg',
  uiTextMd: 'uiTextMd',
  uiTextSm: 'uiTextSm',
  codeLg: 'codeLg',
  codeMd: 'codeMd',
  codeSm: 'codeSm',

  //v1
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'subtitle1',
  subtitle2: 'subtitle2',
  body1: 'body1',
  body2: 'body2',
  button: 'button',
  caption: 'caption',
  overline: 'overline',
  code1: 'code1',
  code2: 'code2',
} as const

export type TTextKinds = keyof typeof TextKinds

const elementByKindsMap: {
  [key in TTextKinds]?: keyof React.ReactHTML
} = {
  // v2
  displayLg: 'p',
  displayMd: 'p',
  displaySm: 'p',
  headline1: 'h1',
  headline2: 'h2',
  headline3: 'h3',
  headline4: 'h4',
  headline5: 'h5',
  titleLg: 'h6',
  titleMd: 'p',
  titleSm: 'p',
  bodyXl: 'div',
  bodyLg: 'div',
  bodyMd: 'div',
  bodySm: 'div',
  codeLg: 'pre',
  codeMd: 'pre',
  codeSm: 'pre',

  // v1
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  // https://www.w3.org/TR/2017/WD-html52-20170228/common-idioms-without-dedicated-elements.html#subheadings-subtitles-alternative-titles-and-taglines
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'div',
  body2: 'div',
  code1: 'pre',
  code2: 'pre',
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * JSS-классы для стилизации.
   */
  classes?: Classes
  /**
   * Стиль текста
   */
  kind?: TTextKinds
  /**
   * HTML тэг, который будет отрисован вместо заданных по-умолчанию
   */
  as?: keyof React.ReactHTML
  /**
   * Обрезать текст в одну строку с многоточием в конце
   */
  ellipsis?: boolean
  /**
   * Добавить отступ под текстом
   * @default false
   */
  gutterBottom?: boolean
}

export const Text = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      kind = TextKinds.body2,
      as,
      ellipsis,
      children,
      gutterBottom = false,
      ...rest
    }: TextProps,
    ref: React.Ref<HTMLElement>
  ) => {
    const textClasses = useText()
    const classesMap = useClassList(textClasses, classes)
    const className = clsx(classNameProp, classesMap.root, classesMap[kind], {
      [classesMap.gutterBottom]: gutterBottom,
      [classesMap.ellipsis]: ellipsis,
    })

    return React.createElement(
      as || elementByKindsMap[kind] || 'span',
      {
        ...rest,
        ref: ref,
        className: className,
      },
      children
    )
  }
)
