import React, { ReactElement } from 'react'
import { ComponentType, FC } from 'react'
import { TokensRouterContext } from '../TokensRouterContext'
import { navigate } from '../../../../internal'
import { EnvService } from 'services'

const routerStateName = 'token-levels'

/**
 * HOC, который добавляет к компоненту роутинг по токенам через hash
 *
 */
export function withTokenRouter<TProps extends JSX.IntrinsicAttributes>(
  Component: ComponentType<TProps>
): FC<TProps> {
  return (props: TProps): ReactElement => {
    const _window: Window | -1 = React.useMemo(() => {
      return getWindow()
    }, [])

    if (isMock(_window)) {
      const errorMessage =
        'роутинг по токенам работает не в полном режиме, для решения данной проблемы запустите приложение через локальный сервер!'
      console.error(`Warning: ${errorMessage}`)
    }

    /**
     * текущее состояние location, указанное через массив уровней токенов
     */
    const [locationLevels, setLocationLevels] = React.useState<string[]>(() =>
      isMock(_window)
        ? []
        : removeLocationHash(_window.location.hash).split('.')
    )

    /**
     * добавляет уровень токена в текущую локацию
     *
     * @param tokenLevel - добавляемый уровень
     * @param depth - глубина добавляемого уровня токена
     */
    const pushTokenLevel = React.useCallback(
      (tokenLevel: string, depth: number): void => {
        setLocationLevels((prevLocationLevels) => {
          const newLocationLevels = prevLocationLevels.slice(0, depth)
          newLocationLevels[depth] = tokenLevel

          _pushTokenLevels(newLocationLevels)

          return newLocationLevels
        })
      },
      []
    )

    /**
     * добавляет целый путь токена в текущую локацию
     *
     * @param token - добавляемый токен
     */
    const pushToken = React.useCallback((token: string): void => {
      const locationLevels = token.split('.')
      _pushTokenLevels(locationLevels)

      setLocationLevels(locationLevels)
    }, [])

    /**
     * добавляет новое состояние локации в историю браузера и меняет location браузера
     */
    const _pushTokenLevels = React.useCallback(
      (newLocationLevels: string[]) => {
        const hash = getHash(newLocationLevels.join('.'))

        if (isMock(_window)) {
          const path = '?path=/story/книга-рецептов-токены--page'
          const href = path + hash

          navigate(href)
        } else {
          const href = getHref(_window.location, hash)

          _window.history.pushState(
            { name: routerStateName, levels: newLocationLevels },
            href,
            href
          )
        }
      },
      []
    )

    React.useEffect(() => {
      /**
       * обработка кнопки "Назад" в браузере
       */
      const onPopState = (e: PopStateEvent) => {
        if (isMock(_window)) {
          throw new Error('Window must be defined!')
        }

        // фиксит вызов popstate со state = null при переходе по токену через Enter
        if (!e.state) {
          setLocationLevels(
            removeLocationHash(_window.location.hash).split('.')
          )

          return
        }

        if ('name' in e.state && e.state.name === routerStateName) {
          setLocationLevels(e.state.levels)
        } else {
          setLocationLevels([])
        }
      }

      !isMock(_window) && _window.addEventListener('popstate', onPopState)

      return !isMock(_window)
        ? () => _window.removeEventListener('popstate', onPopState)
        : undefined
    }, [])

    return (
      <TokensRouterContext.Provider
        value={{ locationLevels, pushToken, pushTokenLevel }}
      >
        <Component {...props} />
      </TokensRouterContext.Provider>
    )
  }
}

function isMock(window: Window | -1): window is -1 {
  return window === -1
}

function removeLocationHash(v: string) {
  return v.replace('#', '')
}

function getHash(token: string): string {
  return '#' + token
}

function getHref(location: Location, hash: string): string {
  const origin = location.origin
  const pathname = location.pathname
  const search = location.search

  return origin + pathname + search + hash
}

function getWindow(): Window | -1 {
  if (!EnvService.isDist) {
    return window.parent
  }

  return -1
}
