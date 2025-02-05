import { Theme } from '../../interface'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createTypography = (theme: Theme) => ({
  displayLg: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 64,
    lineHeight: '76px',
    letterSpacing: -0.25,
  },
  displayMd: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 57,
    lineHeight: '64px',
    letterSpacing: -0.25,
  },
  displaySm: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 45,
    lineHeight: '52px',
    letterSpacing: 0,
  },
  headline1: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.light,
    fontSize: 96,
    lineHeight: '112px',
    letterSpacing: 0.41,
  },
  headline2: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.light,
    fontSize: 60,
    lineHeight: '72px',
    letterSpacing: 0.41,
  },
  headline3: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 48,
    lineHeight: '56px',
    letterSpacing: 0.41,
  },
  headline4: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 32,
    lineHeight: '40px',
    letterSpacing: 0.41,
  },
  headline5: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 24,
    lineHeight: '24px',
    letterSpacing: 0.35,
  },
  titleLg: {
    fontFamily: theme.ref.typography.fontFamily.brand,
    fontWeight: theme.ref.typography.fontWeight.semiBold,
    fontSize: 20,
    lineHeight: '24px',
    letterSpacing: 0.38,
  },
  titleMd: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 'normal',
  },
  titleSm: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.semiBold,
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: 'normal',
  },
  bodyXl: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 20,
    lineHeight: '28px',
    letterSpacing: 'normal',
  },
  bodyLg: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: -0.24,
  },
  bodyMd: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: -0.08,
  },
  bodySm: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: 'normal',
  },
  uiTextLg: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 'normal',
  },
  uiTextMd: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.semiBold,
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: 0.16,
  },
  uiTextSm: {
    fontFamily: theme.ref.typography.fontFamily.base,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 10,
    lineHeight: '16px',
    letterSpacing: 0.07,
  },
  codeLg: {
    fontFamily: theme.ref.typography.fontFamily.code,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 16,
    lineHeight: '24px',
    letterSpacing: 'normal',
  },
  codeMd: {
    fontFamily: theme.ref.typography.fontFamily.code,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 14,
    lineHeight: '20px',
    letterSpacing: 'normal',
  },
  codeSm: {
    fontFamily: theme.ref.typography.fontFamily.code,
    fontWeight: theme.ref.typography.fontWeight.regular,
    fontSize: 12,
    lineHeight: '16px',
    letterSpacing: 'normal',
  },
})
