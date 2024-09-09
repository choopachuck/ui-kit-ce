import * as React from 'react'
import {
  Tree,
  TreeItem,
  Modal,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  Button,
} from '@v-uik/base'

const dataSource: TreeItem[] = [
  { key: 'node-0', label: 'node-0', loadable: true },
  {
    key: 'node-0',
    label: 'node-0',
    children: [
      { key: 'node-0-0', label: 'node-0-0' },
      { key: 'node-0-1', label: 'node-0-1', loadable: true },
    ],
  },
]

const delay = (time: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

//TODO: Нерабочий кейс, потому что если данные не загрузились с первого раза, то нельзя триггернуть повторную загрузку. Нужно придумать, как поправить.
export const TreeLoadingError: React.FC = () => {
  const [dataSourceForLoading] = React.useState(dataSource)
  const [hasError, setHasError] = React.useState(false)

  const handleLoadData = async () => {
    await delay(1000)

    setHasError(true)
  }

  return (
    <>
      <Tree dataSource={dataSourceForLoading} onLoadData={handleLoadData} />
      <Modal open={hasError} onClose={() => setHasError(false)}>
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
          <Button kind="outlined" onClick={() => setHasError(false)}>
            Cancel
          </Button>
          <Button onClick={() => setHasError(false)}>Submit</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
