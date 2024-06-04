import { AccordionIcon, AccordionIconProps } from './AccordionIcon'

export type { AccordionIconProps }

export type AccordionComponents = {
  Icon: React.ComponentType<AccordionIconProps>
}

export type AccordionComponentsConfig = Partial<AccordionComponents>

export const defaultAccordionComponents = {
  Icon: AccordionIcon,
}

export type AccordionComponentsGeneric = typeof defaultAccordionComponents

export const getComponents = (
  componentProp?: AccordionComponentsConfig | undefined
): AccordionComponentsGeneric =>
  ({
    ...defaultAccordionComponents,
    ...componentProp,
  } as AccordionComponentsGeneric)
