import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import {
  Pagination,
  PaginationPageButtonProps,
  PaginationNavigationButtonProps,
  PAGINATION_OVERFLOW_PAGES,
} from '../src'
import PageButton from './testComponents/PageButton'
import SelectedIndicator from './testComponents/SelectedIndicator'
import NavigationButton from './testComponents/NavigationButton'
import OverflowButton from './testComponents/OverflowButton'

const PageItemMock = ({
  onClick,
  children,
  className,
}: PaginationPageButtonProps) => (
  <button title="page" className={className} onClick={onClick}>
    {children}
  </button>
)
const NavigationPrevMock = ({
  onPageChange,
  children,
  disabled,
}: PaginationNavigationButtonProps) => (
  <button disabled={disabled} title="prev" onClick={() => onPageChange?.()}>
    {children}
  </button>
)
const NavigationNextMock = ({
  onPageChange,
  children,
  disabled,
}: PaginationNavigationButtonProps) => (
  <button disabled={disabled} title="next" onClick={() => onPageChange?.()}>
    {children}
  </button>
)

const NavigationFirstMock = ({
  onPageChange,
  children,
  disabled,
}: PaginationNavigationButtonProps) => (
  <button disabled={disabled} title="first" onClick={() => onPageChange?.()}>
    {children}
  </button>
)
const NavigationLastMock = ({
  onPageChange,
  children,
  disabled,
}: PaginationNavigationButtonProps) => (
  <button disabled={disabled} title="last" onClick={() => onPageChange?.()}>
    {children}
  </button>
)

const itemSelectedClassName = 'selected'

jest.mock('./testComponents/PageButton', () => {
  return jest.fn(() => null)
})

jest.mock('./testComponents/SelectedIndicator', () => {
  return jest.fn(() => null)
})

jest.mock('./testComponents/NavigationButton', () => {
  return jest.fn(() => null)
})

jest.mock('./testComponents/OverflowButton', () => {
  return jest.fn(() => null)
})

it('elements count depends on totalPageCount property', () => {
  const { getAllByTitle, getAllByRole, rerender } = render(
    <Pagination totalPageCount={1} components={{ PageButton: PageItemMock }} />
  )

  expect(getAllByTitle('page').length).toEqual(1)

  rerender(
    <Pagination totalPageCount={2} components={{ PageButton: PageItemMock }} />
  )

  expect(getAllByTitle('page').length).toEqual(2)

  rerender(
    <Pagination totalPageCount={3} components={{ PageButton: PageItemMock }} />
  )

  expect(getAllByTitle('page').length).toEqual(3)

  rerender(<Pagination components={{ PageButton: PageItemMock }} />)

  expect(getAllByTitle('page').length).toEqual(1)

  rerender(
    <Pagination totalPageCount={0} components={{ PageButton: PageItemMock }} />
  )

  expect(getAllByRole('button').length).toEqual(2)
})

it('page change works correctly by click on page number', () => {
  const handlePageChange = jest.fn()
  const { getByText } = render(
    <Pagination
      totalPageCount={5}
      classes={{ itemSelected: itemSelectedClassName }}
      onPageChange={handlePageChange}
    />
  )

  expect(getByText('1')).toHaveClass(itemSelectedClassName)
  fireEvent.click(getByText('2'))
  expect(getByText('2')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(1)
  expect(handlePageChange).toHaveBeenCalledWith(2)

  fireEvent.click(getByText('3'))
  expect(getByText('2')).not.toHaveClass(itemSelectedClassName)
  expect(getByText('3')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(2)
  expect(handlePageChange).toHaveBeenCalledWith(3)
})

it('page change works correctly by click on navigation prev and next', () => {
  const handlePageChange = jest.fn()
  const { getByText, getByTitle } = render(
    <Pagination
      showNavigationFirst
      showNavigationLast
      totalPageCount={3}
      classes={{ itemSelected: itemSelectedClassName }}
      components={{
        LastPageButton: NavigationLastMock,
        FirstPageButton: NavigationFirstMock,
        PreviousPageButton: NavigationPrevMock,
        NextPageButton: NavigationNextMock,
      }}
      onPageChange={handlePageChange}
    />
  )

  const prevNavigationButton = getByTitle('prev')
  const nextNavigationButton = getByTitle('next')
  const firstNavigationButton = getByTitle('first')
  const lastNavigationButton = getByTitle('last')

  expect(prevNavigationButton).toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()
  expect(firstNavigationButton).toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()

  fireEvent.click(nextNavigationButton)

  expect(getByText('2')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(1)
  expect(handlePageChange).toHaveBeenCalledWith(2)

  expect(prevNavigationButton).not.toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()
  expect(firstNavigationButton).not.toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()

  fireEvent.click(nextNavigationButton)

  expect(getByText('3')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(2)
  expect(handlePageChange).toHaveBeenCalledWith(3)

  expect(prevNavigationButton).not.toBeDisabled()
  expect(nextNavigationButton).toBeDisabled()
  expect(firstNavigationButton).not.toBeDisabled()
  expect(lastNavigationButton).toBeDisabled()

  fireEvent.click(prevNavigationButton)

  expect(getByText('2')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(3)
  expect(handlePageChange).toHaveBeenCalledWith(2)

  expect(prevNavigationButton).not.toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()
  expect(firstNavigationButton).not.toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()

  fireEvent.click(prevNavigationButton)

  expect(getByText('1')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(4)
  expect(handlePageChange).toHaveBeenCalledWith(1)

  expect(prevNavigationButton).toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()
  expect(firstNavigationButton).toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()
})

it('page change works correctly by click on navigation first and last', () => {
  const handlePageChange = jest.fn()

  const { getByText, getByTitle } = render(
    <Pagination
      showNavigationFirst
      showNavigationLast
      totalPageCount={3}
      classes={{ itemSelected: itemSelectedClassName }}
      components={{
        LastPageButton: NavigationLastMock,
        FirstPageButton: NavigationFirstMock,
        PreviousPageButton: NavigationPrevMock,
        NextPageButton: NavigationNextMock,
      }}
      onPageChange={handlePageChange}
    />
  )

  const firstNavigationButton = getByTitle('first')
  const lastNavigationButton = getByTitle('last')

  const prevNavigationButton = getByTitle('prev')
  const nextNavigationButton = getByTitle('next')

  expect(firstNavigationButton).toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()
  expect(prevNavigationButton).toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()

  fireEvent.click(lastNavigationButton)

  expect(getByText('3')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(1)
  expect(handlePageChange).toHaveBeenCalledWith(3)

  expect(firstNavigationButton).not.toBeDisabled()
  expect(lastNavigationButton).toBeDisabled()
  expect(prevNavigationButton).not.toBeDisabled()
  expect(nextNavigationButton).toBeDisabled()

  fireEvent.click(firstNavigationButton)

  expect(getByText('1')).toHaveClass(itemSelectedClassName)
  expect(handlePageChange).toBeCalledTimes(2)
  expect(handlePageChange).toHaveBeenCalledWith(1)

  expect(firstNavigationButton).toBeDisabled()
  expect(lastNavigationButton).not.toBeDisabled()
  expect(prevNavigationButton).toBeDisabled()
  expect(nextNavigationButton).not.toBeDisabled()
})

it('default page renders correctly', () => {
  const { getByText } = render(
    <Pagination
      totalPageCount={5}
      defaultPage={3}
      classes={{ itemSelected: itemSelectedClassName }}
    />
  )

  expect(getByText('3')).toHaveClass(itemSelectedClassName)
})

it('near page count renders correctly', () => {
  const { getAllByRole } = render(
    <Pagination
      totalPageCount={10}
      classes={{ itemSelected: itemSelectedClassName }}
      nearPageCount={2}
    />
  )

  let items = getAllByRole('button')
  const nextNavigationButton = items[items.length - 1]

  expect(items[1]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual('7')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[2]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual('7')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[3]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual('7')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[4]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual('7')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[5]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual('7')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[5]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('4')
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[6]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('4')
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[7]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('4')
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[8]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('4')
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[9]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[3].textContent).toEqual('4')
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')
})

it('boundary page count renders correctly', () => {
  const { getAllByRole } = render(
    <Pagination
      totalPageCount={10}
      classes={{ itemSelected: itemSelectedClassName }}
      boundaryPageCount={2}
    />
  )

  let items = getAllByRole('button')
  const nextNavigationButton = items[items.length - 1]

  expect(items[1]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[2]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[3]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[4]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual('3')
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[5]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('4')
  expect(items[5].textContent).toEqual('5')
  expect(items[6].textContent).toEqual('6')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[5]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[6]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[7]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[8]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')

  fireEvent.click(nextNavigationButton)
  items = getAllByRole('button')
  expect(items[9]).toHaveClass(itemSelectedClassName)

  expect(items[1].textContent).toEqual('1')
  expect(items[2].textContent).toEqual('2')
  expect(items[3].textContent).toEqual(PAGINATION_OVERFLOW_PAGES)
  expect(items[4].textContent).toEqual('5')
  expect(items[5].textContent).toEqual('6')
  expect(items[6].textContent).toEqual('7')
  expect(items[7].textContent).toEqual('8')
  expect(items[8].textContent).toEqual('9')
  expect(items[9].textContent).toEqual('10')
})

it('pagination components renders page component correctly', () => {
  render(<Pagination totalPageCount={10} components={{ PageButton }} />)

  expect(PageButton).toBeCalledTimes(6)
  expect(PageButton).toMatchSnapshot()
})

it('pagination components renders navigation first component correctly', () => {
  render(
    <Pagination
      showNavigationFirst
      totalPageCount={10}
      components={{ FirstPageButton: NavigationButton }}
    />
  )

  expect(NavigationButton).toMatchSnapshot()
})

it('pagination components renders navigation last component correctly', () => {
  render(
    <Pagination
      showNavigationLast
      totalPageCount={10}
      components={{ LastPageButton: NavigationButton }}
    />
  )

  expect(NavigationButton).toMatchSnapshot()
})

it('pagination components renders navigation previous component correctly', () => {
  render(
    <Pagination
      totalPageCount={10}
      components={{ PreviousPageButton: NavigationButton }}
    />
  )

  expect(NavigationButton).toMatchSnapshot()
})

it('pagination components renders navigation next component correctly', () => {
  render(
    <Pagination
      totalPageCount={10}
      components={{ NextPageButton: NavigationButton }}
    />
  )

  expect(NavigationButton).toMatchSnapshot()
})

it('pagination components renders divider component correctly', () => {
  render(<Pagination totalPageCount={10} components={{ SelectedIndicator }} />)

  expect(SelectedIndicator).toMatchSnapshot()
})

it('pagination components renders overflow component correctly', () => {
  render(
    <Pagination
      totalPageCount={10}
      currentPage={5}
      components={{ OverflowButton }}
    />
  )

  expect(OverflowButton).toMatchSnapshot()
})
