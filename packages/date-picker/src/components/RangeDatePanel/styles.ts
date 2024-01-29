import { Styles } from 'react-jss'
import { Theme } from '@v-uik/theme'

export const getStyles = (theme: Theme): Styles => ({
  viewsContainer: {
    display: 'flex',
  },

  divider: {
    margin: [0, 7, 0, 8],
    borderLeft: `1px solid ${
      theme.comp.rangeDayView.dividerColorBorder ||
      theme.comp.dayView.dividerColorBorder
    }`,
  },
})
