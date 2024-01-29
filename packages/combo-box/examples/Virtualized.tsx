import * as React from 'react'
import {
  ComboBox,
  ComboboxEvent,
  ListProps,
  ComboboxProps,
  List,
  OptionListProps,
} from '@v-uik/base'
import { Placeholder } from './assets/Placeholders'
import { FixedSizeList, ListChildComponentProps, areEqual } from 'react-window'
import memoize from 'memoize-one'

type Option = {
  value: string
  label: string
}

const generateItems = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    value: String(i),
    label: `Item ${i}`,
  }))
}

const options = generateItems(2000)

const defaultElement = 'div'

const listItemElement = 'div'

const _Row = <
  Option,
  ListElement extends React.ElementType = typeof defaultElement,
  ListItemElement extends React.ElementType = typeof listItemElement
>({
  style,
  index,
  data,
}: ListChildComponentProps<
  OptionListProps<Option, ListElement, ListItemElement>
>) => {
  const {
    loading,
    loadingLabel,
    filteredOptions,
    optionClasses,
    noOptionsText,
    commonOptionItemProps,
    OptionItemComponent,
    ...props
  } = data

  const renderNoOptionsText = () => {
    if (filteredOptions?.length === 0) {
      return (
        <OptionItemComponent
          isInfoOption
          className={optionClasses.noOptionsText}
          commonOptionItemProps={{
            ...commonOptionItemProps,
            style,
            as: listItemElement,
          }}
        >
          {noOptionsText}
        </OptionItemComponent>
      )
    }

    return undefined
  }

  const renderOption = (option: Option) => (
    <OptionItemComponent
      filteredOptions={filteredOptions}
      optionClasses={optionClasses}
      commonOptionItemProps={{
        ...commonOptionItemProps,
        style,
        as: listItemElement,
      }}
      option={option}
      {...props}
    />
  )

  const renderLoadingLabel = () => {
    return (
      <OptionItemComponent
        isInfoOption
        className={optionClasses.optionLoading}
        commonOptionItemProps={{
          ...commonOptionItemProps,
          style,
          as: listItemElement,
        }}
      >
        {loadingLabel}
      </OptionItemComponent>
    )
  }

  if (loading) {
    return renderLoadingLabel()
  }

  return (
    <>
      {renderOption(filteredOptions[index])}
      {renderNoOptionsText()}
    </>
  )
}

const Row = React.memo(_Row, areEqual) as typeof _Row

const createItemData = memoize<
  (p: Record<string, unknown>) => Record<string, unknown>
>((props) => ({ ...props }))

type UseKeyboardListNavigationProps<Option> = {
  active?: Option
  scrollToItem: (index: number) => void
  getOptionValue: (option: Option) => string
  filteredOptions: Option[]
}

const useKeyboardListNavigation = <Option,>({
  active,
  getOptionValue,
  filteredOptions,
  scrollToItem,
}: UseKeyboardListNavigationProps<Option>) => {
  const [scrollIndexRange, setScrollIndexRange] = React.useState<
    [number, number]
  >([0, 0])
  const countInListRef = React.useRef(0)

  React.useEffect(() => {
    if (!scrollIndexRange.length || !active) {
      return
    }

    const activeIndex = filteredOptions.findIndex(
      (el) => getOptionValue(active) === getOptionValue(el)
    )
    if (activeIndex < 0) {
      return
    }

    const count = countInListRef.current
    const [start, end] = scrollIndexRange
    if (activeIndex < start) {
      const newIndex = start - count > 0 ? start - count : 0

      scrollToItem(newIndex)
      setScrollIndexRange([newIndex, end])
    }

    if (activeIndex > end) {
      const newIndex =
        end + count > filteredOptions.length
          ? filteredOptions.length - 1
          : end + count

      scrollToItem(newIndex)
      setScrollIndexRange([start, newIndex])
    }
  }, [active, getOptionValue, scrollToItem])

  return {
    countInListRef,
    setScrollIndexRange,
  }
}

const VirtualizedList = <
  Option,
  ListElement extends React.ElementType = typeof defaultElement,
  ListItemElement extends React.ElementType = typeof listItemElement
>(
  props: OptionListProps<Option, ListElement, ListItemElement>
) => {
  const { listProps, filteredOptions, isOptionSelected, active } = props

  const virtualListRef = React.useRef<FixedSizeList<
    OptionListProps<Option, ListElement, ListItemElement>
  > | null>(null)

  const scrollToItem = React.useCallback((index) => {
    if (!virtualListRef.current) {
      return
    }

    virtualListRef.current.scrollToItem(index)
  }, [])

  const { setScrollIndexRange, countInListRef } = useKeyboardListNavigation({
    active,
    getOptionValue: props.getOptionValue,
    filteredOptions,
    scrollToItem,
  })

  React.useLayoutEffect(() => {
    if (!virtualListRef.current) {
      return
    }

    const index = filteredOptions.findIndex(isOptionSelected)

    if (index < 0) {
      return
    }

    requestAnimationFrame(() => {
      if (!virtualListRef.current) {
        return
      }
      virtualListRef.current.scrollToItem(index, 'start')
    })
  }, [filteredOptions])

  const innerRef = React.useRef(null)

  const itemData = createItemData(props) as OptionListProps<
    Option,
    ListElement,
    ListItemElement
  >

  return (
    <List<ListElement>
      as={defaultElement as ListElement}
      role="list"
      interactive={false}
      {...(listProps as ListProps<ListElement>)}
    >
      <FixedSizeList<OptionListProps<Option, ListElement, ListItemElement>>
        ref={virtualListRef}
        innerRef={innerRef}
        itemData={itemData}
        height={288}
        width="100%"
        itemSize={40}
        overscanCount={20}
        itemCount={filteredOptions.length}
        onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
          setScrollIndexRange([visibleStartIndex, visibleStopIndex])
          countInListRef.current = visibleStopIndex - visibleStartIndex
        }}
      >
        {Row}
      </FixedSizeList>
    </List>
  )
}

export const Virtualized = (): JSX.Element => {
  const [value, setValue] = React.useState<Option | null>()

  const components = { OptionList: VirtualizedList } as ComboboxProps<
    Option | null,
    typeof defaultElement,
    typeof listItemElement
  >['components']

  return (
    <div style={{ width: 288 }}>
      <ComboBox
        canClear
        openOnFocus
        components={components}
        helperText="Helper Text"
        label="Label"
        options={options}
        placeholder={Placeholder.SINGLE}
        value={value}
        onChange={(_v: string, _e: ComboboxEvent, fullValue?: Option) =>
          setValue(fullValue)
        }
      />
    </div>
  )
}
