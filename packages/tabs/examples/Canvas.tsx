import * as React from 'react'
import { Tabs, Tab } from '@v-uik/base'

const data = [
  {
    value: '1',
    header: '1 вкладка',
    children: 'Содержимое 1 вкладки',
  },
  {
    value: '2',
    header: '2 вкладка',
    children: 'Содержимое 2 вкладки',
  },
  {
    value: '3',
    header: '3 вкладка',
    children: 'Содержимое 3 вкладки',
  },
  {
    value: '4',
    header: '4 вкладка',
    children: 'Содержимое 4 вкладки',
  },
]

export default () => {
  const [currentTab, setCurrentTab] = React.useState('1')

  return (
    <Tabs
      value={currentTab}
      onChange={(value) => setCurrentTab(value as string)}
    >
      {data.map((item, index) => (
        <Tab key={`${index}_${item.value}`} {...item} />
      ))}
    </Tabs>
  )
}
