import * as React from 'react'
import { Accordion, AccordionItem, AccordionIconProps } from '@v-uik/base'

const Icon = ({ expanded, classes }: AccordionIconProps) => {
  return (
    <span
      className={classes?.headerIcon}
      style={{
        display: 'inline-flex',
        height: 24,
        width: 24,
        justifyContent: 'center',
        color: expanded ? 'red' : 'black',
        alignItems: 'center',
      }}
    >
      ⇩
    </span>
  )
}

export const CustomIcon = (): React.ReactElement => {
  const [expanded, setExpanded] = React.useState<string | null>(null)

  const handleOpen = (field: string) => () => {
    setExpanded(field === expanded ? null : field)
  }

  return (
    <Accordion style={{ maxWidth: 600 }}>
      <AccordionItem
        expanded={expanded === 'first'}
        header="How do you acquire a dog?"
        components={{
          Icon,
        }}
        onClick={handleOpen('first')}
      >
        Three common ways for a prospective owner to acquire a dog is from pet
        shops, private owners, or shelters. A pet shop may be the most
        convenient way to buy a dog. Buying a dog from a private owner allows
        you to assess the pedigree and upbringing of your dog before choosing to
        take it home. Lastly, finding your dog from a shelter, helps give a good
        home to a dog who may not find one so readily.
      </AccordionItem>
    </Accordion>
  )
}
