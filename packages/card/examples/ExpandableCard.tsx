import * as React from 'react'
import { Card, createUseStyles, Text, Button, Divider, clsx } from '@v-uik/base'

const useStyles = createUseStyles((theme) => ({
  header: {
    display: 'flex',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    marginTop: 8,
    color: theme.sys.color.onBackgroundMedium,
  },
  iconButton: {
    minWidth: 'unset',
    padding: 8,
  },
  icon: {
    transform: 'rotate(0)',
    transition: '0.3s ease-in-out transform',
  },
  open: {
    '& $icon': {
      transform: 'rotate(-180deg)',
    },
  },
  externalContent: {
    height: 0,
    transition: '0.3s ease-in-out height',
    overflow: 'hidden',
  },
  divider: {
    marginBottom: 16,
  },
}))

const ArrowIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.501 8L18 9.6L12.0005 16L6 9.6L7.50014 8L12.0005 12.8L16.501 8Z"
      fill="currentColor"
    />
  </svg>
)

export const ExpandableCard: React.FC = () => {
  const styles = useStyles()
  const [expandable, setExpandable] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  return (
    <div
      style={{ width: 400, margin: 'auto' }}
      className={clsx(expandable && styles.open)}
    >
      <Card>
        <div className={styles.header}>
          <div>
            <Text kind="titleLg">Title</Text>
            <Text kind="titleMd" className={styles.subtitle}>
              Subtitle
            </Text>
          </div>
          <Button
            className={styles.iconButton}
            kind="ghost"
            color="secondary"
            onClick={() => setExpandable((prev) => !prev)}
          >
            <ArrowIcon className={styles.icon} />
          </Button>
        </div>
        <Divider className={styles.divider} />
        <div>
          <Text kind="body1">
            Twenty years from now you will be&nbsp;more disappointed by&nbsp;the
            things that you didn&rsquo;t do&nbsp;than by&nbsp;the ones you
            did&nbsp;do.
          </Text>
          <Text
            ref={ref}
            kind="body1"
            className={styles.externalContent}
            style={{ height: expandable ? ref.current?.scrollHeight : 0 }}
          >
            <br />
            So&nbsp;throw off the bowlines. Catch the trade winds in&nbsp;your
            sails. Explore. Dream. Discover. (Mark Twain)
          </Text>
        </div>
      </Card>
    </div>
  )
}
