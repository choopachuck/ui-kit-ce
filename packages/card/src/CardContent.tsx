import * as React from 'react'
import { CardContentClasses } from './classes'

type CardContentProps = {
  /**
   * Контент для header
   */
  header?: React.ReactNode
  /**
   * Контент для footer
   */
  footer?: React.ReactNode
  /**
   * Контент для subtitle
   */
  subtitle?: React.ReactNode
  children?: React.ReactNode
  /**
   * CSS классы компонента CardContent
   */
  classes: CardContentClasses
}

export const CardContent: React.FC<CardContentProps> = ({
  header,
  subtitle,
  footer,
  children,
  classes,
}) => {
  return (
    <>
      {header && (
        <div className={classes.header}>
          {header && <div className={classes.headerText}>{header}</div>}
          {subtitle && <div className={classes.subtitleText}>{subtitle}</div>}
        </div>
      )}
      <div className={classes.body}>{children}</div>
      {footer && <div className={classes.footer}>{footer}</div>}
    </>
  )
}
