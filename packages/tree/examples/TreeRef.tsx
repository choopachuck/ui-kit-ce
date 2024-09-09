import * as React from 'react'
import {
  Tree,
  Grid,
  GridItem,
  Button,
  TreeImperativeHandlersRef,
  TreeItem,
  ButtonGroup,
} from '@v-uik/base'

const dataSource = [
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

export const TreeRef: React.FC = () => {
  const ref = React.useRef<TreeImperativeHandlersRef>(null)

  const handleFocus = (event: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.handleFocus(
      event as unknown as React.FocusEvent<HTMLUListElement, Element>
    )
  }

  const handleBlur = (event: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.handleBlur(
      event as unknown as React.FocusEvent<HTMLUListElement, Element>
    )
  }

  const handleSelectSecondNode = () => {
    ref.current?.toggleSelect(dataSource[1].key)
  }

  const toggleExpandFirstNode = () => {
    ref.current?.toggleExpand(dataSource[0].key)
  }

  const handleArrowUp = (event: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.handleFocus(
      event as unknown as React.FocusEvent<HTMLUListElement, Element>
    )
    setTimeout(() => {
      ref.current?.handleKeyDown(
        new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        }) as unknown as React.KeyboardEvent<HTMLUListElement>
      )
    }, 1)
  }

  const handleArrowDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    ref.current?.handleFocus(
      event as unknown as React.FocusEvent<HTMLUListElement, Element>
    )
    setTimeout(() => {
      ref.current?.handleKeyDown(
        new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        }) as unknown as React.KeyboardEvent<HTMLUListElement>
      )
    }, 1)
  }

  return (
    <Grid spacing={8} justify="center">
      <GridItem xs={13}>
        <ButtonGroup>
          <Button kind="outlined" color="secondary" onClick={handleFocus}>
            Focus on Tree
          </Button>
          <Button kind="outlined" color="secondary" onClick={handleBlur}>
            Blur Tree
          </Button>
          <Button
            kind="outlined"
            color="secondary"
            onClick={toggleExpandFirstNode}
          >
            Expand First Node
          </Button>
          <Button
            kind="outlined"
            color="secondary"
            onClick={handleSelectSecondNode}
          >
            Select Second Node
          </Button>
          <Button onClick={handleArrowUp}>↑</Button>
          <Button onClick={handleArrowDown}>↓</Button>
        </ButtonGroup>
      </GridItem>
      <GridItem xs={16}>
        <Tree<TreeItem> ref={ref} selectable dataSource={dataSource} />
      </GridItem>
    </Grid>
  )
}
