import * as React from 'react'
import { Tab, Tabs } from '../src'
import { fireEvent, render } from '@testing-library/react'
import { light } from '@v-uik/theme'
import userEvent from '@testing-library/user-event'

const Component = () => {
  const [tabsCount, setTabsCount] = React.useState([1, 2, 3])
  const [activeTab, setActiveTab] = React.useState(1)

  const onClickAdd = () => {
    const newTabValue = tabsCount.length
      ? tabsCount[tabsCount.length - 1] + 1
      : 1
    setActiveTab(newTabValue)
    setTabsCount([...tabsCount, newTabValue])
  }

  const onClickDelete = (tabCount: number) => {
    const newTabsCount = tabsCount.filter((value) => value !== tabCount)
    setTabsCount(newTabsCount)
    if (tabCount === activeTab) {
      setActiveTab(-1)
    }
  }

  return (
    <Tabs
      data-testid="tabs"
      value={activeTab}
      onChange={(value) => setActiveTab(value as number)}
    >
      {tabsCount.map((tabCount) => (
        <Tab
          key={tabCount}
          value={tabCount}
          disabled={tabCount % 2 === 0}
          header={
            <>
              {`${tabCount} вкладка`}
              <div
                role="button"
                data-testid={`delete${tabCount}`}
                style={{
                  display: 'flex',
                  marginLeft: 8,
                }}
                onClick={(event) => {
                  event.stopPropagation()
                  onClickDelete(tabCount)
                }}
              >
                &#10008;
              </div>
            </>
          }
        >
          {`Содержимое ${tabCount} вкладки`}
        </Tab>
      ))}
      <Tab
        style={{ padding: 8 }}
        value="Add"
        header="&#10010;"
        data-testid="addButton"
        onClick={onClickAdd}
      />
    </Tabs>
  )
}

it('set kind correctly', () => {
  const { getByText } = render(
    <Tabs value="1" kind="filled">
      <Tab value="1" header="1 вкладка">
        Содержимое 1 вкладки
      </Tab>
    </Tabs>
  )

  const tabs = getByText('Содержимое 1 вкладки')
  expect(tabs).toHaveStyle({
    backgroundColor: light.comp.tabs.contentColorBackgroundFilled,
  })
})

it('display active tab correctly', () => {
  const { getByRole, getByText } = render(
    <Tabs value="2" kind="filled">
      <Tab value="1" header="1 вкладка">
        Содержимое 1 вкладки
      </Tab>
      <Tab value="2" header="2 вкладка">
        Содержимое 2 вкладки
      </Tab>
    </Tabs>
  )
  const activeTab = getByRole('tab', { name: '2 вкладка' })
  expect(activeTab.className).toMatch(/selected/i)
  expect(getByText('Содержимое 2 вкладки')).toBeInTheDocument()
})

it('switch active tab correctly', () => {
  const { getByRole } = render(<Component />)

  const activeTab = getByRole('tab', { name: /1 вкладка/i })
  expect(activeTab).toBeInTheDocument()
  expect(activeTab.className).toMatch(/selected/i)
  const secondTab = getByRole('tab', { name: /3 вкладка/i })
  fireEvent.click(secondTab)
  expect(secondTab.className).toMatch(/selected/i)
})

it('should navigate through disabled options correctly', () => {
  const { getByRole, getByText } = render(<Component />)

  const activeTab = getByRole('tab', { name: /1 вкладка/i })
  const nextTab = getByRole('tab', { name: /3 вкладка/i })

  expect(activeTab.className).toMatch(/selected/i)
  activeTab.focus()
  expect(activeTab).toHaveFocus()
  // Навигация табов с помощью стрелок
  userEvent.keyboard('{ArrowRight}')
  expect(activeTab).not.toHaveFocus()
  expect(nextTab).toHaveFocus()
  userEvent.keyboard('{Enter}')
  expect(nextTab.className).toMatch(/selected/i)
  expect(getByText('Содержимое 3 вкладки')).toBeInTheDocument()
})

it('should add and delete correctly', async () => {
  const { getByTestId, findByText, queryByText } = render(<Component />)

  expect(queryByText('4 вкладка')).not.toBeInTheDocument()
  const addButton = getByTestId('addButton')
  fireEvent.click(addButton)
  expect(await findByText('4 вкладка')).toBeInTheDocument()
  const deleteButton = getByTestId('delete4')
  fireEvent.click(deleteButton)
  expect(queryByText('4 вкладка')).not.toBeInTheDocument()
})

it('should have tab content in dom', () => {
  const { getAllByText } = render(
    <Tabs defaultValue="1">
      <Tab forceRender value="1" header="1">
        <div data-testid="1">Текст</div>
      </Tab>
      <Tab forceRender value="2" header="2">
        <div data-testid="2">Текст</div>
      </Tab>
      <Tab forceRender value="3" header="3">
        <div data-testid="3">Текст</div>
      </Tab>
      <Tab forceRender value="4" header="4">
        <div data-testid="4">Текст</div>
      </Tab>
    </Tabs>
  )

  expect(getAllByText('Текст').length).toEqual(4)
})
