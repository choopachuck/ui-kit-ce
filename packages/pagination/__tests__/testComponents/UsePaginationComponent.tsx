import * as React from 'react'
import {
  UsePaginationProps,
  UsePaginationReturnProps,
  usePagination,
} from '../../src'
import { BUTTONS } from './usePaginationTestData'

type UsePaginationComponentProps = UsePaginationProps & {
  getProps?: (props: UsePaginationReturnProps) => void
  handleChangeCurrentPageValue?: number
}

export const UsePaginationComponent: React.FC<UsePaginationComponentProps> = ({
  getProps,
  handleChangeCurrentPageValue,
  ...usePaginationProps
}) => {
  const {
    currentPage,
    setCurrentPage,
    handleFirstClick,
    handleLastClick,
    handleNextClick,
    handlePreviousClick,
    isEnd,
    isStart,
    items,
    ...rest
  } = usePagination(usePaginationProps)

  return (
    <div>
      <button onClick={() => handlePreviousClick()}>
        {BUTTONS.HANDLE_PREVIOUS_CLICK}
      </button>
      <button onClick={() => handleNextClick()}>
        {BUTTONS.HANDLE_NEXT_CLICK}
      </button>
      <button onClick={() => handleLastClick()}>
        {BUTTONS.HANDLE_LAST_CLICK}
      </button>
      <button onClick={() => handleFirstClick()}>
        {BUTTONS.HANDLE_FIRST_CLICK}
      </button>
      <button
        onClick={() => setCurrentPage(handleChangeCurrentPageValue as number)}
      >
        {BUTTONS.HANDLE_CHANGE_CURRENT_PAGE}
      </button>
      <button
        onClick={() => {
          getProps?.({
            currentPage,
            setCurrentPage,
            handleFirstClick,
            handleLastClick,
            handleNextClick,
            handlePreviousClick,
            isEnd,
            isStart,
            items,
            ...rest,
          })
        }}
      >
        {BUTTONS.GET_PROPS}
      </button>
    </div>
  )
}
