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
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/mock/fileMock.js',
  },
  globals: {
    'ts-jest': {
      tsconfig: tsconfigPath,
    },
  },
}
