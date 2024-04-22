import * as React from 'react'
import {
  usePagination,
  isPaginationItemOverflow,
  createUseStyles,
  clsx,
  PAGINATION_OVERFLOW_PAGES,
} from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'inline-flex',
    flexFlow: 'wrap',
  },
  item: {
    height: 30,
    width: 30,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemsContainer: {
    marginLeft: 8,
    marginRight: 8,
  },
  itemSelected: {
    backgroundColor: theme.ref.palette.electricBlue80,
    borderWidth: 1,
    borderRadius: 2,
  },
  navigation: {
    width: 80,
  },
}))

const TOTAL_PAGE_COUNT = 10

export const PaginationUsePagination: React.FC = () => {
  const classes = useStyles()
  const {
    setCurrentPage,
    handleFirstClick,
    handleLastClick,
    handleNextClick,
    handlePreviousClick,
    isEnd,
    isStart,
    items,
  } = usePagination({
    totalPageCount: TOTAL_PAGE_COUNT,
  })

  return (
    <div className={classes.root}>
      <button
        type="button"
        disabled={isStart}
        className={classes.item}
        onClick={() => handleFirstClick()}
      >
        {'|<'}
      </button>
      <button
        type="button"
        className={clsx(classes.item, classes.navigation)}
        disabled={isStart}
        onClick={() => handlePreviousClick()}
      >
        previous
      </button>
      <div className={classes.itemsContainer}>
        {items.map((item, i) =>
          isPaginationItemOverflow(item.value) ? (
            <div key={i} className={classes.item}>
              {item.value}
            </div>
          ) : (
            <button
              key={i}
              className={clsx(classes.item, {
                [classes.itemSelected]: item.isSelected,
              })}
              onClick={() =>
                item.value === PAGINATION_OVERFLOW_PAGES
                  ? undefined
                  : setCurrentPage(item.value)
              }
            >
              {item.value}
            </button>
          )
        )}
      </div>
      <button
        className={clsx(classes.item, classes.navigation)}
        type="button"
        disabled={isEnd}
        onClick={() => handleNextClick()}
      >
        next
      </button>
      <button
        className={classes.item}
        type="button"
        disabled={isEnd}
        onClick={() => handleLastClick()}
      >
        {'>|'}
      </button>
    </div>
  )
}
