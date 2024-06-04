import React, { FC } from 'react'
import { AccordionIcon as AccordionIconAsset } from './assets/AccordionIcon'
import { AccordionItemProps } from '../AccordionItem'

export type AccordionIconProps = Omit<AccordionItemProps, 'components'>

export const AccordionIcon: FC<AccordionIconProps> = ({ classes }) => {
  return <AccordionIconAsset className={classes?.headerIcon} />
}
