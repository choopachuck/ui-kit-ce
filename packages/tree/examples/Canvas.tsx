import * as React from 'react'
import { Tree } from '@v-uik/tree'

const items2 = [
  {
    key: 'children-3-0',
    custom: 'custom-children-3-0',
    label: 'children-3-0',
    children: [
      {
        key: 'children-3-0-0',
        custom: 'custom-children-3-0-0',
        label: 'children-3-0-0',
        children: [
          {
            key: 'children-3-0-0-0',
            custom: 'custom-children-3-0-0-0',
            label: 'children-children-3-0-0-0',
            //disabled: true,
            //selectDisabled: true,
          },
          {
            key: 'children-children-3-0-0-0-1',
            custom: 'custom-children-3-0-0-0-1',
            label: 'children-children-3-0-0-0-1',
            //selectDisabled: true,
          },
        ],
      },
      {
        key: 'children-3-0-1',
        custom: 'custom-children-3-0-1',
        label: 'children-3-0-1',
        children: [
          {
            key: 'children-3-0-1-0',
            custom: 'custom-children-3-0-1-0',
            label: 'children-children-3-0-1-0',
            //selectDisabled: true,
          },
          {
            key: 'children-children-3-0-0-1-1',
            custom: 'custom-children-3-0-0-1-1',
            label: 'children-children-3-0-0-1-1',
          },
        ],
      },
    ],
  },
  {
    key: 'children-0',
    custom: 'custom-children-0',
    label: 'children-0',
    children: [
      {
        key: 'children-0-1',
        custom: 'custom-children-0-1',
        label: 'children-0-1',
        children: [
          {
            key: 'children-0-1-1',
            custom: 'custom-children-0-1-1',
            label: 'children-0-1-1',
          },
          {
            key: 'children-0-1-2',
            custom: 'custom-children-0-1-2',
            label: 'children-0-1-2',
            children: [
              {
                key: 'children-0-1-2-1',
                custom: 'custom-children-0-1-2-1',
                label: 'children-0-1-2-1',
                children: [
                  {
                    key: 'children-0-1-2-1-1',
                    //disabled: true,
                    custom: 'custom-children-0-1-2-1-1',
                    label: 'children-0-1-2-1-1',
                  },
                  {
                    key: 'children-0-1-2-1-2',
                    custom: 'custom-children-0-1-2-1-2',
                    label: 'children-0-1-2-1-2',
                  },
                ],
              },
              {
                key: 'children-0-1-2-2',
                custom: 'custom-children-0-1-2-2',
                label: 'children-0-1-2-2',
                children: [
                  {
                    key: 'children-0-1-2-2-1',
                    custom: 'custom-children-0-1-2-2-1',
                    label: 'children-0-1-2-2-1',
                  },
                  {
                    key: 'children-0-1-2-2-2',
                    custom: 'custom-children-0-1-2-2-2',
                    label: 'children-0-1-2-2-2',
                  },
                ],
              },
              {
                key: 'children-0-1-2-3',
                custom: 'custom-children-0-1-2-3',
                label: 'children-0-1-2-3',
                children: [
                  {
                    key: 'children-0-1-2-3-1',
                    custom: 'custom-children-0-1-2-3-1',
                    label: 'children-0-1-2-3-1',
                  },
                  {
                    key: 'children-0-1-2-3-2',
                    custom: 'custom-children-0-1-2-3-2',
                    label: 'children-0-1-2-3-2',
                  },
                ],
              },
            ],
          },
          {
            key: 'children-0-1-3',
            custom: 'custom-children-0-1-3',
            label: 'children-0-1-3',
          },
          {
            key: 'children-0-1-4',
            custom: 'custom-children-0-1-4',
            label: 'children-0-1-4',
          },
        ],
      },
      {
        key: 'children-0-2',
        //checkDisabled: true,
        custom: 'custom-children-0-2',
        label: 'children-0-2',
        children: [
          {
            key: 'children-0-2-1',
            custom: 'custom-children-0-2-1',
            label: 'children-0-2-1',
          },
        ],
      },
      {
        key: 'children-0-3',
        custom: 'custom-children-0-3',
        label: 'children-0-3',
      },
    ],
  },
  {
    key: 'children-1',
    //disabled: true,
    custom: 'custom-children-1',
    label: 'children-1',
    children: [
      {
        key: 'children-1-1',
        custom: 'custom-children-1-1',
        label: 'children-1-1',
        children: [
          {
            key: 'children-1-1-1',
            custom: 'custom-children-1-1-1',
            label: 'children-1-1-1',
          },
          {
            key: 'children-1-1-2',
            custom: 'custom-children-1-1-2',
            label: 'children-1-1-2',
            children: [
              {
                key: 'children-1-1-2-1',
                custom: 'custom-children-1-1-2-1',
                label: 'children-1-1-2-1',
                children: [
                  {
                    key: 'children-1-1-2-1-1',
                    custom: 'custom-children-1-1-2-1-1',
                    label: 'children-1-1-2-1-1',
                  },
                  {
                    key: 'children-1-1-2-1-2',
                    custom: 'custom-children-1-1-2-1-2',
                    label: 'children-1-1-2-1-2',
                  },
                ],
              },
              {
                key: 'children-1-1-2-2',
                custom: 'custom-children-1-1-2-2',
                label: 'children-1-1-2-2',
                children: [
                  {
                    key: 'children-1-1-2-2-1',
                    custom: 'custom-children-1-1-2-2-1',
                    label: 'children-1-1-2-2-1',
                  },
                  {
                    key: 'children-1-1-2-2-2',
                    custom: 'custom-children-1-1-2-2-2',
                    label: 'children-1-1-2-2-2',
                  },
                ],
              },
              {
                key: 'children-1-1-2-3',
                custom: 'custom-children-1-1-2-3',
                label: 'children-1-1-2-3',
                children: [
                  {
                    key: 'children-1-1-2-3-1',
                    custom: 'custom-children-1-1-2-3-1',
                    label: 'children-1-1-2-3-1',
                  },
                  {
                    key: 'children-1-1-2-3-2',
                    custom: 'custom-children-1-1-2-3-2',
                    label: 'children-1-1-2-3-2',
                  },
                ],
              },
            ],
          },
          {
            key: 'children-1-1-3',
            custom: 'custom-children-1-1-3',
            label: 'children-1-1-3',
          },
          {
            key: 'children-1-1-4',
            custom: 'custom-children-1-1-4',
            label: 'children-1-1-4',
          },
        ],
      },
      {
        key: 'children-1-2',
        custom: 'custom-children-1-2',
        label: 'children-1-2',
        children: [
          {
            key: 'children-1-2-1',
            custom: 'custom-children-1-2-1',
            label: 'children-1-2-1',
          },
        ],
      },
      {
        key: 'children-1-3',
        custom: 'custom-children-1-3',
        label: 'children-1-3',
      },
    ],
  },
]

export default (): JSX.Element => {
  return <Tree dataSource={items2} />
}
