'use client'

import * as React from 'react'
import { createUseStyles } from '@v-uik/theme'

const useStyles = createUseStyles({
  cell: {
    height: '200px',
    textAlign: 'center',
  },
})

export interface EmptyTableProps {
  /**
   * Длина, на которую необходимо растянуть ячейку, чтобы растянуть ее
   * на всю ширину таблицы.
   */
  columnsLength: number
  /**
   * Отображаемый контент.
   */
  children?: React.ReactNode
}

export const EmptyTable = ({
  columnsLength,
  children,
}: EmptyTableProps): JSX.Element => {
  const classList = useStyles()

  const slot = children ?? 'Нет данных'

  return (
    <tr>
      <td className={classList.cell} colSpan={columnsLength}>
        {slot}
      </td>
    </tr>
  )
}
