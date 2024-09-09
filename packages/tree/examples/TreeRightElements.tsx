import * as React from 'react'
import {
  Badge,
  clsx,
  createUseStyles,
  Tooltip,
  Tree,
  TreeNodeContentProps,
  useButtonReset,
  TreeItem,
} from '@v-uik/base'

const DotsIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z"
        fill="currentColor"
      />
      <path
        d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
        fill="currentColor"
      />
      <path
        d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  )
}

const InfoIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 9C13 9.6 12.6 10 12 10C11.5 10 11 9.6 11 9C11 8.4 11.4 8 12 8C12.6 8 13 8.4 13 9Z"
        fill="currentColor"
      />
      <path
        d="M13 12V15C13.6 15 14 15.4 14 16C14 16.6 13.6 17 13 17H12C11.4 17 11 16.6 11 16V13C10.4 13 10 12.6 10 12C10 11.4 10.4 11 11 11H12C12.6 11 13 11.4 13 12Z"
        fill="currentColor"
      />
    </svg>
  )
}

type CustomItem = TreeItem & {
  count: number
  children?: CustomItem[]
}

const dataSource: CustomItem[] = [
  {
    key: 'node-0',
    label: 'node-0',
    count: 3,
    children: [
      {
        key: 'node-0-0',
        label: 'node-0-0',
        count: 1,
      },
      {
        key: 'node-0-1',
        label: 'node-0-1',
        count: 2,
      },
    ],
  },
]

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
})

const useTreeStyles = createUseStyles({
  nodeContentContainer: {
    width: '100%',
  },
  nodeContent: {
    width: '100%',
  },
})

const useStylesContentDots = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dots: {
    cursor: 'pointer',
    height: 24,
    width: 24,
  },
})

const useStylesContentBadge = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    height: 24,
    width: 24,
    left: 12,
    position: 'relative',
  },
})

const useStylesContentTooltip = createUseStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    height: 24,
    width: 24,
  },
})

const ContentDots: React.FC<TreeNodeContentProps> = ({ children, data }) => {
  const resetButtonClasses = useButtonReset()
  const classes = useStylesContentDots()

  const handleButtonClick = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
  }

  return (
    <span className={classes.root}>
      {children}
      <button
        aria-label={`Actions for ${String(data.label)}`}
        className={clsx(resetButtonClasses.resetButton, classes.dots)}
        onClick={handleButtonClick}
      >
        <DotsIcon />
      </button>
    </span>
  )
}

const ContentBadge: React.FC<TreeNodeContentProps<CustomItem>> = ({
  children,
  data,
}) => {
  const classes = useStylesContentBadge()

  return (
    <span className={classes.root}>
      {children}
      <div className={classes.badge}>
        <Badge content={data.count} status="info" />
      </div>
    </span>
  )
}

const ContentTooltip: React.FC<TreeNodeContentProps> = ({ children }) => {
  const classes = useStylesContentTooltip()

  return (
    <span className={classes.root}>
      {children}
      <div className={classes.info}>
        <Tooltip dropdownProps={{ placement: 'top', content: 'Tooltip' }}>
          <div>
            <InfoIcon />
          </div>
        </Tooltip>
      </div>
    </span>
  )
}

export const TreeRightElements: React.FC = () => {
  const classes = useStyles()
  const treeClasses = useTreeStyles()

  return (
    <div className={classes.root}>
      <Tree
        dataSource={dataSource}
        classes={treeClasses}
        components={{ Content: ContentDots }}
      />
      <Tree
        dataSource={dataSource}
        classes={treeClasses}
        components={{ Content: ContentBadge }}
      />
      <Tree
        dataSource={dataSource}
        classes={treeClasses}
        components={{ Content: ContentTooltip }}
      />
    </div>
  )
}
