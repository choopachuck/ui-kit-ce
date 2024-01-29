import * as React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@v-uik/base'

export const CustomWidth = (): JSX.Element => {
  const [open, setOpen] = React.useState(false)

  const showModal = () => setOpen(true)

  const hideModal = () => setOpen(false)

  return (
    <>
      <Button onClick={showModal}>show modal</Button>
      <Modal width={600} open={open} onClose={hideModal}>
        <ModalHeader
          subtitle="Additional subtitle"
          closeButtonProps={{
            'aria-label': 'Close modal',
          }}
        >
          Modal title
        </ModalHeader>
        <ModalBody>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga id
            labore, magnam mollitia nihil perspiciatis repudiandae ut. Aliquam
            aperiam commodi dolore pariatur perferendis repudiandae vel,
            veritatis? Dolor labore maiores mollitia nulla quia sit sunt
            voluptas voluptates. Aut eaque iste repellat sapiente similique
            veritatis. Aliquam consectetur cum error facere illum iusto modi
            natus possimus quae quo?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button kind="outlined" onClick={hideModal}>
            Cancel
          </Button>
          <Button onClick={hideModal}>Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
