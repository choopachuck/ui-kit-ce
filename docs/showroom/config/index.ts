export * from './createStory'
export * from './DocsAlert'

/**
 * Cookbook
 */
export const COOKBOOK = {
  root: 'Книга рецептов',

  // stories
  migrate: 'Миграция с 5 версии на 6',
  browsersSupport: 'Поддержка браузеров',
  stylization: 'Стилизация',
  formInteraction: 'Интеграция с библиотеками форм',
  tokens: 'Токены',
  nextjs: 'Использование в NextJS',
}

/**
 * Hooks
 */
export const HOOKS = {
  root: 'Hooks',

  // stories
  usePopper: 'usePopper',
  useResetCss: 'useResetCss',
}

/**
 * Components
 */
export const COMPONENTS = {
  newApp: 'Начало работы',
  controls: 'Элементы управления',
  dataDisplay: 'Отображение данных',
  inputFields: 'Поля ввода',
  feedback: 'Обратная связь',
  navigation: 'Навигация',
  utility: 'Вспомогательные компоненты',
}

/**
 * Формирует структуру заголовка для story
 *
 * @example
 *
 * <Meta title={createTitle([sectionName, storyTitle])} />
 *
 * @param val массив заголовков
 */
export const createTitle = (val: string[]): string => val.join('/')
