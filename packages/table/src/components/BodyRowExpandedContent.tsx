import * as React from 'react'
import { UseColumnsResult } from '../hooks/useColumns'
import { ReservedDataSourceProps } from '../interfaces'

export type BodyRowExpandedContentProps<DataSource> = Pick<
  Pick<
    Required<UseColumnsResult<DataSource>>,
    'expandableColumn'
  >['expandableColumn'],
  'renderExpandableContent'
> & {
  row: DataSource
  className: string
  rowIndex: number
  columnsLength: number
  isRowExpanded?: boolean
}

const _BodyRowExpandedContent = <
  DataSource extends ReservedDataSourceProps<DataSource>
>({
  row,
  className,
  rowIndex,
  columnsLength,
  renderExpandableContent,
  isRowExpanded,
}: BodyRowExpandedContentProps<DataSource>): React.ReactElement | null =>
  isRowExpanded && renderExpandableContent ? (
    <tr>
      <td colSpan={columnsLength} className={className}>
        {renderExpandableContent({
          row,
          rowIndex,
        })}
      </td>
    </tr>
  ) : null

export const BodyRowExpandedContent = React.memo(
  _BodyRowExpandedContent
) as typeof _BodyRowExpandedContent
