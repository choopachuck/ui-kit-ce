export const typography = {
  fontFamily: {
    headings:
      'SBSansDisplay, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    text: 'SBSansText, system-ui, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    code: 'SBSansMono, SFMono-Medium, SF Mono, Segoe UI Mono, Roboto Mono, Ubuntu Mono, Menlo, Consolas, Courier, monospace',
  },

  fontWeight: {
    light: 300,
    regular: 400,
    semibold: 600,
  },

  fontSize: {
    h1: 96,
    h2: 60,
    h3: 48,
    h4: 32,
    h5: 24,
    h6: 20,
    subtitle1: 16,
    subtitle2: 14,
    body1: 16,
    body2: 14,
    button: 14,
    caption: 12,
    overline: 10,
    code1: 14,
    code2: 12,
  },

  letterSpacing: {
    h1: 0.41,
    h2: 0.41,
    h3: 0.41,
    h4: 0.41,
    h5: 0.35,
    h6: 0.38,
    subtitle1: 'normal',
    subtitle2: 'normal',
    body1: -0.24,
    body2: -0.08,
    button: 0.16,
    caption: 'normal',
    overline: 0.07,
    code1: 'normal',
    code2: 'normal',
  },

  lineHeight: {
    h1: '112px',
    h2: '72px',
    h3: '56px',
    h4: '40px',
    h5: '24px',
    h6: '24px',
    subtitle1: '24px',
    subtitle2: '24px',
    body1: '24px',
    body2: '20px',
    button: '16px',
    caption: '16px',
    overline: '16px',
    code1: '20px',
    code2: '16px',
  },
}

export interface FontFamily {
  headings?: string
  text: string
  code?: string
}

export interface FontWeight {
  light: number
  regular: number
  semibold: number
}

export interface FontSize {
  h1: number | string
  h2: number | string
  h3: number | string
  h4: number | string
  h5: number | string
  h6: number | string
  subtitle1: number | string
  subtitle2: number | string
  body1: number | string
  body2: number | string
  button: number | string
  caption: number | string
  overline: number | string
  code1: number | string
  code2: number | string
}

export interface Font {
  fontFamily: FontFamily
  fontWeight: FontWeight
  fontSize: FontSize
  letterSpacing: FontSize
  lineHeight: FontSize
}

export type Typography = Font
