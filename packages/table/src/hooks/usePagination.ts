import * as React from 'react'

type ReturnedType = {
  pagesCount: number
  pages: number[]
}

type Props = {
  totalCount?: number
  pageSize: number
}

const range = (start: number, end: number): number[] => {
  const arr: number[] = []
  const length = end - start + 1

  for (let i = 0; i < length; i++) {
    arr.push(i + 1)
  }

  return arr
}

export const usePagination = (props: Props): ReturnedType => {
  const { pageSize, totalCount } = props

  return React.useMemo(() => {
    const pagesCount = totalCount ? Math.ceil(totalCount / pageSize) : 0

    const pages = range(1, pagesCount)

    return {
      pagesCount,
      pages,
    }
  }, [totalCount, pageSize])
}
