import * as React from 'react'
import { ThemeProvider, Tree, createTheme } from '@v-uik/base'

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

const theme = createTheme({
  comp: {
    backwardCompatibilityMode: false,
    tree: {
      shapeBorderRadiusBottomRightSm: 9999,
      shapeBorderRadiusBottomLeftSm: 9999,
      shapeBorderRadiusTopRightSm: 9999,
      shapeBorderRadiusTopLeftSm: 9999,
      colorText: 'rgba(54, 54, 54, 1)',
      expandIconColor: 'rgba(54, 54, 54, 1)',
      colorTextHover: 'rgba(0, 0, 0, 1)',
      expandIconColorHover: 'rgba(0, 0, 0, 1)',
      colorBackgroundHover: 'rgba(63, 129, 253, 0.14)',
      trailsBorderRadius: 0,
      trailsColor: 'rgba(54, 54, 54, 1)',
    },
  },
})

export const TreeThemed: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Tree
        showTrails
        dataSource={dataSource}
        defaultExpandedKeys={['node-0']}
      />
    </ThemeProvider>
  )
}
