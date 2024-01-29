import * as React from 'react'
import { Accordion, AccordionItem } from '@v-uik/base'

export const Collapse = (): React.ReactElement => {
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const handleOpen = (field: string) => () => {
    setExpanded(field === expanded ? null : field)
  }

  return (
    <Accordion style={{ maxWidth: 600 }}>
      <AccordionItem
        expanded={expanded === 'first'}
        header="How do you acquire a dog?"
        onClick={handleOpen('first')}
      >
        Three common ways for a prospective owner to acquire a dog is from pet
        shops, private owners, or shelters. A pet shop may be the most
        convenient way to buy a dog. Buying a dog from a private owner allows
        you to assess the pedigree and upbringing of your dog before choosing to
        take it home. Lastly, finding your dog from a shelter, helps give a good
        home to a dog who may not find one so readily.
      </AccordionItem>
      <AccordionItem
        expanded={expanded === 'second'}
        header="What kinds of dogs are there?"
        onClick={handleOpen('second')}
      >
        There are many breeds of dogs. Each breed varies in size and
        temperament. Owners often select a breed of dog that they find to be
        compatible with their own lifestyle and desires from a companion.
      </AccordionItem>
      <AccordionItem
        expanded={expanded === 'third'}
        header={
          <span>
            What is a <b>dog</b>?
          </span>
        }
        onClick={handleOpen('third')}
      >
        A dog is a type of domesticated animal. Known for its loyalty and
        faithfulness, it can be found as a welcome guest in many households
        across the world.
      </AccordionItem>
    </Accordion>
  )
}
