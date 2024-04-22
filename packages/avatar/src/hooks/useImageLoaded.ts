'use client'

import React from 'react'
import type { ComponentPropsWithRefFix } from '@v-uik/common'

export type UseImageLoadedProps = ComponentPropsWithRefFix<'img'>

export type UseImageLoadedStatus = 'pending' | 'ready' | 'error' | 'skipped'

export const useImageLoaded = ({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
  onError,
}: UseImageLoadedProps): UseImageLoadedStatus => {
  const [imageStatus, setImageStatus] =
    React.useState<UseImageLoadedStatus>('pending')

  React.useEffect(() => {
    // Если у `img` указан кастомный обработчик ошибки во время загрузки изображения, то собственную проверку не выполняем
    if (onError) {
      setImageStatus('skipped')

      return
    }

    if (!src && !srcSet) {
      return
    }

    setImageStatus('pending')

    let active = true

    const image = new Image()

    image.onload = () => {
      if (!active) {
        return
      }
      setImageStatus('ready')
    }
    image.onerror = () => {
      if (!active) {
        return
      }
      setImageStatus('error')
    }
    if (crossOrigin) {
      image.crossOrigin = crossOrigin
    }
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy
    }
    if (srcSet) {
      image.srcset = srcSet
    }
    if (src) {
      image.src = src
    }

    return () => {
      active = false
    }
  }, [crossOrigin, referrerPolicy, src, srcSet, onError])

  return imageStatus
}
