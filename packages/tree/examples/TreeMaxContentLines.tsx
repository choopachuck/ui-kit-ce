import * as React from 'react'
import { Tree } from '@v-uik/tree'

const dataSource = [
  {
    key: 'node-0',
    label:
      'node-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
    children: [
      {
        key: 'node-0-0',
        label:
          'node-0-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
        children: [
          {
            key: 'node-0-0-0',
            label:
              'node-0-0-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
          {
            key: 'node-0-0-1',
            label:
              'node-0-0-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
        ],
      },
      {
        key: 'node-0-1',
        label:
          'node-0-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
        children: [
          {
            key: 'node-0-1-0',
            label:
              'node-0-1-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
          {
            key: 'node-0-1-1',
            label:
              'node-0-1-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
        ],
      },
    ],
  },
  {
    key: 'node-1',
    label:
      'node-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
    children: [
      {
        key: 'node-1-0',
        label:
          'node-1-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
        children: [
          {
            key: 'node-1-0-0',
            label:
              'node-1-0-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
          {
            key: 'node-1-0-1',
            label:
              'node-1-0-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
        ],
      },
      {
        key: 'node-1-1',
        label:
          'node-1-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
        children: [
          {
            key: 'node-1-1-0',
            label:
              'node-1-1-0 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
          {
            key: 'node-1-1-1',
            label:
              'node-1-1-1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi non sit cupiditate commodi dignissimos numquam, quaerat recusandae quod nemo assumenda!',
          },
        ],
      },
    ],
  },
]

export const TreeMaxContentLines: React.FC = () => {
  return <Tree dataSource={dataSource} maxContentLines={2} />
}
