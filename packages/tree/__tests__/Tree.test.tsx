import * as React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Tree, TreeNodeItem, TreeNodeCheckboxProps } from '../src'
import { Checkbox as UikCheckbox } from '@v-uik/checkbox'
import {
  dataSourceSmall as dataSource,
  allCheckedKeysSmall0 as allCheckedKeys0,
  checkboxClasses,
  treeClasses,
} from './data'
import { DATA_ITEM_ID } from '../src/common'

const Checkbox = ({
  nodeKey,
  depth,
  size,
  data,
  expanded,
  ...rest
}: TreeNodeCheckboxProps) => {
  return <UikCheckbox {...rest} title="checkbox" classes={checkboxClasses} />
}

describe('expand', () => {
  describe('uncontrolled', () => {
    it('expand on expander click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(<Tree dataSource={dataSource} />)

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement
      const expandButton = treeItem.querySelector(`button`) as HTMLElement

      expect(expandButton).toBeInTheDocument()

      fireEvent.click(expandButton)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
      ).toBeInTheDocument()
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
      ).toBeInTheDocument()
    })
    it('expand on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(<Tree dataSource={dataSource} />)

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
      ).toBeInTheDocument()
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
      ).toBeInTheDocument()
    })
    it('not expand on node click with disableExpand="true"', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree disableExpand dataSource={dataSource} />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
      ).not.toBeInTheDocument()
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
      ).not.toBeInTheDocument()
    })
    it('default expanded', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree dataSource={dataSource} defaultExpandedKeys={[key]} />
      )

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
      ).toBeInTheDocument()
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
      ).toBeInTheDocument()
    })
  })
  describe('controlled', () => {
    it('expand on expander click', () => {
      const key = 'item-0'

      let newExpandedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleExpand = (
        expandedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newExpandedKeys = expandedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          dataSource={dataSource}
          expandedKeys={[]}
          onNodeExpand={handleExpand}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement
      const expandButton = treeItem.querySelector(`button`) as HTMLElement

      expect(expandButton).toBeInTheDocument()

      fireEvent.click(expandButton)

      expect(numberOfCalls).toEqual(1)
      expect(newExpandedKeys).toEqual([key])
      expect(node).toMatchSnapshot()
    })
    it('expand on node click', () => {
      const key = 'item-0'

      let newExpandedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleExpand = (
        expandedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newExpandedKeys = expandedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          dataSource={dataSource}
          expandedKeys={[]}
          onNodeExpand={handleExpand}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(numberOfCalls).toEqual(1)
      expect(newExpandedKeys).toEqual([key])
      expect(node).toMatchSnapshot()
    })
    it('not expand on node click with disableExpandOnClick="true"', () => {
      const key = 'item-0'

      const handleExpand = jest.fn()

      const { container } = render(
        <Tree
          disableExpandOnClick
          dataSource={dataSource}
          expandedKeys={[]}
          onNodeExpand={handleExpand}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(handleExpand).toBeCalledTimes(0)
    })
    it('default expanded', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'
      const handleExpand = jest.fn()

      const { container } = render(
        <Tree
          dataSource={dataSource}
          expandedKeys={[key, childrenKey01, childrenKey02]}
          onNodeExpand={handleExpand}
        />
      )

      expect(handleExpand).toBeCalledTimes(0)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
      ).toBeInTheDocument()
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
      ).toBeInTheDocument()
    })
  })
})

describe('check', () => {
  describe('uncontrolled', () => {
    it('check on checkbox click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree
          checkable
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement
      const checkbox = treeItem.querySelector(
        'input[type="checkbox"]'
      ) as HTMLElement

      expect(checkbox).toBeInTheDocument()

      fireEvent.click(checkbox)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"] [title="checkbox"]`)
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey01}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey02}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
    })
    it('check on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree
          checkable
          disableExpandOnClick
          enableCheckOnClick
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"] [title="checkbox"]`)
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey01}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey02}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
    })
    it('not check on node click with enableCheckOnClick="false"', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree
          checkable
          disableExpandOnClick
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"] [title="checkbox"]`)
      ).not.toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey01}"] [title="checkbox"]`
        )
      ).not.toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey02}"] [title="checkbox"]`
        )
      ).not.toHaveClass(checkboxClasses.checked)
    })
    it('default checked', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const { container } = render(
        <Tree
          checkable
          dataSource={dataSource}
          defaultCheckedKeys={[key]}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
        />
      )

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"] [title="checkbox"]`)
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey01}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey02}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
    })
  })
  describe('controlled', () => {
    it('check on checkbox click', () => {
      const key = 'item-0'

      let newCheckedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleCheck = (
        checkedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newCheckedKeys = checkedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          checkable
          dataSource={dataSource}
          checkedKeys={[]}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
          onNodeCheck={handleCheck}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement
      const checkbox = treeItem.querySelector(
        'input[type="checkbox"]'
      ) as HTMLElement

      expect(checkbox).toBeInTheDocument()

      fireEvent.click(checkbox)

      expect(numberOfCalls).toEqual(1)
      expect(newCheckedKeys).toEqual(allCheckedKeys0)
      expect(node).toMatchSnapshot()
    })
    it('check on node click', () => {
      const key = 'item-0'

      let newCheckedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleCheck = (
        checkedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newCheckedKeys = checkedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          checkable
          disableExpandOnClick
          enableCheckOnClick
          dataSource={dataSource}
          checkedKeys={[]}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
          onNodeCheck={handleCheck}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(numberOfCalls).toEqual(1)
      expect(newCheckedKeys).toEqual(allCheckedKeys0)
      expect(node).toMatchSnapshot()
    })
    it('not check on node click with enableCheckOnClick="false"', () => {
      const key = 'item-0'

      const handleCheck = jest.fn()

      const { container } = render(
        <Tree
          checkable
          dataSource={dataSource}
          expandedKeys={[]}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
          onNodeCheck={handleCheck}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(handleCheck).toBeCalledTimes(0)
    })
    it('default checked', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const handleCheck = jest.fn()

      const { container } = render(
        <Tree
          checkable
          dataSource={dataSource}
          checkedKeys={[key]}
          defaultExpandedKeys={[key]}
          components={{ Checkbox }}
          onNodeCheck={handleCheck}
        />
      )

      expect(handleCheck).toBeCalledTimes(0)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"] [title="checkbox"]`)
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey01}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
      expect(
        container.querySelector(
          `[${DATA_ITEM_ID}="${childrenKey02}"] [title="checkbox"]`
        )
      ).toHaveClass(checkboxClasses.checked)
    })
  })
})

describe('select', () => {
  describe('uncontrolled', () => {
    it('select on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'

      const { container } = render(
        <Tree
          selectable
          disableExpandOnClick
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(treeItem.parentNode).toHaveClass(treeClasses.itemSelected)

      const childrenItem = container.querySelector(
        `[${DATA_ITEM_ID}="${childrenKey01}"]`
      ) as HTMLElement

      fireEvent.click(childrenItem)

      expect(treeItem.parentNode).not.toHaveClass(treeClasses.itemSelected)

      expect(childrenItem.parentNode).toHaveClass(treeClasses.itemSelected)
    })
    it('multiple select on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'

      const { container } = render(
        <Tree
          selectable
          multipleSelect
          disableExpandOnClick
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(treeItem.parentNode).toHaveClass(treeClasses.itemSelected)

      const childrenItem = container.querySelector(
        `[${DATA_ITEM_ID}="${childrenKey01}"]`
      ) as HTMLElement

      fireEvent.click(childrenItem)

      expect(treeItem.parentNode).toHaveClass(treeClasses.itemSelected)

      expect(childrenItem.parentNode).toHaveClass(treeClasses.itemSelected)
    })
    it('not select on node click with disableSelectOnClick="true"', () => {
      const key = 'item-0'

      const { container } = render(
        <Tree
          selectable
          disableSelectOnClick
          dataSource={dataSource}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(treeItem.parentElement).not.toHaveClass(treeClasses.itemSelected)
    })
    it('default selected multiple', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'

      const { container } = render(
        <Tree
          selectable
          multipleSelect
          defaultSelectedKeys={[key, childrenKey01]}
          dataSource={dataSource}
          defaultCheckedKeys={[key]}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
        />
      )

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"]`)?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
          ?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
    })
    it('default selected', () => {
      const key = 'item-0'

      const { container } = render(
        <Tree
          selectable
          defaultSelectedKeys={[key]}
          dataSource={dataSource}
          defaultCheckedKeys={[key]}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
        />
      )

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"]`)?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
    })
  })
  describe('controlled', () => {
    it('select on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'

      let newSelectedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleSelect = (
        selectedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newSelectedKeys = selectedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          selectable
          dataSource={dataSource}
          defaultSelectedKeys={[childrenKey01]}
          defaultExpandedKeys={[key]}
          onNodeSelect={handleSelect}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(numberOfCalls).toEqual(1)
      expect(newSelectedKeys).toEqual([key])
      expect(node).toMatchSnapshot()
    })
    it('multiple select on node click', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'

      let newSelectedKeys: React.Key[] = []
      let node: TreeNodeItem = {} as TreeNodeItem
      let numberOfCalls = 0

      const handleSelect = (
        selectedKeys: React.Key[],
        targetNode: TreeNodeItem
      ) => {
        newSelectedKeys = selectedKeys
        node = targetNode
        numberOfCalls++
      }

      const { container } = render(
        <Tree
          selectable
          multipleSelect
          dataSource={dataSource}
          selectedKeys={[childrenKey01]}
          defaultExpandedKeys={[key]}
          onNodeSelect={handleSelect}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(numberOfCalls).toEqual(1)
      expect(newSelectedKeys).toEqual([childrenKey01, key])
      expect(node).toMatchSnapshot()
    })
    it('not select on node click with disableSelectOnClick="true"', () => {
      const key = 'item-0'

      const handleSelect = jest.fn()

      const { container } = render(
        <Tree
          selectable
          disableSelectOnClick
          dataSource={dataSource}
          selectedKeys={[]}
          defaultExpandedKeys={[key]}
          onNodeSelect={handleSelect}
        />
      )

      const treeItem = container.querySelector(
        `[${DATA_ITEM_ID}="${key}"]`
      ) as HTMLElement

      fireEvent.click(treeItem)

      expect(handleSelect).toBeCalledTimes(0)
    })
    it('default selected multiple', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const handleSelect = jest.fn()

      const { container } = render(
        <Tree
          selectable
          multipleSelect
          dataSource={dataSource}
          selectedKeys={[key, childrenKey01, childrenKey02]}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
          onNodeSelect={handleSelect}
        />
      )

      expect(handleSelect).toBeCalledTimes(0)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"]`)?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
          ?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
          ?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
    })
    it('default selected', () => {
      const key = 'item-0'
      const childrenKey01 = 'item-0-1'
      const childrenKey02 = 'item-0-2'

      const handleSelect = jest.fn()

      const { container } = render(
        <Tree
          selectable
          dataSource={dataSource}
          selectedKeys={[key, childrenKey01, childrenKey02]}
          defaultExpandedKeys={[key]}
          classes={treeClasses}
          onNodeSelect={handleSelect}
        />
      )

      expect(handleSelect).toBeCalledTimes(0)

      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${key}"]`)?.parentNode
      ).not.toHaveClass(treeClasses.itemSelected)
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey01}"]`)
          ?.parentNode
      ).not.toHaveClass(treeClasses.itemSelected)
      expect(
        container.querySelector(`[${DATA_ITEM_ID}="${childrenKey02}"]`)
          ?.parentNode
      ).toHaveClass(treeClasses.itemSelected)
    })
  })
})
