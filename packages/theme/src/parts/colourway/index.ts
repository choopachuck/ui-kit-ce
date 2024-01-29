import { barColourway } from './bar'

export const colourway = {
  /**
   * Primary
   */
  primary: '#2A72F8',
  primaryHover: '#2364DE',
  primarySelected: '#1549AB',
  primaryActive: '#0C327A',
  primaryHighlight: 'rgba(42, 114, 248, 0.14)',
  onPrimaryHigh: 'rgba(255, 255, 255, 0.95)',
  onPrimaryMedium: 'rgba(255, 255, 255, 0.79)',
  onPrimaryLow: 'rgba(255, 255, 255, 0.54)',
  onPrimaryDisabled: 'rgba(255, 255, 255, 0.21)',
  onPrimaryOverDisabled: 'rgba(255, 255, 255, 0.54)',
  primaryOverlayHover: 'rgba(255, 255, 255, 0.09)',
  primaryOverlaySelected: 'rgba(255, 255, 255, 0.14)',
  primaryOverlayActive: 'rgba(255, 255, 255, 0.21)',

  /**
   * Overlay
   */
  overlay: 'rgba(255, 255, 255, 0)',
  overlayHover: 'rgba(255, 255, 255, 0.09)',
  overlaySelected: 'rgba(255, 255, 255, 0.14)',
  overlayActive: 'rgba(255, 255, 255, 0.21)',

  /**
   * Secondary
   */
  secondary: '#363636',
  secondaryHover: '#4E4E4E',
  secondarySelected: '#6D6D6D',
  secondaryActive: '#818181',
  secondaryHighlight: 'rgba(54, 54, 54, 0.14)',
  onSecondaryHigh: 'rgba(255, 255, 255, 0.95)',
  onSecondaryMedium: 'rgba(255, 255, 255, 0.79)',
  onSecondaryLow: 'rgba(255, 255, 255, 0.54)',
  onSecondaryDisabled: 'rgba(255, 255, 255, 0.21)',
  secondaryOverlayHover: 'rgba(255, 255, 255, 0.09)',
  secondaryOverlaySelected: 'rgba(255, 255, 255, 0.14)',
  secondaryOverlayActive: 'rgba(255, 255, 255, 0.21)',

  /**
   * Mono
   */
  mono01: 'rgba(0, 0, 0, 0.05)',
  mono02: 'rgba(0, 0, 0, 0.1)',
  mono03: 'rgba(0, 0, 0, 0.13)',
  mono04: 'rgba(0, 0, 0, 0.21)',
  mono05: 'rgba(0, 0, 0, 0.29)',
  mono06: 'rgba(0, 0, 0, 0.41)',
  mono07: 'rgba(0, 0, 0, 0.46)',
  mono08: 'rgba(0, 0, 0, 0.5)',

  /**
   * Background
   */
  background01: '#FFFFFF',
  background02: '#F2F2F2',
  background03: '#E5E5E5',
  backgroundComponent: '#F2F2F2',
  onBackgroundHigh: 'rgba(0, 0, 0, 0.86)',
  onBackgroundMedium: 'rgba(0, 0, 0, 0.7)',
  onBackgroundLow: 'rgba(0, 0, 0, 0.57)',
  onBackgroundDisabled: 'rgba(0, 0, 0, 0.21)',

  /**
   * Link
   */
  link: '#2364DE',
  linkHover: '#1549AB',
  linkActive: '#0C327A',
  linkVisited: '#9B38DC',

  /**
   * Success
   */
  success: '#0B8C0B',
  successHover: '#077D07',
  successSelected: '#055C05',
  successActive: '#084008',
  onSuccessHigh: 'rgba(255, 255, 255, 0.95)',
  onSuccessMedium: 'rgba(255, 255, 255, 0.79)',
  onSuccessLow: 'rgba(255, 255, 255, 0.54)',
  onSuccessDisabled: 'rgba(255, 255, 255, 0.21)',

  /**
   * Error
   */
  error: '#F31B31',
  errorHover: '#D4192C',
  errorSelected: '#9C1422',
  errorActive: '#6B1019',
  onErrorHigh: 'rgba(255, 255, 255, 0.95)',
  onErrorMedium: 'rgba(255, 255, 255, 0.79)',
  onErrorLow: 'rgba(255, 255, 255, 0.54)',
  onErrorDisabled: 'rgba(255, 255, 255, 0.21)',

  /**
   * Warning
   */
  warning: '#AF7604',
  warningHover: '#946300',
  warningSelected: '#694907',
  warningActive: '#493203',
  onWarningHigh: 'rgba(255, 255, 255, 0.95)',
  onWarningMedium: 'rgba(255, 255, 255, 0.79)',
  onWarningLow: 'rgba(255, 255, 255, 0.54)',
  onWarningDisabled: 'rgba(255, 255, 255, 0.21)',

  /**
   * Support
   */
  support: '#818181',
  supportHover: '#6D6D6D',
  supportSelected: '#4E4E4E',
  supportActive: '#363636',
  onSupportHigh: 'rgba(255, 255, 255, 0.95)',
  onSupportMedium: 'rgba(255, 255, 255, 0.79)',
  onSupportLow: 'rgba(255, 255, 255, 0.54)',
  onSupportDisabled: 'rgba(255, 255, 255, 0.21)',

  /**
   * Info
   */
  info: '#097CC8',
  infoHover: '#0F6EAE',
  infoSelected: '#0E5381',
  infoActive: '#0E3A58',
  onInfoHigh: 'rgba(255, 255, 255, 0.95)',
  onInfoMedium: 'rgba(255, 255, 255, 0.79)',
  onInfoLow: 'rgba(255, 255, 255, 0.54)',
  onInfoDisabled: 'rgba(255, 255, 255, 0.21)',

  /**
   * Disabled
   */
  disabledMajor: 'rgba(0, 0, 0, 0.21)',
  disabledMinor: 'rgba(0, 0, 0, 0.1)',
  disabledOpaque: '#C9C9C9',

  /**
   * Focus
   */
  focus: '#2A72F8',
  focusPocus: '#F2F2F2',

  /**
   * Skeleton
   */
  skeleton: 'rgba(0, 0, 0, 0.21)',

  /**
   * Inverse
   */
  inverse: '#363636',
  onInverseHigh: 'rgba(255, 255, 255, 0.95)',
  onInverseMedium: 'rgba(255, 255, 255, 0.79)',
  onInverseLow: 'rgba(255, 255, 255, 0.54)',
  onInverseDisabled: 'rgba(255, 255, 255, 0.21)',
  inverseOverlayHover: 'rgba(255, 255, 255, 0.09)',
  inverseOverlaySelected: 'rgba(255, 255, 255, 0.14)',
  inverseOverlayActive: 'rgba(255, 255, 255, 0.21)',

  /**
   * Colors
   */
  red: 'rgba(253, 181, 188, 0.7)',
  onRed: '#9C1422',
  yellow: 'rgba(235, 223, 0, 0.7)',
  onYellow: '#55510C',
  green: 'rgba(117, 245, 117, 0.7)',
  onGreen: '#055C05',
  azure: 'rgba(138, 229, 255, 0.7)',
  onAzure: '#073C4B',
  blue: 'rgba(169, 198, 254, 0.7)',
  onBlue: '#1449AB',
  violet: 'rgba(222, 183, 247, 0.7)',
  onViolet: '#722BA1',
  gray: 'rgba(201, 201, 201, 0.7)',
  onGray: '#4E4E4E',

  /**
   * Shadows
   */
  shadow01: '0 0 4px 0 rgba(0, 0, 0, 0.22), 0 2px 4px 0 rgba(0, 0, 0, 0.12)',
  shadow02: '0 2px 4px 0 rgba(0, 0, 0, 0.34)',
  shadow03: '0px 2px 8px 0 rgba(0, 0, 0, 0.34)',

  /**
   * Bar colors
   */
  bar: barColourway,
}

export type Colourway = typeof colourway
