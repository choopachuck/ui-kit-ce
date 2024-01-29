const path = require('path')
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json')
const setupJest = path.resolve(__dirname, 'setup-jest.js')

module.exports = {
  bail: 1,
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // чтобы jest мог
  transform: {
    '\\.js?$': 'ts-jest',
  },
  setupFilesAfterEnv: [setupJest],
  moduleNameMapper: {
    /**
     * Сопоставляет пакеты (работает также как paths в tsconfig).
     * Разрешение пути осуществляется относительно директории, содержащий jest конфиг.
     */
    '@v-uik/(.*)': '<rootDir>/packages/$1/src',
  },
  globals: {
    'ts-jest': {
      tsconfig: tsconfigPath,
    },
  },
}
