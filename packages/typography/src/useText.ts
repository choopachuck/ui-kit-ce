'use client'

import { createUseStyles } from '@v-uik/theme'

export const useText = createUseStyles((theme) => ({
  //v2 styles
  displayLg: {
    ...theme.sys.typography.displayLg,
    margin: 0,
  },
  displayMd: {
    ...theme.sys.typography.displayMd,
    margin: 0,
  },
  displaySm: {
    ...theme.sys.typography.displaySm,
    margin: 0,
  },
  headline1: {
    ...theme.sys.typography.headline1,
    margin: 0,
  },
  headline2: {
    ...theme.sys.typography.headline2,
    margin: 0,
  },
  headline3: {
    ...theme.sys.typography.headline3,
    margin: 0,
  },
  headline4: {
    ...theme.sys.typography.headline4,
    margin: 0,
  },
  headline5: {
    ...theme.sys.typography.headline5,
    margin: 0,
  },
  titleLg: {
    ...theme.sys.typography.titleLg,
    margin: 0,
  },
  titleMd: {
    ...theme.sys.typography.titleMd,
    margin: 0,
  },
  titleSm: {
    ...theme.sys.typography.titleSm,
    margin: 0,
  },
  bodyXl: {
    ...theme.sys.typography.bodyXl,
    margin: 0,
  },
  bodyLg: {
    ...theme.sys.typography.bodyLg,
    margin: 0,
  },
  bodyMd: {
    ...theme.sys.typography.bodyMd,
    margin: 0,
  },
  bodySm: {
    ...theme.sys.typography.bodySm,
    margin: 0,
  },
  uiTextLg: {
    ...theme.sys.typography.uiTextLg,
    margin: 0,
  },
  uiTextMd: {
    ...theme.sys.typography.uiTextMd,
    margin: 0,
  },
  uiTextSm: {
    ...theme.sys.typography.uiTextSm,
    margin: 0,
  },
  codeLg: {
    ...theme.sys.typography.codeLg,
    margin: 0,
  },
  codeMd: {
    ...theme.sys.typography.codeMd,
    margin: 0,
  },
  codeSm: {
    ...theme.sys.typography.codeSm,
    margin: 0,
  },

  //v1 styles
  h1: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h1,
    lineHeight: theme.typography.lineHeight.h1,
    letterSpacing: theme.typography.letterSpacing.h1,
    fontWeight: theme.typography.fontWeight.light,
    margin: 0,
  },

  h2: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h2,
    lineHeight: theme.typography.lineHeight.h2,
    letterSpacing: theme.typography.letterSpacing.h2,
    fontWeight: theme.typography.fontWeight.light,
    margin: 0,
  },

  h3: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h3,
    lineHeight: theme.typography.lineHeight.h3,
    letterSpacing: theme.typography.letterSpacing.h3,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  h4: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h4,
    lineHeight: theme.typography.lineHeight.h4,
    letterSpacing: theme.typography.letterSpacing.h4,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  h5: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h5,
    lineHeight: theme.typography.lineHeight.h5,
    letterSpacing: theme.typography.letterSpacing.h5,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  h6: {
    fontFamily: theme.typography.fontFamily.headings,
    fontSize: theme.typography.fontSize.h6,
    lineHeight: theme.typography.lineHeight.h6,
    letterSpacing: theme.typography.letterSpacing.h6,
    fontWeight: theme.typography.fontWeight.semibold,
    margin: 0,
  },

  subtitle1: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.subtitle1,
    lineHeight: theme.typography.lineHeight.subtitle1,
    letterSpacing: theme.typography.letterSpacing.subtitle1,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  subtitle2: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.subtitle2,
    lineHeight: theme.typography.lineHeight.subtitle2,
    letterSpacing: theme.typography.letterSpacing.subtitle2,
    fontWeight: theme.typography.fontWeight.semibold,
    margin: 0,
  },

  body1: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.body1,
    lineHeight: theme.typography.lineHeight.body1,
    letterSpacing: theme.typography.letterSpacing.body1,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  body2: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.body2,
    lineHeight: theme.typography.lineHeight.body2,
    letterSpacing: theme.typography.letterSpacing.body2,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  button: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.button,
    lineHeight: theme.typography.lineHeight.button,
    letterSpacing: theme.typography.letterSpacing.button,
    fontWeight: theme.typography.fontWeight.semibold,
    margin: 0,
  },

  caption: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.caption,
    lineHeight: theme.typography.lineHeight.caption,
    letterSpacing: theme.typography.letterSpacing.caption,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  overline: {
    fontFamily: theme.typography.fontFamily.text,
    fontSize: theme.typography.fontSize.overline,
    lineHeight: theme.typography.lineHeight.overline,
    letterSpacing: theme.typography.letterSpacing.overline,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  code1: {
    fontFamily: theme.typography.fontFamily.code,
    fontSize: theme.typography.fontSize.code1,
    lineHeight: theme.typography.lineHeight.code1,
    letterSpacing: theme.typography.letterSpacing.code1,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  code2: {
    fontFamily: theme.typography.fontFamily.code,
    fontSize: theme.typography.fontSize.code2,
    lineHeight: theme.typography.lineHeight.code2,
    letterSpacing: theme.typography.letterSpacing.code2,
    fontWeight: theme.typography.fontWeight.regular,
    margin: 0,
  },

  //modifiers
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    margin: 0,
  },

  gutterBottom: {
    margin: '0px 0px 0.35em',
  },
}))
