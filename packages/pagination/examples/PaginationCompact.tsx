import * as React from 'react'
import { createUseStyles, clsx, usePagination, Text, Button } from '@v-uik/base'

const TOTAL_PAGE_COUNT = 10

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'inline-flex',
  },
  navigationButtonPrevious: {
    '& svg': {
      transform: 'rotate(-180deg)',
    },
  },
  navigationButton: {
    width: 126,
  },
  item: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'inline-flex',
    alignItems: 'center',
  },
  content: {
    minWidth: 45,
    justifyContent: 'center',
  },
  contentSecondary: {
    color: theme.sys.color.onBackgroundMedium,
  },
  navigationText: {
    display: 'inline-block',
  },
  navigationTextPrevious: {
    marginLeft: 8,
  },
  navigationTextNext: {
    marginRight: 8,
  },
  button: {
    minWidth: 40,
    padding: 7,
  },
}))

const ArrowIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 7.49904L9.6 6L16 11.9995L9.6 18L8 16.4999L12.8 11.9995L8 7.49904Z"
        fill="currentColor"
      />
    </svg>
  )
}

const ArrowLastIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.6 6L6 7.49904L10.8 11.9995L6 16.4999L7.6 18L14 11.9995L7.6 6Z"
        fill="currentColor"
      />
      <path d="M18 6H15.75V18H18V6Z" fill="currentColor" />
    </svg>
  )
}

const PaginationCompact01: React.FC = () => {
  const classes = useStyles()
  const { currentPage, handleNextClick, handlePreviousClick, isStart, isEnd } =
    usePagination({
      totalPageCount: TOTAL_PAGE_COUNT,
    })

  return (
    <div className={classes.root}>
      <Button
        kind="ghost"
        color="secondary"
        disabled={isStart}
        className={clsx(
          classes.navigationButtonPrevious,
          classes.navigationButton,
          classes.item
        )}
        onClick={() => handlePreviousClick()}
      >
        <ArrowIcon />
        <span
          className={clsx(
            classes.navigationText,
            classes.navigationTextPrevious
          )}
        >
          Previous
        </span>
      </Button>
      <div className={clsx(classes.item, classes.content)}>
        <Text kind="body2">
          {currentPage} / {TOTAL_PAGE_COUNT}
        </Text>
      </div>
      <Button
        kind="ghost"
        color="secondary"
        disabled={isEnd}
        className={clsx(classes.navigationButton, classes.item)}
        onClick={() => handleNextClick()}
      >
        <span
          className={clsx(classes.navigationText, classes.navigationTextNext)}
        >
          Next
        </span>
        <ArrowIcon />
      </Button>
    </div>
  )
}

const PaginationCompact02: React.FC = () => {
  const classes = useStyles()
  const { currentPage, handleNextClick, handlePreviousClick, isStart, isEnd } =
    usePagination({
      totalPageCount: TOTAL_PAGE_COUNT,
    })

  return (
    <div className={classes.root}>
      <Button
        kind="ghost"
        color="secondary"
        disabled={isStart}
        className={clsx(classes.navigationButtonPrevious, classes.button)}
        onClick={() => handlePreviousClick()}
      >
        <ArrowIcon />
      </Button>
      <Button
        kind="ghost"
        color="secondary"
        className={classes.button}
        disabled={isEnd}
        onClick={() => handleNextClick()}
      >
        <ArrowIcon />
      </Button>
      <div
        className={clsx(
          classes.item,
          classes.content,
          classes.contentSecondary
        )}
      >
        <Text kind="body2">Page {currentPage}</Text>
      </div>
    </div>
  )
}

const PaginationCompact03: React.FC = () => {
  const classes = useStyles()
  const {
    currentPage,
    handleNextClick,
    handlePreviousClick,
    handleFirstClick,
    handleLastClick,
    isStart,
    isEnd,
  } = usePagination({
    totalPageCount: TOTAL_PAGE_COUNT,
  })

  return (
    <div className={classes.root}>
      <Button
        kind="ghost"
        color="secondary"
        disabled={isStart}
        className={clsx(classes.navigationButtonPrevious, classes.button)}
        onClick={() => handleFirstClick()}
      >
        <ArrowLastIcon />
      </Button>
      <Button
        kind="ghost"
        color="secondary"
        disabled={isStart}
        className={clsx(classes.navigationButtonPrevious, classes.button)}
        onClick={() => handlePreviousClick()}
      >
        <ArrowIcon />
      </Button>
      <Button
        className={classes.button}
        kind="ghost"
        color="secondary"
        disabled={isEnd}
        onClick={() => handleNextClick()}
      >
        <ArrowIcon />
      </Button>
      <Button
        className={classes.button}
        kind="ghost"
        color="secondary"
        disabled={isEnd}
        onClick={() => handleLastClick()}
      >
        <ArrowLastIcon />
      </Button>
      <div
        className={clsx(
          classes.item,
          classes.content,
          classes.contentSecondary
        )}
      >
        <Text kind="body2">
          {currentPage} of {TOTAL_PAGE_COUNT} pages
        </Text>
      </div>
    </div>
  )
}

export const PaginationCompact: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gridRowGap: 16 }}>
      <PaginationCompact01 />
      <PaginationCompact02 />
      <PaginationCompact03 />
    </div>
  )
}
