import * as React from 'react'
import { TableHeadCellContentProps } from '../TableHeadCellContent'

export const TableHeadCellContent = ({
  size,
  children,
  column,
  onChange,
  ...rest
}: TableHeadCellContentProps): JSX.Element => {
  const { sortable, dataIndex, key, renderHeaderCellContent, title } = column
  if (renderHeaderCellContent) {
    return renderHeaderCellContent({
      key,
      dataIndex,
      title,
      originClassName: '',
    }) as JSX.Element
  }

  return (
    <div
      data-size={size}
      data-sortable={sortable}
      data-on-change={String(onChange)}
      data-data-index={dataIndex}
      {...rest}
    >
      {children}
    </div>
  )
}
