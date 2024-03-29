'use client'

import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { UsePaletteColors } from '@v-uik/hooks'
import { AvatarGroupProps, AvatarGroupPalette } from '../AvatarGroup'
import { AvatarGroupClasses } from '../classes'
import { AvatarProps, AvatarGroupSizeType } from '../types'
import { AvatarGroupSize } from '../constants'

const avatarStylesBySize: Record<AvatarGroupSizeType, React.CSSProperties> = {
  [AvatarGroupSize.xs]: {
    marginLeft: -4,
  },
  [AvatarGroupSize.sm]: {
    marginLeft: -8,
  },
  [AvatarGroupSize.md]: {
    marginLeft: -16,
  },
}

export type GetChildrenInlineStyleByIndexOptions = Pick<
  AvatarGroupProps,
  'size' | 'gap'
> & {
  isVisible?: boolean
}

export type UseAvatarGroupItemsProps = Pick<
  AvatarGroupProps,
  'max' | 'gap' | 'size' | 'items'
> & {
  classesMap: AvatarGroupClasses
  palette: AvatarGroupPalette
}

export const getChildrenInlineStyleByIndex = (
  index: number,
  { gap, size, isVisible }: GetChildrenInlineStyleByIndexOptions
): React.CSSProperties => {
  let style: React.CSSProperties = {}

  if (index === 0 || !isVisible) {
    return style
  }

  if (gap !== undefined) {
    style.marginLeft = gap * -1
  } else if (size && AvatarGroupSize[size]) {
    style = {
      ...avatarStylesBySize[size],
    }
  }

  return style
}

export type UseAvatarGroupItemsReturnProps = [AvatarProps[], AvatarProps[]]

export const useAvatarGroupItems = ({
  items,
  classesMap,
  palette,
  max = 0,
  size,
  gap,
}: UseAvatarGroupItemsProps): UseAvatarGroupItemsReturnProps =>
  React.useMemo(() => {
    let paletteColorIndex = 0
    const visibleItems: AvatarProps[] = []
    const hiddenItems: AvatarProps[] = []

    items.forEach((itemProps, itemIndex) => {
      const isVisible = max > 0 ? itemIndex < max : true
      const className = clsx(itemProps?.className, isVisible && classesMap.item)
      let paletteColor: UsePaletteColors | undefined

      const item: AvatarProps = { ...itemProps, className }
      const avatarInlineStyle: React.CSSProperties = {
        ...itemProps?.style,
        ...getChildrenInlineStyleByIndex(itemIndex, { size, gap, isVisible }),
      }

      if (palette?.[paletteColorIndex]) {
        paletteColor = palette?.[paletteColorIndex]
      } else {
        paletteColorIndex = 0
        paletteColor = palette?.[paletteColorIndex]
      }

      paletteColorIndex++

      const avatarTextColor = itemProps?.style?.color || paletteColor?.textColor
      const avatarBackgroundColor =
        itemProps.color || paletteColor?.backgroundColor

      if (avatarTextColor) {
        avatarInlineStyle.color = avatarTextColor
      }

      if (Object.keys(avatarInlineStyle).length) {
        item.style = avatarInlineStyle
      }

      if (avatarBackgroundColor) {
        item.color = avatarBackgroundColor
      }

      if (isVisible) {
        visibleItems.push(item)
      } else {
        hiddenItems.push(item)
      }
    })

    return [visibleItems, hiddenItems]
  }, [items, classesMap, palette, max, size, gap])
