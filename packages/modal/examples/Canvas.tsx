import * as React from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from '@v-uik/base'

export default () => {
  return (
    <Modal open>
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
          veritatis? Dolor labore maiores mollitia nulla quia sit sunt voluptas
          voluptates. Aut eaque iste repellat sapiente similique veritatis.
          Aliquam consectetur cum error facere illum iusto modi natus possimus
          quae quo?
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button kind="outlined">Cancel</Button>
        <Button>Submit</Button>
      </ModalFooter>
    </Modal>
  )
}
