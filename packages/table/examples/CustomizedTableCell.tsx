import * as React from 'react'
import {
  ColumnProps,
  RecordDataSource,
  Table,
  Text,
  Tag,
  Link,
  Button,
} from '@v-uik/base'
import { IconSettings } from './assets/IconSettings'

type DataSource = RecordDataSource<{
  name: string
  role: string
  email: string
}>

export const CustomizedTableCell = (): JSX.Element => {
  const dataSource: DataSource[] = [
    { key: 1, name: 'Vasya', role: 'developer', email: 'vasya@sbertech.ru' },
    { key: 2, name: 'Slava', role: 'developer', email: 'slava@sbertech.ru' },
    { key: 3, name: 'Anton', role: 'manager', email: 'anton@sbertech.ru' },
    { key: 4, name: 'Artem', role: 'designer', email: 'artem@sbertech.ru' },
    { key: 5, name: 'Fillip', role: 'designer', email: 'fil@sbertech.ru' },
  ]

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      renderCellContent: ({ cell, originClassName }) => (
        <Text className={originClassName} kind="button">
          {cell as string}
        </Text>
      ),
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Почта',
      renderCellContent: ({ cell, originClassName }) => {
        const email = cell as string

        return (
          <div className={originClassName}>
            <Link href={`mailto:${email}`} aria-label="Почта">
              {email}
            </Link>
          </div>
        )
      },
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
      renderCellContent: ({ cell }) => {
        const role = cell as string
        const colorByRole: Record<string, 'green' | 'gray' | 'yellow'> = {
          developer: 'green',
          manager: 'gray',
          designer: 'yellow',
        }

        return (
          <Tag
            size="sm"
            kind="color"
            color={colorByRole[role]}
            aria-label="Роль"
          >
            {role}
          </Tag>
        )
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      setCellProps: () => ({
        style: { textAlign: 'right', paddingRight: 2 },
      }),
      renderCellContent: () => (
        <Button
          kind="ghost"
          color="secondary"
          aria-label="Действие"
          style={{ minWidth: 40, padding: 7 }}
        >
          <IconSettings />
        </Button>
      ),
    },
  ]

  return (
    <Table
      size="sm"
      style={{ paddingBottom: 2 }}
      dataSource={dataSource}
      columns={columns}
    />
  )
}
