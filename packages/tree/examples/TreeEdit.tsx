import * as React from 'react'
import {
  Input,
  Tree,
  TreeItem,
  TreeNodeContentProps,
  createUseStyles,
} from '@v-uik/base'

export const PencilIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.15 3.75C10.15 3.25 9.95 2.75 9.6 2.4C8.9 1.7 7.6 1.7 6.9 2.4L1.65 7.65C1.55 7.75 1.5 7.85 1.5 8V10C1.5 10.3 1.7 10.5 2 10.5H4C4.15 10.5 4.25 10.45 4.35 10.35L9.1 5.6L9.6 5.1C9.95 4.75 10.15 4.25 10.15 3.75ZM8.9 3.1C9.05 3.25 9.15 3.5 9.15 3.75C9.15 4 9.05 4.2 8.9 4.4L8.75 4.55L7.45 3.25L7.6 3.1C7.95 2.75 8.55 2.75 8.9 3.1ZM3.8 9.5H2.5V8.2L6.75 3.95L8.05 5.25L3.8 9.5Z"
      fill="currentColor"
    />
  </svg>
)

export const AcceptIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4L12.9993 5L7 11L4 8L5 7L7 9L12 4Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
  </svg>
)

export const ClearIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.9979L11 3.99805L7.99806 7.00089L4.99552 4.00067L3.99567 5.00067L6.99756 8.00168L4.00062 10.9995L4.99822 12.0051L7.99859 9.00242L10.9971 12.0001L12.0027 11.0025L8.99908 8.00115L12 4.9979Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
  </svg>
)

const initialDataSource: TreeItem[] = [
  {
    key: 'node-0',
    label: 'node-0',
    children: [
      {
        key: 'node-0-0',
        label: 'node-0-0',
        children: [
          {
            key: 'node-0-0-0',
            label: 'node-0-0-0',
          },
          {
            key: 'node-0-0-1',
            label: 'node-0-0-1',
          },
        ],
      },
      {
        key: 'node-0-1',
        label: 'node-0-1',
        children: [
          {
            key: 'node-0-1-0',
            label: 'node-0-1-0',
          },
          {
            key: 'node-0-1-1',
            label: 'node-0-1-1',
          },
        ],
      },
    ],
  },
  {
    key: 'node-1',
    label: 'node-1',
    children: [
      {
        key: 'node-1-0',
        label: 'node-1-0',
        children: [
          {
            key: 'node-1-0-0',
            label: 'node-1-0-0',
          },
          {
            key: 'node-1-0-1',
            label: 'node-1-0-1',
          },
        ],
      },
      {
        key: 'node-1-1',
        label: 'node-1-1',
        children: [
          {
            key: 'node-1-1-0',
            label: 'node-1-1-0',
          },
          {
            key: 'node-1-1-1',
            label: 'node-1-1-1',
          },
        ],
      },
    ],
  },
]

const useStyles = createUseStyles({
  nodeControl: {
    height: 32,
  },
})

const useContentStyles = createUseStyles({
  nodeContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nodePencilButton: {
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    border: '1px solid transparent',
    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.29)',
      color: 'rgba(0, 0, 0, 0.9)',
    },
  },
  inputFocused: {
    '& > $inputRoot': {
      boxShadow: 'none',
    },
  },
  inputRoot: {
    width: 164,
    background: 'rgba(242, 242, 242, 1)',
    '&::after': {
      border: '1px solid rgba(0, 0, 0, 0.29)',
    },
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  button: {
    cursor: 'pointer',
    display: 'flex',
    '&:hover': {
      color: 'rgba(0, 0, 0, 1)',
    },
  },
})

const Content: React.FC<
  TreeNodeContentProps & {
    setDataSource: React.Dispatch<React.SetStateAction<TreeItem[]>>
  }
> = ({ data, setDataSource }) => {
  const classes = useContentStyles()
  const [isEdit, setIsEdit] = React.useState(false)
  const [name, setName] = React.useState(String(data.label))

  const changeNodeName = () => {
    setDataSource((prev) => {
      const walkTree = (tree: TreeItem[]) => {
        const newData: TreeItem[] = []

        tree.forEach((item) => {
          const isChanged = item.key === data.key
          const newItem: TreeItem = {
            ...item,
            label: isChanged ? name : item.label,
          }
          if (!isChanged && item.children) {
            newItem.children = walkTree(item.children)
          }

          newData.push(newItem)
        })

        return newData
      }

      return walkTree(prev)
    })
  }

  const handleClose = () => {
    setName(String(data.label))
    setIsEdit(false)
  }

  const handleAccept = () => {
    changeNodeName()
    setIsEdit(false)
  }

  const handlePencilClick = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation()
    setIsEdit(true)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEdit(false)
      changeNodeName()
      event.stopPropagation()
    }
    if (event.key === 'Escape') {
      handleClose()
    }
  }

  if (isEdit) {
    return (
      <div
        className={classes.nodeContent}
        onClick={(event) => event.stopPropagation()}
      >
        <Input
          suffix={
            <div className={classes.buttonGroup}>
              <div
                role="button"
                aria-label="Accept"
                className={classes.button}
                onClick={handleAccept}
              >
                <AcceptIcon />
              </div>
              <div
                role="button"
                aria-label="Reset"
                className={classes.button}
                onClick={handleClose}
              >
                <ClearIcon />
              </div>
            </div>
          }
          inputProps={{ autoFocus: true, onKeyDown: handleKeyDown }}
          size="sm"
          value={name}
          classes={{
            focused: classes.inputFocused,
            inputContainer: classes.inputRoot,
          }}
          onChange={setName}
        />
      </div>
    )
  }

  return (
    <div className={classes.nodeContent}>
      <div>{data.label}</div>
      <div
        className={classes.nodePencilButton}
        role="button"
        aria-label={`Edit node ${String(data.label)}`}
        onClick={handlePencilClick}
      >
        <PencilIcon />
      </div>
    </div>
  )
}

export const TreeEdit: React.FC = () => {
  const [dataSource, setDataSource] = React.useState(initialDataSource)

  return (
    <Tree
      disableFocusTreeOnItemClick
      size="md"
      classes={useStyles()}
      dataSource={dataSource}
      components={{
        Content: (props) => (
          <Content {...props} setDataSource={setDataSource} />
        ),
      }}
    />
  )
}
