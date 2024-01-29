import { getPathValue } from './getPathValue'

describe('getPathValue', () => {
  const pathValuesCases = {
    table: {
      someData: 1,
    },
    head: {
      cell: {
        cellData: 'it is cell object',
      },
      row: {
        rowData: 'it is row object',
      },
    },
    body: {
      bodyRow: {
        bodyCell: {
          bodyCellData: 'it is cell in body object',
        },
      },
    },
  }

  const cases = [
    {
      path: ['table'],
      expected: {
        someData: 1,
      },
    },
    {
      path: 'table',
      expected: {
        someData: 1,
      },
    },
    {
      path: ['head', 'cell'],
      expected: {
        cellData: 'it is cell object',
      },
    },
    {
      path: ['body', 'bodyRow', 'bodyCell', 'bodyCellData'],
      expected: 'it is cell in body object',
    },
    {
      path: [],
      expected: pathValuesCases,
    },
    {
      path: ['noExisting'],
      expected: undefined,
    },
    {
      path: 'somePath',
      expected: undefined,
    },
  ]

  cases.forEach(({ path, expected }) => {
    it(`Найденный объект`, () => {
      expect(getPathValue(pathValuesCases, path)).toEqual(expected)
    })
  })
})
