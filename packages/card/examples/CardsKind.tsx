import { Card, Text } from '@v-uik/base'
import * as React from 'react'

export const CardsKind = () => {
  const [checked, setChecked] = React.useState(false)

  return (
    <div
      style={{
        width: 382,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Card kind="container" header="Container Card">
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </Text>
      </Card>
      <Card
        kind="clickable"
        header="Clickable Card"
        onClick={(e) => console.log(e)}
      >
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </Text>
      </Card>
      <Card
        kind="selectable"
        checked={checked}
        header="Selectable Card"
        onChange={(e) => setChecked(e.target.checked)}
      >
        <Text kind="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa
          mi.
        </Text>
      </Card>
    </div>
  )
}
