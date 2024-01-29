import * as React from 'react'
import { ModifierArguments, Offsets, detectOverflow } from '@popperjs/core'
import { PopupProps } from '../index'
import { usePreviousPropCompare } from '@v-uik/hooks'
import { defineListSizeParameters } from '../utils'

interface IUseModifiersProps<T> {
  modifiers?: PopupProps['modifiers']
  limitByWidth?: boolean
  indexOfSelected?: number
  activeOption?: T
  openUnderAnchor?: boolean
  enableFlip?: boolean
  isOpened?: boolean
  rows?: number
  maxLength: number
}

interface CalculatePositionsModifierData {
  maxHeight?: number
}

const defaultViewportPadding = 16

export const useSelectModifiers = <T>({
  modifiers,
  limitByWidth,
  indexOfSelected = 0,
  activeOption,
  openUnderAnchor,
  enableFlip = false,
  isOpened = true,
  rows,
  maxLength,
}: IUseModifiersProps<T>): PopupProps['modifiers'] => {
  const shouldCalculateScrollByOption = usePreviousPropCompare(
    activeOption,
    (x, prev) => x === prev
  )
  const shouldCalculateScrollByOpened = usePreviousPropCompare(
    isOpened,
    (x, prev) => x !== prev
  )

  // условие расчета для элементов, находящихся за видимым контейнером, в случае прибитых строк
  const rowsCondition = rows && rows < indexOfSelected + 2

  return React.useMemo<PopupProps['modifiers']>(
    () => [
      ...(modifiers ?? []),
      {
        name: 'flip',
        enabled: enableFlip,
      },
      {
        name: 'preventOverflow',
        enabled: false,
      },
      {
        name: 'calculatePosition',
        enabled: true,
        phase: 'main',
        requiresIfExists: ['offset', 'preventOverflow'],
        fn: ({
          state,
          name,
          options,
        }: ModifierArguments<Record<string, unknown>>) => {
          const overflow = detectOverflow(state, options)
          const popperHeight = state.rects.popper.height
          const maxAvailableSize =
            window.innerHeight - 2 * defaultViewportPadding
          const isViewportEnough = maxAvailableSize >= popperHeight
          const popperOffsets = state.modifiersData.popperOffsets as Offsets

          if (isViewportEnough) {
            const { optionHeight, listBorder, listPadding } =
              defineListSizeParameters(state)

            if (!openUnderAnchor) {
              const availableOffset =
                Math.abs(overflow.top) - defaultViewportPadding

              // расчет позиции по-умолчанию, для начальных видимых элементов контейнера, без возможности скролла вверх
              let requiredShift =
                (indexOfSelected + 1) * optionHeight + listPadding + listBorder
              if (rowsCondition) {
                if (!rows) {
                  throw new Error('Rows must be defined!')
                }

                // необходимое значение выбранного пункта, чтобы сверху/под ним распологалось одинаковое количество элементов
                const halfRows = Math.round(rows / 2)

                if (indexOfSelected + 1 + halfRows > maxLength) {
                  // расчет позиции для последних видимых элементов контейнера, без возможности скролла вниз
                  requiredShift =
                    (rows - (maxLength - indexOfSelected - 1)) * optionHeight -
                    listPadding -
                    listBorder
                } else {
                  // расчет позиции для центральных элементов списка, со скроллом вверх/вниз
                  requiredShift = halfRows * optionHeight
                }
              }

              if (availableOffset > requiredShift) {
                const bottomOverflow =
                  overflow.bottom - requiredShift + defaultViewportPadding

                popperOffsets.y =
                  defaultViewportPadding +
                  (availableOffset - requiredShift) -
                  (bottomOverflow > 0 ? bottomOverflow : 0)
              } else {
                popperOffsets.y = defaultViewportPadding
              }
            }
          } else {
            state.modifiersData[name] = {
              maxHeight: maxAvailableSize,
            }

            popperOffsets.y = defaultViewportPadding
          }
        },
      },
      {
        name: 'minWidth',
        enabled: true,
        phase: 'beforeWrite' as const,
        requires: ['computeStyles'],
        fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`
        },
        effect: ({ state }: ModifierArguments<Record<string, unknown>>) => {
          state.elements.popper.style.minWidth = `${
            (state.elements.reference as HTMLElement).offsetWidth
          }px`
        },
      },
      ...(limitByWidth
        ? [
            {
              name: 'limitByWidth',
              enabled: true,
              phase: 'beforeWrite' as const,
              requires: ['computeStyles'],
              fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
                state.styles.popper.width = `${state.rects.reference.width}px`
              },
              effect: ({
                state,
              }: ModifierArguments<Record<string, unknown>>) => {
                state.elements.popper.style.width = `${
                  (state.elements.reference as HTMLElement).offsetWidth
                }px`
              },
            },
          ]
        : [
            {
              name: 'maxWidth',
              enabled: true,
              phase: 'main' as const,
              requiresIfExists: ['offset', 'flip'],
              fn: ({
                state,
                name,
                options,
              }: ModifierArguments<Record<string, unknown>>) => {
                const overflow = detectOverflow(state, options)
                const [basePlacement] = state.placement.split('-')
                const widthProp = basePlacement === 'left' ? 'left' : 'right'
                state.modifiersData[name] =
                  state.rects.popper.width -
                  overflow[widthProp] -
                  2 * defaultViewportPadding
              },
            },
            {
              name: 'applyMaxWidth',
              enabled: true,
              phase: 'beforeWrite' as const,
              requires: ['maxWidth'],
              fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
                state.styles.popper.maxWidth = `${
                  state.modifiersData.maxWidth as number
                }px`
              },
            },
          ]),
      {
        name: 'listStyles',
        enabled: true,
        phase: 'beforeWrite',
        requires: ['computeStyles', 'calculatePosition'],
        fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
          const { maxHeight } = state.modifiersData
            .calculatePosition as CalculatePositionsModifierData

          if (maxHeight) {
            ;(
              state.elements.popper.firstElementChild as HTMLElement
            ).style.maxHeight = `${maxHeight}px`
          }
        },
      },
      {
        name: 'calculateScrollPosition',
        enabled: true,
        phase: 'afterWrite',
        fn: ({ state }: ModifierArguments<Record<string, unknown>>) => {
          const {
            listElement,
            listPadding,
            listBorder,
            optionHeight,
            referenceBounds,
          } = defineListSizeParameters(state)

          const isScrollable =
            listElement.clientHeight !== listElement.scrollHeight

          if (
            isScrollable &&
            shouldCalculateScrollByOption &&
            shouldCalculateScrollByOpened
          ) {
            let referenceTopOffset = referenceBounds.top
            if (rowsCondition) {
              if (!rows) {
                throw new Error('Rows must be defined!')
              }

              // необходимое значение выбранного пункта, чтобы сверху/под ним распологалось одинаковое количество элементов
              const halfRows = Math.round(rows / 2)

              // отсечка скролла до центрального элемента в списке
              referenceTopOffset =
                halfRows * optionHeight - listBorder - listPadding
            }

            const selectedScrollToTopOffset = indexOfSelected * optionHeight

            // расчеты, если список находится слишком высоко/низко
            let scrollCorrection = 0
            if (defaultViewportPadding > referenceTopOffset) {
              scrollCorrection =
                referenceTopOffset -
                defaultViewportPadding -
                listPadding -
                listBorder
            } else {
              const referenceBottomOffset =
                window.innerHeight - referenceBounds.bottom

              if (defaultViewportPadding > referenceBottomOffset) {
                scrollCorrection =
                  defaultViewportPadding -
                  referenceBottomOffset +
                  listPadding +
                  listBorder
              }
            }

            const scrollOffset =
              selectedScrollToTopOffset - referenceTopOffset + scrollCorrection

            listElement.scrollTo(0, scrollOffset)
          }
        },
      },
    ],
    [
      modifiers,
      limitByWidth,
      indexOfSelected,
      openUnderAnchor,
      shouldCalculateScrollByOption,
      enableFlip,
      shouldCalculateScrollByOpened,
      rows,
      maxLength,
      rowsCondition,
    ]
  )
}
