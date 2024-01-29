import { Theme } from '../../interface'
import { setAlphaChannel } from '../../utils'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createColor = (theme: Theme) => ({
  // BACKGROUND
  backgroundAlpha: theme.ref.palette.white,
  backgroundBeta: theme.ref.palette.coldGray95,
  backgroundGamma: theme.ref.palette.coldGray90,
  backgroundComponent: theme.ref.palette.coldGray95,
  onBackgroundHigh: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel90
  ),
  onBackgroundMedium: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel60
  ),
  onBackgroundLow: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel45
  ),
  onBackgroundOverlayToning: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel5
  ),
  onBackgroundOverlaySelect: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel10
  ),
  onBackgroundOverlayHover: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel15
  ),
  onBackgroundOverlayActive: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel20
  ),
  inverseBackgroundAlpha: theme.ref.palette.coldGray20,
  inverseBackgroundBeta: theme.ref.palette.coldGray15,
  inverseOnBackgroundHigh: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel90
  ),
  inverseOnBackgroundMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel60
  ),
  inverseOnBackgroundLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel45
  ),
  inverseOnBackgroundOverlayToning: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel5
  ),
  inverseOnBackgroundOverlaySelect: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel10
  ),
  inverseOnBackgroundOverlayHover: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel15
  ),
  inverseOnBackgroundOverlayActive: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel20
  ),

  // PRIMARY
  primaryAlpha: theme.ref.palette.electricBlue50,
  primaryBeta: theme.ref.palette.electricBlue40,
  primaryGamma: theme.ref.palette.electricBlue30,
  onPrimaryHigh: theme.ref.palette.white,
  onPrimaryMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel85
  ),
  onPrimaryLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel70
  ),
  primaryOverlayToning: setAlphaChannel(
    theme.ref.palette.electricBlue50,
    theme.ref.alpha.channel10
  ),
  primaryOverlaySelect: setAlphaChannel(
    theme.ref.palette.electricBlue50,
    theme.ref.alpha.channel15
  ),
  primaryOverlayHover: setAlphaChannel(
    theme.ref.palette.electricBlue50,
    theme.ref.alpha.channel20
  ),
  primaryOverlayActive: setAlphaChannel(
    theme.ref.palette.electricBlue50,
    theme.ref.alpha.channel25
  ),
  onPrimaryOverlayToning: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel10
  ),
  onPrimaryOverlaySelect: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel15
  ),
  onPrimaryOverlayHover: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel20
  ),
  onPrimaryOverlayActive: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel25
  ),
  inversePrimaryAlpha: theme.ref.palette.electricBlue60,
  inversePrimaryBeta: theme.ref.palette.electricBlue50,
  inversePrimaryGamma: theme.ref.palette.electricBlue40,
  inverseOnPrimaryHigh: theme.ref.palette.white,
  inverseOnPrimaryMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel85
  ),
  inverseOnPrimaryLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel70
  ),

  // SECONDARY
  secondaryAlpha: theme.ref.palette.gray20,
  secondaryBeta: theme.ref.palette.gray30,
  secondaryGamma: theme.ref.palette.gray40,
  onSecondaryHigh: theme.ref.palette.white,
  onSecondaryMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel85
  ),
  onSecondaryLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel70
  ),
  secondaryOverlayToning: setAlphaChannel(
    theme.ref.palette.gray20,
    theme.ref.alpha.channel10
  ),
  secondaryOverlaySelect: setAlphaChannel(
    theme.ref.palette.gray20,
    theme.ref.alpha.channel15
  ),
  secondaryOverlayHover: setAlphaChannel(
    theme.ref.palette.gray20,
    theme.ref.alpha.channel20
  ),
  secondaryOverlayActive: setAlphaChannel(
    theme.ref.palette.gray20,
    theme.ref.alpha.channel25
  ),
  onSecondaryOverlayToning: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel10
  ),
  onSecondaryOverlaySelect: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel15
  ),
  onSecondaryOverlayHover: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel20
  ),
  onSecondaryOverlayActive: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel25
  ),

  // NEUTRAL
  neutralAlpha: theme.ref.palette.gray60,
  neutralBeta: theme.ref.palette.gray50,
  neutralGamma: theme.ref.palette.gray40,
  onNeutralHigh: theme.ref.palette.white,
  onNeutralMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel90
  ),
  onNeutralLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel80
  ),
  inverseNeutralAlpha: theme.ref.palette.gray50,

  // SUCCESS
  successAlpha: theme.ref.palette.green50,
  onSuccessHigh: theme.ref.palette.white,

  // WARNING
  warningAlpha: theme.ref.palette.gold80,
  onWarningHigh: theme.ref.palette.black,

  // INFO
  infoAlpha: theme.ref.palette.blue50,
  onInfoHigh: theme.ref.palette.white,

  // ERROR
  errorAlpha: theme.ref.palette.red50,
  errorBeta: theme.ref.palette.red40,
  errorGamma: theme.ref.palette.red30,
  onErrorHigh: theme.ref.palette.white,
  onErrorMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel85
  ),
  onErrorLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel70
  ),

  // STATES
  disabled: theme.ref.palette.gray80,
  disabledHigh: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel25
  ),
  disabledMedium: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel10
  ),
  disabledLow: setAlphaChannel(
    theme.ref.palette.black,
    theme.ref.alpha.channel5
  ),
  inverseDisabledHigh: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel25
  ),
  inverseDisabledMedium: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel10
  ),
  inverseDisabledLow: setAlphaChannel(
    theme.ref.palette.white,
    theme.ref.alpha.channel5
  ),
  focus: theme.ref.palette.electricBlue50,
  focusPocus: theme.ref.palette.gray95,
  inverseFocus: theme.ref.palette.electricBlue60,
  inverseFocusPocus: theme.ref.palette.gray20,

  // SEPARATION
  separationMajor: setAlphaChannel(
    theme.ref.palette.gray60,
    theme.ref.alpha.channel55
  ),
  separationMinor: setAlphaChannel(
    theme.ref.palette.gray60,
    theme.ref.alpha.channel30
  ),
  inverseSeparationMajor: setAlphaChannel(
    theme.ref.palette.gray50,
    theme.ref.alpha.channel55
  ),
  inverseSeparationMinor: setAlphaChannel(
    theme.ref.palette.gray50,
    theme.ref.alpha.channel30
  ),
})
