import * as React from 'react'
import { createUseStyles, Link, Text, Card } from '@v-uik/base'
import { preview } from './assets'

const useStyles = createUseStyles((theme) => ({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  body: {
    display: 'flex',
    background: theme.sys.color.backgroundBeta,
  },
  img: {
    height: 340,
  },
  content: {
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    color: theme.sys.color.onBackgroundMedium,
    marginTop: 4,
  },
  footer: {
    marginTop: 'auto',
  },
}))

export const HorizontalCard = () => {
  const styles = useStyles()

  return (
    <div style={{ width: 600, margin: 'auto' }}>
      <Card kind="container" classes={{ card: styles.card, body: styles.body }}>
        <img src={preview} className={styles.img} />
        <div className={styles.content}>
          <div style={{ marginBottom: 20 }}>
            <Text kind="headline4">Title</Text>
            <Text kind="body2" className={styles.subtitle}>
              Subtitle
            </Text>
          </div>
          <div>
            <Text kind="body1">
              Twenty years from now you will be&nbsp;more disappointed
              by&nbsp;the things that you didn&rsquo;t do&nbsp;than by&nbsp;the
              ones you did&nbsp;do. So&nbsp;throw off the bowlines. Catch the
              trade winds in&nbsp;your sails. Explore. Dream. Discover. (Mark
              Twain)
            </Text>
          </div>
          <div className={styles.footer} style={{ marginTop: 20 }}>
            <Link href="#">Click me</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
