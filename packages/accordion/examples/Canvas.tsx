import * as React from 'react'
import { Accordion, AccordionItem } from '@v-uik/base'

const items = [
  {
    header: 'header 1',
    expanded: true,
    children: 'text 1',
  },
  {
    header: 'header 2',
    expanded: true,
    children: 'text 2',
  },
  {
    header: 'header 2',
    children: 'text 2',
  },
]

export default () => {
  return (
    <Accordion style={{ maxWidth: 400 }}>
      {items.map((item, index) => (
        <AccordionItem key={`${index}_${item.header}`} {...item} />
      ))}
    </Accordion>
  )
}
