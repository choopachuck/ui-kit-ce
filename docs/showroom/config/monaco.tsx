/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const packages = [
  'base',
  'accordion',
  'autocomplete',
  'avatar',
  'badge',
  'bar',
  'box',
  'breadcrumbs',
  'button-group',
  'button',
  'card',
  'checkbox-group',
  'checkbox',
  'combo-box',
  'common',
  'container',
  'date-picker',
  'divider',
  'drawer',
  'dropdown-menu',
  'dropdown',
  'file-uploader',
  'grid',
  'hooks',
  'inline-notification',
  'input-helper-text',
  'input-label',
  'input-number',
  'input-password',
  'input',
  'labelled',
  'label-control',
  'link',
  'list',
  'masked-input',
  'modal',
  'next-js-provider',
  'notification',
  'pagination',
  'popup',
  'portal',
  'progress',
  'radio-group',
  'radio',
  'select',
  'slider',
  'stepper',
  'switch',
  'table',
  'tabs',
  'tag',
  'textarea',
  'theme',
  'tooltip',
  'tree',
  'typography',
  'underlay',
  'utils',
]

export const setup = () => {
  require('storybook-addon-code-editor').setupMonaco({
    //@ts-ignore
    onMonacoLoad(monaco) {
      packages.forEach((p) => {
        try {
          const typedefs = require(`!raw-loader!./monaco_typedefs/${p}.d.ts`)
          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            typedefs.default.replace(
              'declare module "index"',
              `declare module "@v-uik/${p}"`
            ),
            `file:///node_modules/@v-uik/${p}/index.d.ts`
          )
        } catch (e) {
          console.warn(
            `Файлы типов для monaco не найдены. Запустите yarn build, а далее yarn gen-dts-for-monaco`
          )
        }
      })
    },
  })
}
