import * as React from 'react'
import {
  Pagination,
  PaginationAppearance,
  createUseStyles,
  clsx,
  PaginationOverflowButtonProps,
  DropdownMenu,
  DropdownMenuItem,
  Button,
} from '@v-uik/base'

const FIRST_PAGE = 1
const TOTAL_PAGE_COUNT = 50
const BOUNDARY_PAGE_COUNT = 1
const NEAR_PAGE_COUNT = 1

const useStyles = createUseStyles(() => ({
  itemOverflow: {
    cursor: 'pointer',
  },
  list: {
    '& ul': {
      width: 80,
      maxHeight: 218,
      overflowY: 'scroll',
      overflowX: 'hidden',
    },
  },
  button: {
    minWidth: 40,
    padding: 7,
  },
}))

type OverflowItemProps = PaginationOverflowButtonProps & {
  currentPage: number
  onPageChange: (pageNumber: number) => void
}

const getOverflowItems = (from: number, to: number): number[] =>
  Array.from({ length: to - from }).map((_, i) => from + i + 1)

const OverflowItem: React.FC<OverflowItemProps> = ({
  className,
  appearance,
  onPageChange,
  currentPage,
  children,
}) => {
  const classes = useStyles()

  let overflowItems: ReturnType<typeof getOverflowItems> = []

  const nearPageOffset = NEAR_PAGE_COUNT * 2 + 1
  const boundaryPageOffset = BOUNDARY_PAGE_COUNT + 1

  const isBeginning = currentPage <= nearPageOffset
  const isEnding = currentPage + nearPageOffset > TOTAL_PAGE_COUNT

  if (appearance === PaginationAppearance.overflowEnd) {
    overflowItems = getOverflowItems(
      isBeginning
        ? nearPageOffset + boundaryPageOffset
        : currentPage + NEAR_PAGE_COUNT,
      TOTAL_PAGE_COUNT - BOUNDARY_PAGE_COUNT
    )
  } else if (appearance === PaginationAppearance.overflowStart) {
    overflowItems = getOverflowItems(
      FIRST_PAGE,
      isEnding
        ? TOTAL_PAGE_COUNT - nearPageOffset - boundaryPageOffset
        : currentPage - boundaryPageOffset
    )
  }

  const content = overflowItems?.map((pageNumber, index) => (
    <DropdownMenuItem
      key={index}
      closeMenuOnClick
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </DropdownMenuItem>
  ))

  return (
    <DropdownMenu
      content={content}
      action="click"
      className={classes.list}
      placement="bottom-start"
    >
      <Button
        tabIndex={0}
        kind="ghost"
        color="secondary"
        className={clsx(className, classes.itemOverflow, classes.button)}
      >
        {children}
      </Button>
    </DropdownMenu>
  )
}

export const PaginationDropdown: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(FIRST_PAGE)

  return (
    <Pagination
      currentPage={currentPage}
      totalPageCount={TOTAL_PAGE_COUNT}
      boundaryPageCount={BOUNDARY_PAGE_COUNT}
      nearPageCount={NEAR_PAGE_COUNT}
      components={{
        OverflowButton: (props) => (
          <OverflowItem
            {...props}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        ),
      }}
      onPageChange={setCurrentPage}
    />
  )
}
