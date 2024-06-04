import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { UsePaginationReturnProps } from '../src'
import { UsePaginationComponent } from './testComponents/UsePaginationComponent'
import {
  usePaginationTestProps02,
  usePaginationTestProps01,
  BUTTONS,
} from './testComponents/usePaginationTestData'

it.each(usePaginationTestProps01)(
  'use pagination returns props correctly (%p)',
  (props) => {
    let returnProps = {}
    const handleGetProps = (props: UsePaginationReturnProps) => {
      returnProps = props
    }

    const { getByText } = render(
      <UsePaginationComponent getProps={handleGetProps} {...props} />
    )

    fireEvent.click(getByText(BUTTONS.GET_PROPS))

    expect(returnProps).toMatchSnapshot()
  }
)

it.each(usePaginationTestProps02)(
  'use pagination handleChangeCurrentPage works correctly (%p)',
  (props) => {
    let returnProps = {}
    const handleGetProps = (props: UsePaginationReturnProps) => {
      returnProps = props
    }
    const { getByText } = render(
      <UsePaginationComponent
        getProps={handleGetProps}
        totalPageCount={25}
        handleChangeCurrentPageValue={props.pageNumber}
        defaultPage={props.defaultPage}
      />
    )

    fireEvent.click(getByText(BUTTONS.HANDLE_CHANGE_CURRENT_PAGE))

    fireEvent.click(getByText(BUTTONS.GET_PROPS))

    expect(returnProps).toMatchSnapshot()
  }
)

it('use pagination handleFirstClick works correctly (%p)', () => {
  let returnProps = {}
  const handleGetProps = (props: UsePaginationReturnProps) => {
    returnProps = props
  }
  const { getByText } = render(
    <UsePaginationComponent
      getProps={handleGetProps}
      totalPageCount={25}
      defaultPage={5}
    />
  )

  fireEvent.click(getByText(BUTTONS.HANDLE_FIRST_CLICK))

  fireEvent.click(getByText(BUTTONS.GET_PROPS))

  expect(returnProps).toMatchSnapshot()
})

it('use pagination handleLastClick works correctly (%p)', () => {
  let returnProps = {}
  const handleGetProps = (props: UsePaginationReturnProps) => {
    returnProps = props
  }
  const { getByText } = render(
    <UsePaginationComponent
      getProps={handleGetProps}
      totalPageCount={25}
      defaultPage={5}
    />
  )

  fireEvent.click(getByText(BUTTONS.HANDLE_LAST_CLICK))

  fireEvent.click(getByText(BUTTONS.GET_PROPS))

  expect(returnProps).toMatchSnapshot()
})

it('use pagination handleNextClick works correctly (%p)', () => {
  let returnProps = {}
  const handleGetProps = (props: UsePaginationReturnProps) => {
    returnProps = props
  }
  const { getByText } = render(
    <UsePaginationComponent
      getProps={handleGetProps}
      totalPageCount={25}
      defaultPage={5}
    />
  )

  fireEvent.click(getByText(BUTTONS.HANDLE_NEXT_CLICK))

  fireEvent.click(getByText(BUTTONS.GET_PROPS))

  expect(returnProps).toMatchSnapshot()
})

it('use pagination handlePreviousClick works correctly (%p)', () => {
  let returnProps = {}
  const handleGetProps = (props: UsePaginationReturnProps) => {
    returnProps = props
  }
  const { getByText } = render(
    <UsePaginationComponent
      getProps={handleGetProps}
      totalPageCount={25}
      defaultPage={5}
    />
  )

  fireEvent.click(getByText(BUTTONS.HANDLE_PREVIOUS_CLICK))

  fireEvent.click(getByText(BUTTONS.GET_PROPS))

  expect(returnProps).toMatchSnapshot()
})
