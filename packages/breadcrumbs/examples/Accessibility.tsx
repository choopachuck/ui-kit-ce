import * as React from 'react'
import { Breadcrumbs, Link } from '@v-uik/base'

export const Accessibility = (): React.ReactElement => {
  return (
    <Breadcrumbs aria-label="Навигация">
      <Link href="#">Breadcrumb 1</Link>
      <Link href="#">Breadcrumb 2</Link>
      <span aria-current="page">Breadcrumb 3</span>
    </Breadcrumbs>
  )
}
