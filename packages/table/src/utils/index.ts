import { getPathValue } from '@v-uik/utils'
import {
  CustomizeComponent,
  TableComponents,
  ColumnProps,
  HeaderColumnProps,
  RecordDataSource,
  TableProps,
} from '../interfaces'
import * as React from 'react'

export const getComponent = <DataSource>(
  components: TableComponents<DataSource> | undefined,
  path: string[],
  defaultComponent: CustomizeComponent
): CustomizeComponent =>
  (components &&
    getPathValue<CustomizeComponent, TableComponents<DataSource>>(
      components,
      path
    )) ||
  defaultComponent

export const parseHeaderRows = <DataSource>(
  rootColumns: ColumnProps<DataSource>[]
): HeaderColumnProps<DataSource>[][] => {
  const rows: HeaderColumnProps<DataSource>[][] = []

  const fillRowCells = (
    columns: ColumnProps<DataSource>[],
    colIndex: number,
    rowIndex: number
  ): number[] => {
    rows[rowIndex] = rows[rowIndex] || []
    let currentColIndex = colIndex

    const colSpans: number[] = columns.map((column) => {
      const headerColumn: HeaderColumnProps<DataSource> = {
        column,
      }
      let colSpan = 1
      const subColumns = column.children

      if (subColumns && subColumns.length) {
        colSpan = fillRowCells(
          subColumns,
          currentColIndex,
          rowIndex + 1
        ).reduce((total, count) => total + count, 0)
      }

      headerColumn.colSpan = colSpan
      rows[rowIndex].push(headerColumn)
      currentColIndex += colSpan

      return colSpan
    })

    return colSpans
  }

  fillRowCells(rootColumns, 0, 0)

  let rowsToSkip = 0
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    rows[rowIndex].forEach((headerColumn, colIndex) => {
      const hasSubColumns =
        headerColumn.column.children && headerColumn.column.children.length
      if (!hasSubColumns) {
        headerColumn.rowSpan = rows.length - rowIndex
      }

      const isLastInRow = colIndex === rows[rowIndex].length - 1
      if (isLastInRow) {
        if (!rowsToSkip) {
          headerColumn.isLastColumn = true
        }

        if (headerColumn.rowSpan) {
          rowsToSkip = headerColumn.rowSpan
        }
      }
    })

    if (rowsToSkip) {
      rowsToSkip--
    }
  }

  return rows
}

/**
 * Возврат ключа или индекса в качестве ключа
 * @param index
 * @param key
 */
const getKey = (index: number, key?: React.Key): React.Key => {
  if (key === 0) {
    return key
  }

  return key || index
}

/**
 * Функция, которая возвращает rowKey с учетом переданных DataSource и rowKey
 * @param record
 * @param rowKey
 * @param index
 */
export const getRowKey = <DataSource = unknown>(
  record: RecordDataSource<DataSource>,
  rowKey: TableProps<DataSource>['rowKey'],
  index: number
): React.Key => {
  if (rowKey) {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }

    const key = (record as Record<string, unknown>)[rowKey] as React.Key

    return getKey(index, key)
  }

  return getKey(index, record.key)
}

/**
 * Функция для удаления выражения `calc` у переданного значения.
 */
const trimTheCalc = (value: string) => value.replace(/calc|\(|\)/gi, '')

/**
 * Функция для определения наличия выражения `calc` у переданного значения.
 */
const isTheCalc = (value?: string | number) =>
  typeof value === 'string' && value.includes('calc')

/**
 * Функция для определения наличия процента у переданной ширины
 */
const isPercentageWidth = (value?: string | number) =>
  typeof value === 'string' && value[value.length - 1] === '%'

/**
 * Функция, конвертирующая ширину в пикселях в формате строки в число
 */
const fromStringToNumber = (value?: string | number) =>
  typeof value === 'string' &&
  `${value[value.length - 2]}${value[value.length - 1]}` === 'px'
    ? parseFloat(value)
    : value

/**
 * Функция сложения двух значений ширины в пикселях или в процентах.
 *
 * @param a - левый операнд со значением ширины в процентах, в пикселях или в виде выражения `calc`
 * @param b - правый операнд со значением ширины в процентах, в пикселях или в виде выражения `calc`
 */
export const sumWidth = <DataSource = unknown>(
  a: ColumnProps<DataSource>['width'],
  b: ColumnProps<DataSource>['width']
): string | number => {
  const _a = fromStringToNumber(a)
  const _b = fromStringToNumber(b)

  const aIsNumber = typeof _a === 'number'
  const bIsNumber = typeof _b === 'number'
  const aHasCalcPercentage = isTheCalc(_a)
  const bHasCalcPercentage = isTheCalc(_b)

  const aHasPercentage = !aHasCalcPercentage && isPercentageWidth(_a)
  const bHasPercentage = !bHasCalcPercentage && isPercentageWidth(_b)

  const aParsedCalcPercentage = aHasCalcPercentage
    ? trimTheCalc(_a as string)
    : undefined
  const bParsedCalcPercentage = bHasCalcPercentage
    ? trimTheCalc(_b as string)
    : undefined

  // Сложение значений вида 10 + 10
  if (aIsNumber && bIsNumber) {
    return (_a as number) + (_b as number)
  }

  // Сложение значений вида calc(10px + 20%) + calc(10px + 20%)
  if (aParsedCalcPercentage && bParsedCalcPercentage) {
    return `calc(${aParsedCalcPercentage} + ${bParsedCalcPercentage})`
  }

  // Сложение значений вида calc(10px + 20%) + (10 или 10% или 10px)
  if (aParsedCalcPercentage && !bHasCalcPercentage) {
    return `calc(${aParsedCalcPercentage} + ${
      bIsNumber ? `${_b as number}px` : (_b as string)
    })`
  }

  // Сложение значений вида (10 или 10% или 10px) + calc(10px + 20%)
  if (bParsedCalcPercentage && !aHasCalcPercentage) {
    return `calc(${bParsedCalcPercentage} + ${
      aIsNumber ? `${_a as number}px` : (_a as string)
    })`
  }

  // Сложение значений вида 10% + (10 или 10px) или (10 или 10px) + 10%
  if (
    (aHasPercentage && !bHasPercentage) ||
    (bHasPercentage && !aHasPercentage)
  ) {
    return `calc(${_a ?? 0}${!aHasPercentage ? 'px' : ''} + ${_b ?? 0}${
      !bHasPercentage ? 'px' : ''
    })`
  }

  // Сложение значений вида 10% + 10%
  if (aHasPercentage && bHasPercentage) {
    return `${parseFloat(_a as string) + parseFloat(_b as string)}%`
  }

  return NaN
}
