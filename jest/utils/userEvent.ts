import testingLibraryUserEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/dom'

type UserEventType = typeof testingLibraryUserEvent & {
  /**
   * Функция для ввода символов в `MaskedInput`. Это альтернативный вариант
   * для функции `type`, но без рандомного перемещения selectedIndex
   */
  typeMasked: (
    ...args: Partial<Parameters<typeof userEvent.type>>
  ) => Promise<void>
}

const userEvent = testingLibraryUserEvent as UserEventType

userEvent.typeMasked = async (
  ...args: Partial<Parameters<typeof userEvent.type>>
): Promise<void> => {
  const [input, text = '', options = {}] = args

  if (!(input instanceof HTMLInputElement)) {
    return
  }

  const textFlip = text.split('').reverse().join('')

  for (let i = 0; i < textFlip.length; i++) {
    input.setSelectionRange(0, 0)
    await waitFor(() => userEvent.keyboard(textFlip[i], options), {
      timeout: 5,
    })
  }
}

export { userEvent }
