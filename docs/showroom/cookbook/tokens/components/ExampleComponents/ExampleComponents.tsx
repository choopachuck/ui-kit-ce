import { createUseStyles } from '@v-uik/base'
import React from 'react'
import {
  Buttons,
  Col,
  Others,
  Inputs,
  Tags,
  Typography,
  Slider,
  Checkbox,
  Stepper,
  Progress,
  Table,
  Breadcrumbs,
} from './components'

const useStyles = createUseStyles((theme) => ({
  background: {
    background: theme.sys.color.backgroundAlpha,
  },
}))

export const ExampleComponents: React.FC<{ action?: boolean }> = ({
  action = true,
}) => {
  const styles = useStyles()

  return (
    <div
      id="example"
      className={styles.background}
      style={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        marginTop: '20px',
        paddingTop: '40px',

        display: 'flex',
        gap: '12px',
      }}
    >
      <Col>
        <Typography />
        <Table />
      </Col>
      <Col>
        <Buttons />
        <Others />
        <Stepper />
        <Progress action={action} />
      </Col>
      <Col>
        <Tags />
        <Inputs />
        <Checkbox />
        <Slider />
        <Breadcrumbs />
      </Col>
    </div>
  )
}
