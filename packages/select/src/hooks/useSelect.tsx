import { Option } from '../interfaces'
import React from 'react'
import { scrollElement } from '@v-uik/list'

type Props<T extends React.ElementType> = {
  groupBy?(option: Option<T>): string
  options: Option<T>[]
  multiple?: boolean
  value?: string | string[]
}

type GroupType<T extends React.ElementType> = {
  key: number
  index: number
  group: string
  options: Option<T>[]
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSelect = <T extends React.ElementType>({
  groupBy,
  options,
  multiple,
  value,
}: Props<T>) => {
  const [hasGrouping, setHasGrouping] = React.useState(false)

  const indexOfSelected = React.useRef<number>()
  const listRef = React.useRef<HTMLElement | null>(null)

  /* -------------------------------------------------------------------- */
  /* ----------------------Поиск выбранной опции------------------------- */
  /* -------------------------------------------------------------------- */
  const selectedOption = React.useMemo(() => {
    if (multiple) {
      return options.filter((option) => value?.includes(option.value))
    }

    indexOfSelected.current = undefined

    return options.find((option, index) => {
      if ((!value && !option.value) || option.value === value) {
        indexOfSelected.current = index

        return option
      }
    })
  }, [options, value, multiple])

  const [active, setActive] = React.useState(
    multiple ? selectedOption?.[0] : selectedOption
  )

  const groupedOptions = React.useMemo((): GroupType<T>[] | undefined => {
    if (groupBy) {
      setHasGrouping(true)

      return options.reduce(
        (acc: GroupType<T>[], option: Option<T>, index: number) => {
          const group = groupBy(option)

          if (acc.length > 0 && acc[acc.length - 1].group === group) {
            acc[acc.length - 1].options.push(option)
          } else {
            acc.push({
              key: index,
              index,
              group,
              options: [option],
            })
          }

          return acc
        },
        []
      )
    }
  }, [options, groupBy])

  React.useEffect(() => {
    if (options) {
      setActive(options[0])
    }
  }, [options])

  /* -------------------------------------------------------------------- */
  /* --------------------Поиск следующей доступной опции----------------- */
  /* -------------------------------------------------------------------- */
  const findEnabledOptionIndex = (currentIndex: number, reverse?: boolean) => {
    let index = currentIndex + (reverse ? -1 : 1)
    while (options[index]?.disabled) {
      reverse ? index-- : index++
    }
    if (reverse) {
      return index >= 0 ? index : currentIndex
    }

    return index < options.length ? index : currentIndex
  }

  /* -------------------------------------------------------------------- */
  /* --------------------Скролл к активной опции------------------------- */
  /* -------------------------------------------------------------------- */
  const scrollListToOption = (element: Option<T>) => {
    const nextIndex = options.indexOf(element)

    const list = listRef.current
    if (list && list.scrollHeight > list.clientHeight) {
      const nextActiveOption = list.getElementsByTagName('li')[nextIndex]
      const listPadding = parseFloat(
        window.getComputedStyle(list).getPropertyValue('padding-top') || '0'
      )

      scrollElement(listRef.current, nextActiveOption, listPadding, hasGrouping)
    }
  }

  /* -------------------------------------------------------------------- */
  /* --------------------Изменение значений в мульти--------------------- */
  /* -------------------------------------------------------------------- */
  const handleChangeValues = (option: Option<T>) => {
    if (Array.isArray(value)) {
      const index = value.indexOf(option.value)
      if (index !== -1) {
        value?.splice(index, 1)

        return [...value]
      } else {
        return [...value, option.value]
      }
    }
  }

  /* -------------------------------------------------------------------- */
  /* --------------------Изменение активного с клавы--------------------- */
  /* -------------------------------------------------------------------- */
  const handleChangeActive = (option: Option<T>) => {
    setActive(option)
    scrollListToOption(option)
  }

  return {
    groupedOptions,
    findEnabledOptionIndex,
    selectedOption,
    indexOfSelected,
    listRef,
    handleChangeValues,
    active,
    setActive,
    handleChangeActive,
  }
}
