import * as React from 'react'
import { Breadcrumbs, Link } from '@v-uik/base'

const items = [
  {
    children: 'Breadcrumb 1',
  },
  {
    children: 'Breadcrumb 2',
  },
  {
    disabled: true,
    children: 'Breadcrumb 3',
  },
  {
    children: 'Breadcrumb 4',
  },
  {
    children: 'Breadcrumb 5',
  },
  {
    children: 'Breadcrumb 6',
  },
  {
    children: 'Breadcrumb 7',
  },
  {
    children: 'Breadcrumb 8',
  },
  {
    children: 'Breadcrumb 9',
  },
  {
    children: 'Breadcrumb 10',
  },
]

export default () => {
  return (
    <Breadcrumbs>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return <span key={`${index}_${item.children}`}>{item.children}</span>
        }

        return (
          <Link key={`${index}_${item.children}`} href="#" {...item}>
            {item.children}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}
