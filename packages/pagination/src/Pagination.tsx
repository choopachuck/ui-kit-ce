'use client'

/* eslint-disable react/prop-types */ // TODO: косячит eslint при типизации пропсов компонента через дженерики React.forwardRef

import * as React from 'react'
import { clsx } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { isPaginationItemOverflow, usePagination } from './hooks'
import { ElementSize } from '@v-uik/common'
import { PaginationArrowIcon, PaginationArrowLastIcon } from './icons'
import { getComponents } from './components'
import { PaginationProps } from './types'
import { useStyles } from './styles'

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      classes: classesProp,
      totalPageCount = 1,
      nearPageCount = 1,
      boundaryPageCount = 1,
      currentPage: currentPageProp,
      defaultPage,
      size = 'md',
      disabled = false,
      components,
      className,
      showNavigationFirst = false,
      showNavigationLast = false,
      hideNavigationPrevious = false,
      hideNavigationNext = false,
      onPageChange,
      nextButtonProps,
      previousButtonProps,
      lastButtonProps,
      firstButtonProps,
      getPaginationOverflowButtonProps,
      getPaginationPageButtonProps,
      ...rest
    },
    ref
  ) => {
    const classes = useStyles()
    const classesList = useClassList(classes, classesProp)
    const buttonClasses = useButtonReset()
    const classesMap = {
      ...classesList,
      item: clsx(buttonClasses.resetButton, classesList.item),
    }

    const {
      PageButton,
      OverflowButton,
      SelectedIndicator,
      FirstPageButton,
      LastPageButton,
      NextPageButton,
      PreviousPageButton,
    } = getComponents(components)

    const {
      items,
      isEnd,
      isStart,
      setCurrentPage,
      handleFirstClick,
      handleLastClick,
      handleNextClick,
      handlePreviousClick,
    } = usePagination({
      boundaryPageCount,
      currentPage: currentPageProp,
      nearPageCount,
      totalPageCount,
      defaultPage,
      onPageChange,
    })

    const makeHandleButtonClick = (pageNumber: number) => () => {
      setCurrentPage(pageNumber)
    }

    const isSmall = size === ElementSize.sm
    const isMedium = size === ElementSize.md
    const isLarge = size === ElementSize.lg

    const isNavigationPrevOrFirstDisabled =
      disabled || isStart || !totalPageCount
    const isNavigationNextOrLastDisabled = disabled || isEnd || !totalPageCount

    const paginationSelectedIndicatorClassName = clsx(
      classesMap.selectedIndicator,
      {
        [classesMap.selectedIndicatorDisabled]: disabled,
        [classesMap.selectedIndicatorSmall]: isSmall,
        [classesMap.selectedIndicatorMedium]: isMedium,
        [classesMap.selectedIndicatorLarge]: isLarge,
      }
    )

    const itemClassName = clsx(classesMap.item, {
      [classesMap.itemDisabled]: disabled,
      [classesMap.itemSmall]: size === ElementSize.sm,
      [classesMap.itemMedium]: size === ElementSize.md,
      [classesMap.itemLarge]: size === ElementSize.lg,
    })

    return (
      <nav
        ref={ref}
        aria-label="pagination"
        {...rest}
        className={clsx(classesMap.root, className)}
      >
        {showNavigationFirst && (
          <FirstPageButton
            aria-label="Go to first page"
            {...firstButtonProps}
            disabled={
              firstButtonProps?.disabled || isNavigationPrevOrFirstDisabled
            }
            isStart={isStart}
            isEnd={isEnd}
            size={size}
            className={clsx(
              itemClassName,
              classesMap.navigationButton,
              classesMap.navigationButtonFirst,
              firstButtonProps?.className,
              {
                [classesMap.itemDisabled]: isNavigationPrevOrFirstDisabled,
              }
            )}
            onPageChange={handleFirstClick}
          >
            <PaginationArrowLastIcon />
          </FirstPageButton>
        )}
        {!hideNavigationPrevious && (
          <PreviousPageButton
            aria-label="Go to previous page"
            {...previousButtonProps}
            disabled={
              previousButtonProps?.disabled || isNavigationPrevOrFirstDisabled
            }
            isStart={isStart}
            isEnd={isEnd}
            size={size}
            className={clsx(
              itemClassName,
              classesMap.navigationButton,
              classesMap.navigationButtonPrevious,
              previousButtonProps?.className,
              {
                [classesMap.itemDisabled]: isNavigationPrevOrFirstDisabled,
              }
            )}
            onPageChange={handlePreviousClick}
          >
            <PaginationArrowIcon />
          </PreviousPageButton>
        )}
        {Array.from({ length: items?.length }).map((_, i) => {
          const pageNumber = items[i].value
          const isSelected = items[i].isSelected
          const isOverflow = isPaginationItemOverflow(pageNumber)

          const nativeProps =
            (isOverflow
              ? getPaginationOverflowButtonProps?.(items[i])
              : getPaginationPageButtonProps?.(items[i])) || {}

          const baseProps = {
            children: pageNumber,
            disabled: nativeProps?.disabled || disabled,
            size,
            appearance: items[i].appearance,
          }

          if (isPaginationItemOverflow(pageNumber)) {
            return (
              <OverflowButton
                {...nativeProps}
                {...baseProps}
                key={`pagination-overflow-${i}`}
                className={clsx(
                  itemClassName,
                  classesMap.itemOverflow,
                  nativeProps?.className
                )}
              />
            )
          }

          return (
            <PageButton
              aria-label={`Go to page ${pageNumber}`}
              {...nativeProps}
              {...baseProps}
              key={`pagination-page-${i}`}
              isSelected={isSelected}
              className={clsx(
                itemClassName,
                classesMap.item,
                nativeProps?.className,
                {
                  [classesMap.itemSelected]: isSelected,
                }
              )}
              indicator={
                <SelectedIndicator
                  className={paginationSelectedIndicatorClassName}
                />
              }
              onPageChange={makeHandleButtonClick(Number(pageNumber))}
            />
          )
        })}
        {!hideNavigationNext && (
          <NextPageButton
            aria-label="Go to next page"
            {...nextButtonProps}
            isStart={isStart}
            isEnd={isEnd}
            size={size}
            disabled={
              nextButtonProps?.disabled || isNavigationNextOrLastDisabled
            }
            className={clsx(
              itemClassName,
              classesMap.navigationButton,
              classesMap.navigationButtonNext,
              nextButtonProps?.className,
              {
                [classesMap.itemDisabled]: isNavigationNextOrLastDisabled,
              }
            )}
            onPageChange={handleNextClick}
          >
            <PaginationArrowIcon />
          </NextPageButton>
        )}
        {showNavigationLast && (
          <LastPageButton
            aria-label="Go to last page"
            {...lastButtonProps}
            isStart={isStart}
            isEnd={isEnd}
            size={size}
            disabled={
              lastButtonProps?.disabled || isNavigationNextOrLastDisabled
            }
            className={clsx(
              itemClassName,
              classesMap.navigationButton,
              classesMap.navigationButtonLast,
              lastButtonProps?.className,
              {
                [classesMap.itemDisabled]: isNavigationNextOrLastDisabled,
              }
            )}
            onPageChange={handleLastClick}
          >
            <PaginationArrowLastIcon />
          </LastPageButton>
        )}
      </nav>
    )
  }
)
