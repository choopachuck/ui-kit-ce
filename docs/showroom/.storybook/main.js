const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const {
  getCodeEditorStaticDirs,
} = require('storybook-addon-code-editor/getStaticDirs')
const { run } = require('../../../scripts/theme-parser')

const rootPath = path.resolve(__dirname, '../')

run(path.resolve(rootPath, './theme-tokens.json'))

module.exports = {
  core: {
    builder: '@storybook/builder-webpack5',
  },
  stories: [
    '../cookbook/**/*story.[tj]sx',
    '../cookbook/**/*story.mdx',
    '../../../packages/**/*story.mdx',
  ],

  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
      },
    },
    '@storybook/addon-a11y',
    'storybook-addon-designs',
    'storybook-addon-code-editor',
  ],

  staticDirs: [...getCodeEditorStaticDirs()],

  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      include: ['**/packages/**/*.tsx', '**/docs/**/*.dummy.tsx'],
      exclude: ['**/packages/**/*Icon*.tsx'],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },

  webpackFinal: function (config) {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    config.resolve.plugins = config.resolve.plugins ?? []
    config.resolve.plugins.push(new TsconfigPathsPlugin())

    if (process.argv.indexOf('--no-lint') === -1) {
      config.plugins.push(
        new ESLintPlugin({
          context: rootPath,
          extensions: ['ts', 'tsx'],
          lintDirtyModulesOnly: true,
        })
      )
    } else {
      console.info(
        '\x1b[31m%s\x1b[0m',
        '\n\n eslint в dev-сервере отключен \n\n'
      )
    }

    // allow HTML comments for JSS insertion point example
    for (let i = 0; i < config.plugins.length; i++) {
      if (config.plugins[i] instanceof HTMLWebpackPlugin) {
        config.plugins[i].options.minify.removeComments = false
        break
      }
    }

    return config
  },
}
