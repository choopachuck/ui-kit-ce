import * as React from 'react'
import {
  Table,
  ColumnProps,
  RecordDataSource,
  Drawer,
  DrawerHeader,
  DrawerBody,
  Link,
  Text,
} from '@v-uik/base'

type DataSource = RecordDataSource<{
  name: string
  role: string
  email: string
  phone: string
  city: string
}>

const dataSource: DataSource[] = [
  {
    key: 1,
    name: 'Ivan Ivanov',
    role: 'developer',
    email: 'ivan@mail.com',
    phone: '+79991110000',
    city: 'Moscow',
  },
  {
    key: 2,
    name: 'Petr Petrov',
    role: 'designer',
    email: 'petr@mail.com',
    phone: '+79876543210',
    city: 'Saint Petersburg',
  },
  {
    key: 3,
    name: 'Nikolay Nikolaev',
    role: 'manager',
    email: 'nikolay@mail.com',
    phone: '+79991234567',
    city: 'Moscow',
  },
]

export const ContainerExample = (): JSX.Element => {
  const [tableMounted, setTableMounted] = React.useState(false)

  const tableRef = React.useRef<HTMLDivElement>(null)

  const [currentProfile, setCurrentProfile] = React.useState<DataSource>()

  React.useEffect(() => {
    setTableMounted(true)
  }, [setTableMounted])

  const columns: ColumnProps<DataSource>[] = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role',
    },
    {
      key: 'profile',
      dataIndex: 'profile',
      renderCellContent: ({ originClassName, row }) => {
        return (
          <div className={originClassName}>
            <Link
              tabIndex={0}
              onKeyDown={(event: React.KeyboardEvent<HTMLAnchorElement>) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault()
                  setCurrentProfile(row)
                }
              }}
              onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault()
                setCurrentProfile(row)
              }}
            >
              add. information
            </Link>
          </div>
        )
      },
    },
  ]

  const handleClose = () => setCurrentProfile(undefined)

  const open = !!currentProfile

  return (
    <>
      <Table
        ref={tableRef}
        style={{
          position: 'relative',
          overflowX: 'hidden',
        }}
        columns={columns}
        dataSource={dataSource}
      />

      {tableMounted && (
        <Drawer
          style={{
            position: 'absolute',
          }}
          backdrop={false}
          bodyScrollLock={false}
          container={tableRef.current ?? undefined}
          open={open}
          onClose={handleClose}
        >
          <DrawerHeader
            subtitle={currentProfile?.role}
            dividerProps={{ style: { display: 'none' } }}
            onClose={handleClose}
          >
            {currentProfile?.name}
          </DrawerHeader>

          <DrawerBody style={{ flexDirection: 'column' }}>
            <Text kind="body1">{currentProfile?.email}</Text>
            <Text kind="body1">{currentProfile?.phone}</Text>
          </DrawerBody>
        </Drawer>
      )}
    </>
  )
}
