import React from 'react'
import { light } from '../../theme/src'
import {
  AvatarKind,
  AvatarKindType,
  AvatarSize,
  AvatarSizeType,
  AvatarGroupSize,
} from '../src'
import { UserIcon } from '../examples/assets'

export type TestDataWithSizes = {
  size: AvatarSizeType
  text: string
  icon: React.ReactNode
}[]

export const avatarSizesAsArray = Object.values(AvatarSize)

export const avatarGroupSizesAsArray = Object.values(AvatarGroupSize)

export const avatarKindsAsArray = Object.values(AvatarKind)

// #region Часть стилей описана хардкодом, так как не все значения привязаны к токенам темы

const avatarMdStyle = {
  className: 'medium',
  avatar: {
    height: '40px',
    width: '40px',
  },
  icon: {
    height: '24px',
    width: '24px',
  },
  font: {
    'font-size': '16px',
    'line-height': '24px',
    'letter-spacing': '0.15px',
  },
}

export const avatarTestData = {
  avatarClassName: 'avatar-root',
  text: 'ИП',
  kind: {
    [AvatarKind.circle]: {
      className: 'circle',
      style: {
        'border-top-left-radius': `${light.comp.avatar.shapeBorderRadiusTopLeftCircle}px`,
        'border-top-right-radius': `${light.comp.avatar.shapeBorderRadiusTopRightCircle}px`,
        'border-bottom-left-radius': `${light.comp.avatar.shapeBorderRadiusBottomLeftCircle}px`,
        'border-bottom-right-radius': `${light.comp.avatar.shapeBorderRadiusBottomRightCircle}px`,
      },
    },
    [AvatarKind.rounded]: {
      className: 'rounded',
      style: {
        'border-top-left-radius': `${light.comp.avatar.shapeBorderRadiusTopLeftRounded}px`,
        'border-top-right-radius': `${light.comp.avatar.shapeBorderRadiusTopRightRounded}px`,
        'border-bottom-left-radius': `${light.comp.avatar.shapeBorderRadiusBottomLeftRounded}px`,
        'border-bottom-right-radius': `${light.comp.avatar.shapeBorderRadiusBottomRightRounded}px`,
      },
    },
    [AvatarKind.square]: {
      className: 'square',
      style: {
        'border-top-left-radius':
          light.comp.avatar.shapeBorderRadiusTopLeftSquare,
        'border-top-right-radius':
          light.comp.avatar.shapeBorderRadiusTopRightSquare,
        'border-bottom-left-radius':
          light.comp.avatar.shapeBorderRadiusBottomLeftSquare,
        'border-bottom-right-radius':
          light.comp.avatar.shapeBorderRadiusBottomRightSquare,
      },
    },
  },
  size: {
    [AvatarSize.xs]: {
      className: 'extraSmall',
      avatar: {
        height: '24px',
        width: '24px',
      },
      icon: {
        height: '16px',
        width: '16px',
      },
      font: {
        'font-size': '12px',
        'line-height': '16px',
        'letter-spacing': '0.4px',
      },
    },
    [AvatarSize.sm]: {
      className: 'small',
      avatar: {
        height: '32px',
        width: '32px',
      },
      icon: {
        height: '20px',
        width: '20px',
      },
      font: {
        'font-size': '14px',
        'line-height': '16px',
        'letter-spacing': '0.25px',
      },
    },
    [AvatarSize.md]: {
      ...avatarMdStyle,
    },
    [AvatarSize.lg]: {
      className: 'large',
      avatar: {
        height: '48px',
        width: '48px',
      },
      icon: {
        height: '32px',
        width: '32px',
      },
      font: {
        'font-size': '20px',
        'line-height': '24px',
        'letter-spacing': '0.15px',
      },
    },
    [AvatarSize.xl]: {
      className: 'extraLarge',
      avatar: {
        height: '64px',
        width: '64px',
      },
      icon: {
        height: '32px',
        width: '32px',
      },
      font: {
        'font-size': '24px',
        'line-height': '32px',
        'letter-spacing': '0.35px',
      },
      '77': {
        avatar: {
          height: '77px',
          width: '77px',
        },
        icon: {
          ...avatarMdStyle.icon,
        },
        font: {
          ...avatarMdStyle.font,
        },
      },
    },
  },
  withShadow: {
    className: 'withShadow',
  },
  withBorder: {
    className: 'withBorder',
  },
  fallback: {
    className: 'fallback',
  },
  avatarGroup: {
    size: {
      [AvatarGroupSize.xs]: {
        style: {
          marginLeft: -4,
          border: `2px solid ${light.comp.avatar.avatarGroupColorBorder}`,
        },
      },
      [AvatarGroupSize.sm]: {
        style: {
          marginLeft: -8,
          border: `2px solid ${light.comp.avatar.avatarGroupColorBorder}`,
        },
      },
      [AvatarGroupSize.md]: {
        style: {
          marginLeft: -16,
          border: `2px solid ${light.comp.avatar.avatarGroupColorBorder}`,
        },
      },
    },
  },
}

// #endregion

/**
 * Сгенерировать массив тестовых данных для теста `avatar size changes via size property`
 *
 * Содержит размер аватара (`size`), тестовый текст (`text`) и иконку (`icon`)
 */
export const generateTestDataWithSizes = (): TestDataWithSizes => {
  const data: TestDataWithSizes = []

  avatarSizesAsArray.reduce((accum, size) => {
    accum.push({
      size,
      text: 'ИП',
      icon: <UserIcon />,
    })

    return accum
  }, data)

  return data
}

/**
 * Сгенерировать массив тестовых данных для теста `avatar kind changes via kind property`
 *
 * Содержит ключи объекта скруглений AvatarKind
 */
export const generateTestDataWithKinds = (): AvatarKindType[] =>
  Object.keys(AvatarKind) as AvatarKindType[]
