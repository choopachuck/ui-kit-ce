'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { ElementSize, ElementSizeType } from '@v-uik/common'
import { useClassList } from '@v-uik/hooks'

import { usePagination } from './hooks/usePagination'
import { Icon } from './assets/Icon'
import {
  AriaAttributes,
  PaginationDividerType,
  PaginationType,
  TablePaginationDirection,
  TablePaginationDirectionType,
  TablePaginationDivider,
  TablePaginationType,
} from './interfaces'
import {
  defaultComponents,
  PaginationComponentsConfig,
} from './paginationComponents'
import { TablePaginationClasses as Classes } from './interfaces/classes'

const DEFAULT_ARIA_ATTRIBUTES: Record<keyof AriaAttributes, string> = {
  prevPageLabel: 'предыдущая страница',
  nextPageLabel: 'следующая страница',
  lastPageLabel: 'последняя страница',
  firstPageLabel: 'первая страница',
  pageSizeLabel: 'размер страницы',
  currentPagePickerLabel: 'выбор страницы',
}

const FIRST_PAGE = 1

const DEFAULT_PAGE_SIZES = [10, 20, 30]

const optionsMapper = (options: number[]) =>
  options.map((el) => ({
    value: String(el),
    label: String(el),
  }))

const useStyles = createUseStyles((theme) => ({
  root: {
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: theme.comp.table.paginationTypographyFontFamily,
    fontSize: theme.comp.table.paginationTypographyFontSize,
    lineHeight: theme.comp.table.paginationTypographyLineHeight,
    letterSpacing: theme.comp.table.paginationTypographyLetterSpacing,
    fontWeight: theme.comp.table.paginationTypographyFontWeight,
    color: theme.comp.table.paginationColorText,
  },

  sm: {
    height: 40,
  },

  md: {
    height: 48,
  },

  lg: {
    height: 56,
  },

  end: {
    '& $pagesRange': {
      marginRight: 16,
    },

    '& $selectSubtitle': {
      marginLeft: 16,
    },
  },

  start: {
    flexDirection: 'row-reverse',

    '& $pagesRange': {
      marginLeft: 16,
    },

    '& $wrapper': {
      flexDirection: 'row-reverse',
    },

    '& $selectItems': {
      flexDirection: 'row-reverse',
    },

    '& $selectSubtitle': {
      marginRight: 32,
    },
  },

  itemsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifySelf: 'flex-end',
  },

  buttonsWrapper: {
    display: 'flex',
  },

  pages: {
    display: 'flex',
    alignItems: 'center',
  },

  pagesRange: {},

  selectWrapper: {
    maxWidth: 91,
  },

  disabledArrow: {
    '& path': {
      fill: '#ababab',
    },
  },

  select: {
    display: 'flex',
    alignItems: 'center',

    '& span': {
      marginLeft: 4,
    },
  },

  selectItems: {
    display: 'flex',
    alignItems: 'center',
  },

  selectTitle: {
    whiteSpace: 'nowrap',
  },

  selectSubtitle: {},

  dividerBottom: {
    borderBottom: `2px solid ${theme.comp.table.paginationColorBorderBottom}`,
  },

  dividerTop: {
    borderTop: `1px solid ${theme.comp.table.paginationColorBorderTop}`,
  },
}))

export interface TablePaginationProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /**
   * Отображает стрелки в конец и в начало. Неактуален, если не указано totalCount
   */
  absoluteArrows?: boolean
  /**
   * Значения aria-label кнопок переключения страниц
   * @default DEFAULT_ARIA_ATTRIBUTES
   * */
  ariaAttributes?: AriaAttributes
  /**
   * CSS классы компонента
   */
  classes?: Classes
  /**
   * Этот сложный объект включает в себя все композиционные компоненты, которые используются внутри пагинации
   *
   * Если вы хотите перезаписать компонент, передайте объект  с соответствующим пространством имен.
   *
   * Если вы хотите только изменить стиль компонента, мы рекомендуем использовать свойство `classes` или токены темы
   */
  components?: PaginationComponentsConfig
  /**
   * Текущая страница
   */
  currentPage: number
  /**
   * Расположение пагинации
   * @default 'end'
   * */
  direction?: TablePaginationDirectionType
  /**
   * Где отображать линию разделителя
   * @default top
   * */
  divider?: PaginationDividerType
  /**
   * Функция для определения подписи к диапазону элементов на странице
   * из общего числа
   * @default (min, max, total) => `${min}–${max} из ${total} элементов`
   * */
  itemRangeText?(min: number, max: number, total: number): string
  /**
   * Текст который выводится перед выпадающим списком количества элементов
   * @default элементов на странице
   * */
  itemsPerPageText?: string
  /**
   * Обработчик изменения страницы
   */
  onChange(value: number): void
  /**
   * Обработчик изменения количества элементов на одной странице
   */
  onPageSizeChange?(value: number): void
  /**
   * Функция для переопределения подписи к диапазону страниц
   * @default (min, max) => `${min} из ${max} страниц`
   * */
  pageRangeText?(min: number, max: number): string
  /**
   * Количество элементов на странице
   */
  pageSize: number
  /**
   * Массив размера страниц
   * @default [10, 20, 30]
   */
  pageSizesArray?: number[]
  /**
   * Функция для переопределения подписи текста номера страницы когда неизвестно количество страниц
   * @default 'Страница ${pageNumber}'
   * */
  pageText?(page: number): string
  /**
   * Тип пагинации
   * @default simple
   * */
  paginationType?: PaginationType
  /**
   * Размер пагинации
   * @default ElementSize.md
   */
  size?: ElementSizeType
  /**
   * Общее количество элементов в таблице
   */
  totalCount?: number
  /**
   * Функция для переопределения подписи к общему кол-ву элементов
   * есть только в продвинутом режиме
   * @default (totalCount) => `из ${totalCount} страниц`
   * */
  totalPagesText?(totalCount: number): string
  /**
   * Проп, сигнализирующий о дальнейшем отсутствии элементов таблицы. Неактуален, если указано totalCount
   */
  hasNext?: boolean
}

export const TablePagination = React.forwardRef(
  (
    {
      absoluteArrows,
      ariaAttributes = DEFAULT_ARIA_ATTRIBUTES,
      classes,
      components,
      currentPage,
      direction = TablePaginationDirection.end,
      divider = TablePaginationDivider.top,
      itemRangeText = (min, max, total) =>
        `${min}–${max} из ${total} элементов`,
      itemsPerPageText = 'элементов на странице',
      onChange,
      onPageSizeChange,
      pageRangeText = (min, max) => `${min} из ${max} страниц`,
      pageSize,
      pageSizesArray = DEFAULT_PAGE_SIZES,
      pageText = (page) => `Страница ${page}`,
      paginationType = TablePaginationType.simple,
      size = ElementSize.md,
      totalCount,
      totalPagesText = (totalCount) => `из ${totalCount} страниц`,
      hasNext = true,
      ...rest
    }: TablePaginationProps,
    ref: React.Ref<HTMLTableElement>
  ) => {
    const classesList = useStyles()

    const classesMap = useClassList<typeof classesList, Classes>(
      classesList,
      classes
    )

    const formattedAttributes = {
      ...DEFAULT_ARIA_ATTRIBUTES,
      ...ariaAttributes,
    }

    // Получаем индекс первой страницы и индекс последней, а так же общее кол-во элементов и рендж страниц
    const { pagesCount, pages } = usePagination({
      totalCount,
      pageSize,
    })

    const itemsPageOptions = React.useMemo(() => {
      return optionsMapper(pageSizesArray)
    }, [pageSizesArray])

    const pagesOptions = React.useMemo(() => {
      return optionsMapper(pages)
    }, [pages])

    const handleNext = () => {
      onChange(currentPage + 1)
    }

    const handlePrevious = () => {
      onChange(currentPage - 1)
    }

    const handlePickFirstPage = () => {
      onChange(FIRST_PAGE)
    }

    const handlePickLastPage = () => {
      onChange(pagesCount)
    }

    const handleChangePage = (value: string) => {
      onChange(Number(value))
    }

    const handleChangePageSize = (value: string) => {
      onPageSizeChange?.(Number(value))
      if (currentPage !== FIRST_PAGE) {
        onChange(FIRST_PAGE)
      }
    }

    const className = clsx(
      classesMap.root,
      classesMap[direction],
      classesMap[size],
      {
        [classesMap.dividerBottom]: divider === TablePaginationDivider.bottom,
        [classesMap.dividerTop]: divider === TablePaginationDivider.top,
      }
    )

    const {
      PageSizer,
      PagePicker,
      FirstPageButton,
      LastPageButton,
      PrevPageButton,
      NextPageButton,
    } = defaultComponents(components)

    return (
      <div {...rest} ref={ref} className={className}>
        <div className={classesMap.itemsWrapper}>
          {paginationType === TablePaginationType.advanced && (
            <div className={classesMap.selectItems}>
              <div className={classesMap.select}>
                <span className={classesMap.selectTitle}>
                  {itemsPerPageText}:
                </span>
                <div className={classesMap.selectWrapper}>
                  <PageSizer
                    classes={{
                      customSelectButton: classesMap.customSelectButton,
                    }}
                    options={itemsPageOptions}
                    value={String(pageSize)}
                    aria-label={formattedAttributes.pageSizeLabel}
                    onChange={handleChangePageSize}
                  />
                </div>
              </div>
              <span className={classesMap.selectSubtitle}>
                {totalCount &&
                  itemRangeText(
                    Math.min(pageSize * (currentPage - 1) + 1, totalCount),
                    Math.min(currentPage * pageSize, totalCount),
                    totalCount
                  )}
              </span>
            </div>
          )}
        </div>

        <div className={classesMap.wrapper}>
          <div className={classesMap.pages}>
            {paginationType === TablePaginationType.advanced &&
              pages?.length > 1 && (
                <div className={classesMap.select}>
                  <div className={classesMap.selectWrapper}>
                    <PagePicker
                      classes={{
                        customSelectButton: classesMap.customSelectButton,
                      }}
                      options={pagesOptions}
                      value={String(currentPage)}
                      aria-label={formattedAttributes.currentPagePickerLabel}
                      onChange={handleChangePage}
                    />
                  </div>
                  <span>{totalPagesText(pagesCount)}</span>
                </div>
              )}

            {paginationType === TablePaginationType.simple && pagesCount > 1 ? (
              <div className={classesMap.pagesRange}>
                {pagesCount && pageRangeText(currentPage, pagesCount)}
              </div>
            ) : null}

            {(!pagesCount || pages.length === 1) && (
              <div className={classesMap.pagesRange}>
                {pageText(currentPage)}
              </div>
            )}
          </div>

          <div className={classesMap.buttonsWrapper}>
            {absoluteArrows && (
              <FirstPageButton
                disabled={currentPage === 1}
                aria-label={formattedAttributes.firstPageLabel}
                classes={{
                  disabled: classesMap.disabled,
                  button: classesMap.button,
                }}
                onClick={handlePickFirstPage}
              >
                <Icon
                  className={clsx(
                    currentPage === 1 && classesMap.disabledArrow
                  )}
                  direction="firstPage"
                />
              </FirstPageButton>
            )}

            <PrevPageButton
              disabled={currentPage === 1}
              aria-label={formattedAttributes.prevPageLabel}
              classes={{
                disabled: classesMap.disabled,
                button: classesMap.button,
              }}
              onClick={handlePrevious}
            >
              <Icon
                className={clsx(currentPage === 1 && classesMap.disabledArrow)}
                direction="prev"
              />
            </PrevPageButton>

            <NextPageButton
              disabled={currentPage === pagesCount || !hasNext}
              aria-label={formattedAttributes.nextPageLabel}
              classes={{
                disabled: classesMap.disabled,
                button: classesMap.button,
              }}
              onClick={handleNext}
            >
              <Icon
                className={clsx(
                  (currentPage === pagesCount || !hasNext) &&
                    classesMap.disabledArrow
                )}
                direction="next"
              />
            </NextPageButton>

            {absoluteArrows && (
              <LastPageButton
                disabled={currentPage === pagesCount}
                aria-label={formattedAttributes.lastPageLabel}
                classes={{
                  disabled: classesMap.disabled,
                  button: classesMap.button,
                }}
                onClick={handlePickLastPage}
              >
                <Icon
                  className={clsx(
                    currentPage === pagesCount && classesMap.disabledArrow
                  )}
                  direction="lastPage"
                />
              </LastPageButton>
            )}
          </div>
        </div>
      </div>
    )
  }
)
