'use client'

import * as React from 'react'
import { CommonProps, TruncateProps } from './interfaces'
import { PolymorphicTag } from './PolymorphicTag'

export type TagProps = CommonProps & TruncateProps

export const Tag = React.forwardRef(
  ({ ...rest }: TagProps, ref: React.Ref<HTMLButtonElement>) => {
    return <PolymorphicTag as="button" {...rest} ref={ref} />
  }
)
