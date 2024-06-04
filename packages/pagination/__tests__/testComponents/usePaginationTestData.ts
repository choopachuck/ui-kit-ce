import { UsePaginationProps } from '../../src'

export const BUTTONS = {
  GET_PROPS: 'get props',
  HANDLE_PREVIOUS_CLICK: 'handlePreviousClick',
  HANDLE_NEXT_CLICK: 'handleNextClick',
  HANDLE_LAST_CLICK: 'handleLastClick',
  HANDLE_FIRST_CLICK: 'handleFirstClick',
  HANDLE_CHANGE_CURRENT_PAGE: 'handleChangeCurrentPage',
}

export const usePaginationTestProps01: UsePaginationProps[] = [
  {
    boundaryPageCount: 0,
    totalPageCount: 10,
    nearPageCount: 1,
  },
  {
    boundaryPageCount: 3,
    totalPageCount: 25,
    nearPageCount: 2,
  },
  {
    boundaryPageCount: 3,
    totalPageCount: 25,
    currentPage: 6,
    nearPageCount: 2,
  },
  {
    boundaryPageCount: 5,
    totalPageCount: 4,
    currentPage: 6,
    nearPageCount: 1,
  },
  {
    boundaryPageCount: 0,
    totalPageCount: 10,
    nearPageCount: 1,
    defaultPage: 3,
  },
  {
    boundaryPageCount: 1,
    totalPageCount: 8,
    nearPageCount: 2,
    defaultPage: 3,
    currentPage: 1,
  },
]

export const usePaginationTestProps02 = [
  {
    pageNumber: 2,
  },
  {
    pageNumber: 25,
  },
  {
    defaultPage: 8,
    pageNumber: 2,
  },
]
