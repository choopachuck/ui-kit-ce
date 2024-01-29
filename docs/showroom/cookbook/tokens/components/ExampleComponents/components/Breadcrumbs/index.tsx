import React from 'react'
import { Breadcrumbs as DefaultBreadcrumbs, Link } from '@v-uik/base'

export const Breadcrumbs: React.FC = () => {
  return (
    <DefaultBreadcrumbs aria-label="Навигация">
      <Link href="#">Breadcrumb</Link>
      <Link href="#">Breadcrumb</Link>
      <Link disabled href="#">
        Breadcrumb disabled
      </Link>
      <span>Breadcrumb</span>
    </DefaultBreadcrumbs>
  )
}
