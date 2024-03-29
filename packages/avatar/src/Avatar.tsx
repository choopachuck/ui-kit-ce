'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

import * as React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList } from '@v-uik/hooks'
import { useImageLoaded } from './hooks'
import { AvatarProps } from './types'
import { FallbackIcon } from './assets'
import { AvatarKind, AvatarSize } from './constants'
import { AvatarGroupContext } from './AvatarGroupContext'

const useStyles = createUseStyles(
  (theme) => {
    const avatarCircleStyle = {
      borderTopLeftRadius: theme.comp.avatar.shapeBorderRadiusTopLeftCircle,
      borderTopRightRadius: theme.comp.avatar.shapeBorderRadiusTopRightCircle,
      borderBottomLeftRadius:
        theme.comp.avatar.shapeBorderRadiusBottomLeftCircle,
      borderBottomRightRadius:
        theme.comp.avatar.shapeBorderRadiusBottomRightCircle,
    }
    const avatarRoundedStyle = {
      borderTopLeftRadius: theme.comp.avatar.shapeBorderRadiusTopLeftRounded,
      borderTopRightRadius: theme.comp.avatar.shapeBorderRadiusTopRightRounded,
      borderBottomLeftRadius:
        theme.comp.avatar.shapeBorderRadiusBottomLeftRounded,
      borderBottomRightRadius:
        theme.comp.avatar.shapeBorderRadiusBottomRightRounded,
    }

    const avatarSquareStyle = {
      borderTopLeftRadius: theme.comp.avatar.shapeBorderRadiusTopLeftSquare,
      borderTopRightRadius: theme.comp.avatar.shapeBorderRadiusTopRightSquare,
      borderBottomLeftRadius:
        theme.comp.avatar.shapeBorderRadiusBottomLeftSquare,
      borderBottomRightRadius:
        theme.comp.avatar.shapeBorderRadiusBottomRightSquare,
    }

    const avatarDefaultSizeStyle = {
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0.15,
      '& $icon': {
        '& svg': {
          height: 24,
          width: 24,
        },
      },
    }

    return {
      root: {
        fontFamily: theme.comp.avatar.typographyFontFamily,
        fontWeight: theme.comp.avatar.typographyFontWeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.comp.avatar.colorText,
      },
      colorDefault: {
        backgroundColor: theme.comp.avatar.colorBackground,
      },
      image: {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
      circle: {
        ...avatarCircleStyle,
        '& $image': {
          ...avatarCircleStyle,
        },
        '&$withBorder::after': {
          ...avatarCircleStyle,
        },
        '& $fallback': {
          ...avatarCircleStyle,
        },
      },
      rounded: {
        ...avatarRoundedStyle,
        '& $image': {
          ...avatarRoundedStyle,
        },
        '&$withBorder::after': {
          ...avatarRoundedStyle,
        },
        '& $fallback': {
          ...avatarRoundedStyle,
        },
      },
      square: {
        ...avatarSquareStyle,
        '& $image': {
          ...avatarSquareStyle,
        },
        '&$withBorder::after': {
          ...avatarSquareStyle,
        },
        '& $fallback': {
          ...avatarSquareStyle,
        },
      },
      customSize: {
        ...avatarDefaultSizeStyle,
      },
      extraSmall: {
        fontSize: 12,
        lineHeight: '16px',
        letterSpacing: 0.4,
        height: 24,
        width: 24,
        '& $icon': {
          '& svg': {
            height: 16,
            width: 16,
          },
        },
      },
      small: {
        fontSize: 14,
        lineHeight: '16px',
        letterSpacing: 0.25,
        height: 32,
        width: 32,
        '& $icon': {
          '& svg': {
            height: 20,
            width: 20,
          },
        },
      },
      medium: {
        height: 40,
        width: 40,
        ...avatarDefaultSizeStyle,
      },
      large: {
        fontSize: 20,
        lineHeight: '24px',
        letterSpacing: 0.15,
        height: 48,
        width: 48,
        '& $icon': {
          '& svg': {
            height: 32,
            width: 32,
          },
        },
      },
      extraLarge: {
        fontSize: 24,
        lineHeight: '32px',
        letterSpacing: 0.35,
        height: 64,
        width: 64,
        '& $icon': {
          '& svg': {
            height: 32,
            width: 32,
          },
        },
      },
      icon: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      withShadow: {
        boxShadow: theme.comp.avatar.elevationShadow,
      },
      withBorder: {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          height: '100%',
          width: '100%',
          border: `1px solid ${theme.comp.avatar.colorBorder}`,
        },
      },
      fallback: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
    }
  },
  { name: 'avatar' }
)

const getAttribute = <T extends unknown = string>(
  attr: keyof JSX.IntrinsicElements['img'],
  props?: JSX.IntrinsicElements['img'],
  defaultValue?: T
) => {
  return (props?.[attr] || defaultValue) as T
}

/**
 * Функция генерации текста для аватара, который состоит из каждой первой буквы первых двух слов из свойства `alt`
 */
const getCaptionFromAlt = ({ alt, imgProps }: AvatarProps) => {
  const altSplitted = getAttribute('alt', imgProps, alt)?.split(' ') || ['', '']

  return `${altSplitted?.[0]?.[0] ?? ''}${altSplitted?.[1]?.[0] ?? ''}`
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      classes,
      size: sizeProp,
      kind: kindProp,
      color: colorProp,
      children,
      src: srcProp,
      alt,
      imgProps,
      icon,
      withBorder: withBorderProp,
      withShadow: withShadowProp,
      style,
      fallback = <FallbackIcon />,
      className,
      ...rest
    },
    ref
  ) => {
    let content: React.ReactNode = null
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const src = getAttribute('src', imgProps, srcProp)
    const imageLoadedStatus = useImageLoaded({
      ...imgProps,
      src,
    })
    const avatarGroupContext = React.useContext(AvatarGroupContext)

    const size = sizeProp || avatarGroupContext?.size || AvatarSize.md
    const kind = kindProp || avatarGroupContext?.kind || AvatarKind.circle

    const color = colorProp || avatarGroupContext?.color
    const withBorder = withBorderProp || avatarGroupContext?.withBorder

    const withShadow = withShadowProp || avatarGroupContext?.withShadow

    const customAvatarSize = typeof size === 'number' ? size : undefined

    const avatarClassName = clsx(classesMap.root, className, {
      // size
      [classesMap.extraSmall]: size === AvatarSize.xs,
      [classesMap.small]: size === AvatarSize.sm,
      [classesMap.medium]: size === AvatarSize.md,
      [classesMap.large]: size === AvatarSize.lg,
      [classesMap.extraLarge]: size === AvatarSize.xl,
      [classesMap.customSize]: !!customAvatarSize,
      // kind
      [classesMap.circle]: kind === AvatarKind.circle,
      [classesMap.rounded]: kind === AvatarKind.rounded,
      [classesMap.square]: kind === AvatarKind.square,
      // default background
      [classesMap.colorDefault]: !color,
      // border
      [classesMap.withBorder]: withBorder,
      // shadow
      [classesMap.withShadow]: withShadow,
    })

    const imgBaseProps = {
      ...imgProps,
      className: clsx(classesMap.image, imgProps?.className),
    }

    const hasImage =
      imageLoadedStatus !== 'error' && (!!src || !!imgProps?.srcSet)

    const inlineStyle = {
      background: color,
      height: customAvatarSize,
      width: customAvatarSize,
      ...style,
    }

    if (hasImage) {
      content = <img src={src} alt={alt} {...imgBaseProps} />
    } else if (icon) {
      content = <div className={classesMap?.icon}>{icon}</div>
    } else if (children || getAttribute('alt', imgBaseProps, alt)) {
      content = children || getCaptionFromAlt({ alt, imgProps: imgBaseProps })
    } else {
      content = <div className={classesMap?.fallback}>{fallback}</div>
    }

    return (
      <div ref={ref} {...rest} style={inlineStyle} className={avatarClassName}>
        {content}
      </div>
    )
  }
)
