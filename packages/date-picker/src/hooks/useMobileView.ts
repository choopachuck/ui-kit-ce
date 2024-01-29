import * as React from 'react'
import { MOBILE_MEDIA_QUERY } from '../constants/range'

export const useMobileView = (): boolean => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(MOBILE_MEDIA_QUERY)
    if (isMobile !== mediaQueryList.matches) {
      setIsMobile(mediaQueryList.matches)
    }

    const handleChange = () => {
      setIsMobile(mediaQueryList.matches)
    }

    mediaQueryList.addListener(handleChange)

    return () => {
      mediaQueryList.removeListener(handleChange)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isMobile
}
