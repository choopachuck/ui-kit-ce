'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

import React from 'react'
import { createUseStyles, clsx } from '@v-uik/theme'
import { useClassList, usePalette, UsePaletteColors } from '@v-uik/hooks'
import { AvatarGroupContextProvider } from './AvatarGroupContext'
import { AvatarGroupComponentsConfig, getComponents } from './components'
import {
  AvatarProps,
  AvatarGroupSizeType,
  AvatarGroupColoringType,
} from './types'
import { AvatarGroupClasses } from './classes'
import { AvatarGroupSize, AvatarKind } from './constants'
import { AvatarGroupColoring } from '.'
import { useAvatarGroupItems, getChildrenInlineStyleByIndex } from './hooks'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

const useStyles = createUseStyles(
  (theme) => ({
    item: {
      border: `2px solid ${theme.comp.avatar.avatarGroupColorBorder}`,
      position: 'relative',
    },
    root: {
      display: 'inline-flex',
      flexDirection: 'row',
    },
    extraSmall: {},
    small: {},
    medium: {},
  }),
  { name: 'avatarGroup' }
)

export type AvatarGroupPalette = UsePaletteColors[] | undefined

export type AvatarGroupProps = Omit<ComponentPropsWithRefFix<'div'>, 'ref'> &
  Pick<AvatarProps, 'kind' | 'withBorder' | 'withShadow'> & {
    /**
     * Свойства для аватаров в группе
     */
    items: AvatarProps[]
    /**
     * CSS классы компонента
     */
    classes?: AvatarGroupClasses
    /**
     * Пользовательский отступ между аватарами
     */
    gap?: number
    /**
     * Размер группы аватаров
     */
    size?: AvatarGroupSizeType
    /**
     * Максимальное количество аватаров в группе
     */
    max?: number
    /**
     * Показывать дополнительный контент справа от аватаров при пустом значении `max`
     */
    showExtra?: boolean
    /**
     * Свойство для переопределения элементов AvatarGroup
     */
    components?: AvatarGroupComponentsConfig
    /**
     * Свойство для автоматического окрашивания аватаров, у которых не указан `color`. `static` - каждый аватар окрашивается в один и тот же цвет из палитры при каждом ререндере и перезагрузке страницы, `random` - каждый аватар окрашивается в случайный цвет из палитры и при каждом ререндере цвета остаются, но при перезагрузке страницы цвета снова будут разные, `none` - автоматическое окрашивание отключено
     */
    coloring?: AvatarGroupColoringType
    /**
     * Функция для генерации массива с пользовательской палитрой при `coloring="static"` или `coloring="random"`
     */
    getPalette?: (coloring: AvatarGroupColoringType) => AvatarGroupPalette
  }

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      components,
      max,
      classes,
      gap,
      size: sizeProp = AvatarGroupSize.md,
      kind = AvatarKind.circle,
      showExtra = false,
      coloring = AvatarGroupColoring.none,
      getPalette,
      withBorder = false,
      withShadow = false,
      className,
      items,
      ...rest
    },
    ref
  ) => {
    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)
    const { recreate } = usePalette(50, {
      lazy: true,
      shuffle: coloring === AvatarGroupColoring.random,
    })
    const [palette, setPalette] = React.useState<AvatarGroupPalette>([])

    const hasSize = sizeProp ? !!AvatarGroupSize[sizeProp] : false

    const size = hasSize ? sizeProp : AvatarGroupSize.md

    const { Extra, Avatar } = getComponents(components)

    const [visibleItems, hiddenItems] = useAvatarGroupItems({
      items,
      classesMap,
      palette,
      max,
      size,
      gap,
    })

    const rootClassName = clsx(classesMap.root, className, {
      [classesMap.extraSmall]: size === AvatarGroupSize.xs,
      [classesMap.small]: size === AvatarGroupSize.sm,
      [classesMap.medium]: size === AvatarGroupSize.md,
    })

    React.useEffect(() => {
      if (coloring === AvatarGroupColoring.none) {
        return
      }
      setPalette(getPalette?.(coloring) || recreate())
    }, [getPalette, coloring, recreate])

    return (
      <AvatarGroupContextProvider
        size={size}
        kind={kind}
        withBorder={withBorder}
        withShadow={withShadow}
      >
        <div ref={ref} {...rest} className={rootClassName}>
          {visibleItems.map((props, key) => (
            <Avatar {...props} key={key} />
          ))}
          {(hiddenItems.length > 0 || showExtra) && (
            <Extra
              showExtra={showExtra}
              classes={classesMap}
              gap={gap}
              kind={kind}
              max={max}
              size={size}
              visibleItems={visibleItems}
              hiddenItems={hiddenItems}
              avatarProps={{
                style: getChildrenInlineStyleByIndex(items.length + 1, {
                  size,
                  gap,
                  isVisible: true,
                }),
                size,
                classes: {
                  root: classesMap.item,
                },
                kind,
              }}
            >
              {hiddenItems.length > 0 ? `+${hiddenItems.length}` : ' '}
            </Extra>
          )}
        </div>
      </AvatarGroupContextProvider>
    )
  }
)
