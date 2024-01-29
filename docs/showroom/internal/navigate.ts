import { addons } from '@storybook/addons'
import { NAVIGATE_URL } from '@storybook/core-events'

/**
 * Метод для изменения url внутри storybook.
 *
 * @see https://storybook.js.org/docs/react/addons/addons-api#apioneventname-fn
 * @see https://github.com/storybookjs/storybook/blob/v6.3.3/addons/docs/src/blocks/mdx.tsx#L52
 */

export const navigate = (url: string): void => {
  addons.getChannel().emit(NAVIGATE_URL, url)
}
