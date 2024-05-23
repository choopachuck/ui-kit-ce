'use client'

import { inverse } from '@v-uik/utils'

import { createTheme } from '../createTheme'
import { palette } from '../parts/palette'
import { ref } from '../ref'
import { barColourway } from '../parts/colourway/bar'
import { setAlphaChannel } from '../utils'

/**
 * Темная тема для системы токенов v1
 */
export const dark = createTheme({
  colors: {
    text: {
      default: palette.white.$0,
      inverse: palette.black.$100,
      disabled: palette.greyWarm.$10,
    },

    primary: inverse(palette.green),
    success: inverse(palette.green),
    monochrome: inverse(palette.greyWarm),

    warn: inverse(palette.yellow),
    info: inverse(palette.blue),
    error: inverse(palette.red),
  },
  colourway: {
    /**
     * Primary
     */
    primary: '#3F81FD',
    primaryHover: '#2A72F8',
    primarySelected: '#2364DE',
    primaryActive: '#1549AB',
    primaryHighlight: 'rgba(63, 129, 253, 0.14)',
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
    secondary: '#DCDCDC',
    secondaryHover: '#C9C9C9',
    secondarySelected: '#B5B5B5',
    secondaryActive: '#969696',
    secondaryHighlight: 'rgba(220, 220, 220, 0.14)',
    onSecondaryHigh: 'rgba(0, 0, 0, 0.96)',
    onSecondaryMedium: 'rgba(0, 0, 0, 0.79)',
    onSecondaryLow: 'rgba(0, 0, 0, 0.50)',
    onSecondaryDisabled: 'rgba(0, 0, 0, 0.21)',
    secondaryOverlayHover: 'rgba(0, 0, 0, 0.09)',
    secondaryOverlaySelected: 'rgba(0, 0, 0, 0.14)',
    secondaryOverlayActive: 'rgba(0, 0, 0, 0.21)',

    /**
     * Mono
     */
    mono01: 'rgba(255, 255, 255, 0.09)',
    mono02: 'rgba(255, 255, 255, 0.14)',
    mono03: 'rgba(255, 255, 255, 0.21)',
    mono04: 'rgba(255, 255, 255, 0.31)',
    mono05: 'rgba(255, 255, 255, 0.43)',
    mono06: 'rgba(255, 255, 255, 0.5)',
    mono07: 'rgba(255, 255, 255, 0.54)',
    mono08: 'rgba(255, 255, 255, 0.59)',

    /**
     * Background
     */
    background01: '#171717',
    background02: '#232323',
    background03: '#363636',
    backgroundComponent: '#232323',
    onBackgroundHigh: 'rgba(255, 255, 255, 0.87)',
    onBackgroundMedium: 'rgba(255, 255, 255, 0.71)',
    onBackgroundLow: 'rgba(255, 255, 255, 0.59)',
    onBackgroundDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Link
     */
    link: '#5993FF',
    linkHover: '#3F81FD',
    linkActive: '#2A72F8',
    linkVisited: '#C370FA',

    /**
     * Success
     */
    success: '#0C9C0C',
    successHover: '#0B8C0B',
    successSelected: '#077D07',
    successActive: '#055C05',
    onSuccessHigh: 'rgba(255, 255, 255, 0.95)',
    onSuccessMedium: 'rgba(255, 255, 255, 0.79)',
    onSuccessLow: 'rgba(255, 255, 255, 0.54)',
    onSuccessDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Error
     */
    error: '#FF2E43',
    errorHover: '#F31B31',
    errorSelected: '#D4192C',
    errorActive: '#9C1422',
    onErrorHigh: 'rgba(255, 255, 255, 0.95)',
    onErrorMedium: 'rgba(255, 255, 255, 0.79)',
    onErrorLow: 'rgba(255, 255, 255, 0.54)',
    onErrorDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Warning
     */
    warning: '#BB7F07',
    warningHover: '#AF7604',
    warningSelected: '#946300',
    warningActive: '#694907',
    onWarningHigh: 'rgba(255, 255, 255, 0.95)',
    onWarningMedium: 'rgba(255, 255, 255, 0.79)',
    onWarningLow: 'rgba(255, 255, 255, 0.54)',
    onWarningDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Support
     */
    support: '#898989',
    supportHover: '#818181',
    supportSelected: '#6D6D6D',
    supportActive: '#4E4E4E',
    onSupportHigh: 'rgba(255, 255, 255, 0.95)',
    onSupportMedium: 'rgba(255, 255, 255, 0.79)',
    onSupportLow: 'rgba(255, 255, 255, 0.54)',
    onSupportDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Info
     */
    info: '#078BE3',
    infoHover: '#097CC8',
    infoSelected: '#0F6EAE',
    infoActive: '#0E5381',
    onInfoHigh: 'rgba(255, 255, 255, 0.95)',
    onInfoMedium: 'rgba(255, 255, 255, 0.79)',
    onInfoLow: 'rgba(255, 255, 255, 0.54)',
    onInfoDisabled: 'rgba(255, 255, 255, 0.21)',

    /**
     * Disabled
     */
    disabledMajor: 'rgba(255, 255, 255, 0.31)',
    disabledMinor: 'rgba(255, 255, 255, 0.14)',
    disabledOpaque: '#4E4E4E',

    /**
     * Focus
     */
    focus: '#3F81FD',
    focusPocus: '#232323',

    /**
     * Skeleton
     */
    skeleton: 'rgba(255, 255, 255, 0.31)',

    /**
     * Inverse
     */
    inverse: '#E5E5E5',
    onInverseHigh: 'rgba(0, 0, 0, 0.96)',
    onInverseMedium: 'rgba(0, 0, 0, 0.79)',
    onInverseLow: 'rgba(0, 0, 0, 0.5)',
    onInverseDisabled: 'rgba(0, 0, 0, 0.21)',
    inverseOverlayHover: 'rgba(0, 0, 0, 0.09)',
    inverseOverlaySelected: 'rgba(0, 0, 0, 0.14)',
    inverseOverlayActive: 'rgba(0, 0, 0, 0.21)',

    /**
     * Colors
     */
    red: 'rgba(156, 20, 34, 0.7)',
    onRed: '#FDB5BC',
    yellow: 'rgba(85, 81, 12, 0.7)',
    onYellow: '#D6CB00',
    green: 'rgba(5, 92, 5, 0.7)',
    onGreen: '#45E545',
    azure: 'rgba(4, 86, 108, 0.7)',
    onAzure: '#4AD6FC',
    blue: 'rgba(20, 73, 171, 0.7)',
    onBlue: '#A9C6FE',
    violet: 'rgba(114, 43, 161, 0.7)',
    onViolet: '#DEB7F7',
    gray: 'rgba(78, 78, 78, 0.7)',
    onGray: '#C9C9C9',

    /**
     * Bar colors
     */
    bar: {
      dark: barColourway.dark,
      light: barColourway.dark,
      primary: barColourway.dark,
    },
  },
})

/**
 * Токены v2 для темной темы
 */
export const darkOverrides = {
  sys: {
    color: {
      /**
       * Background
       */
      backgroundAlpha: ref.palette.coldGray20,
      backgroundBeta: ref.palette.coldGray15,
      backgroundGamma: ref.palette.coldGray10,
      backgroundComponent: ref.palette.coldGray15,
      onBackgroundHigh: ref.palette.gray95,
      onBackgroundMedium: setAlphaChannel(
        ref.palette.gray95,
        ref.alpha.channel60
      ),
      onBackgroundLow: setAlphaChannel(ref.palette.gray95, ref.alpha.channel45),

      /**
       * Inverse
       */
      inverseBackgroundAlpha: ref.palette.gray90,
      inverseBackgroundBeta: ref.palette.gray80,
      inverseOnBackgroundHigh: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel90
      ),

      /**
       * Primary
       */
      primaryOverlayActive: setAlphaChannel(
        ref.palette.electricBlue40,
        ref.alpha.channel25
      ),
      primaryOverlayHover: setAlphaChannel(
        ref.palette.electricBlue40,
        ref.alpha.channel20
      ),
      primaryOverlaySelect: setAlphaChannel(
        ref.palette.electricBlue40,
        ref.alpha.channel15
      ),
      primaryOverlayToning: setAlphaChannel(
        ref.palette.electricBlue40,
        ref.alpha.channel10
      ),
      primaryAlpha: ref.palette.electricBlue50,
      primaryBeta: ref.palette.electricBlue40,
      primaryGamma: ref.palette.electricBlue30,
      onPrimaryHigh: ref.palette.white,
      onPrimaryMedium: setAlphaChannel(ref.palette.white, ref.alpha.channel85),
      onPrimaryLow: setAlphaChannel(ref.palette.white, ref.alpha.channel70),

      /**
       * Secondary
       */
      secondaryAlpha: ref.palette.gray90,
      secondaryBeta: ref.palette.gray80,
      secondaryGamma: ref.palette.gray70,
      onSecondaryHigh: ref.palette.black,
      onSecondaryMedium: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel85
      ),
      onSecondaryLow: setAlphaChannel(ref.palette.black, ref.alpha.channel70),

      /**
       * Neutral
       */
      neutralAlpha: ref.palette.gray50,
      neutralBeta: ref.palette.gray60,
      neutralGamma: ref.palette.gray70,
      onNeutralHigh: ref.palette.black,
      onNeutralMedium: setAlphaChannel(ref.palette.black, ref.alpha.channel90),
      onNeutralLow: setAlphaChannel(ref.palette.black, ref.alpha.channel80),

      /**
       * Overlay
       */
      secondaryOverlayActive: setAlphaChannel(
        ref.palette.gray90,
        ref.alpha.channel25
      ),
      secondaryOverlayHover: setAlphaChannel(
        ref.palette.gray90,
        ref.alpha.channel20
      ),
      secondaryOverlaySelect: setAlphaChannel(
        ref.palette.gray90,
        ref.alpha.channel15
      ),
      secondaryOverlayToning: setAlphaChannel(
        ref.palette.gray90,
        ref.alpha.channel10
      ),
      onBackgroundOverlayActive: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel20
      ),
      onBackgroundOverlayHover: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel15
      ),
      onBackgroundOverlaySelect: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel10
      ),
      onBackgroundOverlayToning: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel5
      ),

      /**
       * Disabled
       */
      disabled: ref.palette.gray30,
      disabledHigh: setAlphaChannel(ref.palette.white, ref.alpha.channel25),
      disabledMedium: setAlphaChannel(ref.palette.white, ref.alpha.channel10),
      disabledLow: setAlphaChannel(ref.palette.white, ref.alpha.channel5),

      /**
       * Focus
       */
      focus: ref.palette.gray80,
      focusPocus: ref.palette.gray15,

      /**
       * Separator
       */
      separationMajor: setAlphaChannel(ref.palette.gray50, ref.alpha.channel55),
      separationMinor: setAlphaChannel(ref.palette.gray50, ref.alpha.channel30),

      /**
       * Colors
       */
      errorAlpha: ref.palette.red60,
      errorBeta: ref.palette.red50,
      errorGamma: ref.palette.red40,
      infoAlpha: ref.palette.blue60,
      onErrorHigh: ref.palette.black,
      onErrorMedium: setAlphaChannel(ref.palette.black, ref.alpha.channel85),
      onErrorLow: setAlphaChannel(ref.palette.black, ref.alpha.channel70),
      successAlpha: ref.palette.green60,
      warningAlpha: ref.palette.gold70,
      backdropColorBackground: setAlphaChannel(
        ref.palette.coldGray10,
        ref.alpha.channel65
      ),

      inverseOnBackgroundMedium: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel60
      ),
      inverseOnBackgroundLow: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel45
      ),

      inverseOnBackgroundOverlayToning: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel5
      ),
      inverseOnBackgroundOverlaySelect: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel10
      ),
      inverseOnBackgroundOverlayHover: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel15
      ),
      inverseOnBackgroundOverlayActive: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel20
      ),

      onPrimaryOverlayToning: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel5
      ),
      onPrimaryOverlaySelect: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel10
      ),
      onPrimaryOverlayHover: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel15
      ),
      onPrimaryOverlayActive: setAlphaChannel(
        ref.palette.white,
        ref.alpha.channel20
      ),

      onSecondaryOverlayToning: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel5
      ),
      onSecondaryOverlaySelect: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel10
      ),
      onSecondaryOverlayHover: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel15
      ),
      onSecondaryOverlayActive: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel20
      ),

      inverseNeutralAlpha: ref.palette.gray60,

      onSuccessHigh: ref.palette.black,
      onWarningHigh: ref.palette.black,

      inverseDisabled: ref.palette.gray80,

      inverseDisabledHigh: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel25
      ),
      inverseDisabledMedium: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel10
      ),
      inverseDisabledLow: setAlphaChannel(
        ref.palette.black,
        ref.alpha.channel5
      ),

      inverseFocus: ref.palette.gray30,
      inverseFocusPocus: ref.palette.coldGray95,

      inverseSeparationMajor: setAlphaChannel(
        ref.palette.gray60,
        ref.alpha.channel55
      ),
      inverseSeparationMinor: setAlphaChannel(
        ref.palette.gray60,
        ref.alpha.channel30
      ),
    },
  },
  comp: {
    backwardCompatibilityMode: false,
    link: {
      colorText: ref.palette.electricBlue60,
      colorTextHover: ref.palette.electricBlue70,
      colorTextActive: ref.palette.electricBlue80,
      colorTextVisited: ref.palette.orchid60,
    },
    slider: {
      trackColorBackground: setAlphaChannel(
        ref.palette.gray50,
        ref.alpha.channel45
      ),
    },
    tag: {
      colorBackgroundAzure: setAlphaChannel(
        ref.palette.skyBlue30,
        ref.alpha.channel70
      ),
      colorTextAzure: ref.palette.skyBlue80,
      colorBackgroundBlue: setAlphaChannel(
        ref.palette.electricBlue30,
        ref.alpha.channel70
      ),
      colorTextBlue: ref.palette.electricBlue80,
      colorBackgroundGray: setAlphaChannel(
        ref.palette.gray30,
        ref.alpha.channel70
      ),
      colorTextGray: ref.palette.gray80,
      colorBackgroundGreen: setAlphaChannel(
        ref.palette.green30,
        ref.alpha.channel70
      ),
      colorTextGreen: ref.palette.green80,
      colorBackgroundRed: setAlphaChannel(
        ref.palette.red30,
        ref.alpha.channel70
      ),
      colorTextRed: ref.palette.red80,
      colorBackgroundViolet: setAlphaChannel(
        ref.palette.orchid30,
        ref.alpha.channel70
      ),
      colorTextViolet: ref.palette.orchid80,
      colorBackgroundYellow: setAlphaChannel(
        ref.palette.sunny30,
        ref.alpha.channel70
      ),
      colorTextYellow: ref.palette.sunny80,
    },
    inlineNotification: {
      colorBackgroundFilledError: '#5B0C06',
      colorBackgroundFilledWarning: '#544303',
      colorBackgroundFilledSuccess: '#0B5118',
      colorBackgroundFilledInfo: '#034775',
      colorBackgroundFilledNeutral: '#454545',
    },
    underlay: {
      colorBackgroundFilledError: '#5B0C06',
      colorBackgroundFilledWarning: '#544303',
      colorBackgroundFilledSuccess: '#0B5118',
      colorBackgroundFilledInfo: '#034775',
      colorBackgroundFilledNeutral: '#454545',
    },
    card: {
      colorBackgroundClickableHover: '#2E3D43',
      colorBackgroundClickableActive: '#404F54',
      colorBackgroundSelectableHover: '#2E3D43',
      colorBackgroundSelectableActive: '#404F54',
      colorBackgroundSelectableCheckedHover: '#2E3D43',
      colorBackgroundSelectableCheckedActive: '#404F54',
    },
  },
}
