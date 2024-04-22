/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: отключено для того, чтобы значения по умолчанию отобразились в storybook

import * as React from 'react'
import { UsePaginationProps } from '../src'

export const PaginationHookPropsApiDummy: React.FC<UsePaginationProps> = ({
  boundaryPageCount = 0,
  nearPageCount = 1,
  totalPageCount = 1,
}) => null
