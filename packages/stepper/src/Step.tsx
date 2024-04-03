'use client'

import * as React from 'react'
import { clsx, createUseStyles } from '@v-uik/theme'
import { useClassList, useButtonReset } from '@v-uik/hooks'
import { Direction } from '@v-uik/common'
import { StepperContext } from './StepperContext'
import { NumberIconCompleted } from './assets/NumberIconCompleted'
import { CompletedBadgeIcon } from './assets/CompletedBadgeIcon'
import { ErrorIcon } from './assets/ErrorIcon'
import { StepClasses } from './interfaces'

const useStyles = createUseStyles((theme) => ({
  root: {
    flex: 1,
    padding: 8,
    alignItems: 'flex-start',

    borderTopLeftRadius: theme.comp.step.shapeBorderRadiusTopLeft,
    borderTopRightRadius: theme.comp.step.shapeBorderRadiusTopRight,
    borderBottomLeftRadius: theme.comp.step.shapeBorderRadiusBottomLeft,
    borderBottomRightRadius: theme.comp.step.shapeBorderRadiusBottomRight,

    // TODO Вынести общие стили из Button и переиспользовать
    display: 'inline-flex',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',

    color: theme.comp.step.colorText,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.step.colorShadowFocus}`,
    },

    '&:hover': {
      color: theme.comp.step.colorTextHover,
      backgroundColor: theme.comp.step.colorBackgroundHover,
    },

    '&:active': {
      color: theme.comp.step.colorTextActive,
      backgroundColor: theme.comp.step.colorBackgroundActive,
    },

    '&:disabled': {
      pointerEvents: 'none',
      color: theme.comp.step.colorTextDisabled,
    },

    '&:last-child': {
      flex: '0 1 auto',

      '& $connector': {
        display: 'none',
      },
    },
  },

  vertical: {
    '& $connector': {
      flex: '0 0 2px',
      height: 'auto',
      minHeight: 32,
      minWidth: 2,
      margin: '8px 11px 0',
    },

    '& $description': {
      marginLeft: 8,
    },

    '&:last-child': {
      '& $description': {
        marginLeft: 32,
      },
    },
  },

  active: {
    pointerEvents: 'none',

    '& $iconContainer': {
      color: theme.comp.step.iconColorTextCurrent,
    },

    '& $iconNumber': {
      backgroundColor: theme.comp.step.iconColorTextCurrent,
      borderColor: theme.comp.step.iconColorTextCurrent,
      color: theme.comp.step.iconNumberColorTextCurrent,
    },
  },

  completed: {
    '& $iconContainer': {
      color: theme.comp.step.iconColorTextCompleted,
      borderColor: theme.comp.step.iconColorTextCompleted,
    },

    '& $iconNumber': {
      borderWidth: 0,
    },

    '& $connector': {
      backgroundColor: theme.comp.step.connectorColorBackgroundCompleted,
    },

    '&:hover': {
      '& $iconNumber': {
        borderWidth: 2,
      },

      '& $iconContainer': {
        color: theme.comp.step.iconColorTextCompletedHover,
        borderColor: theme.comp.step.iconColorTextCompletedHover,
      },

      '& $connector': {
        backgroundColor: theme.comp.step.connectorColorBackgroundCompletedHover,
      },
    },

    '&:hover:active': {
      '& $iconContainer': {
        color: theme.comp.step.iconColorTextCompletedActive,
        borderColor: theme.comp.step.iconColorTextCompletedActive,
      },

      '& $connector': {
        backgroundColor:
          theme.comp.step.connectorColorBackgroundCompletedActive,
      },
    },
  },

  // TODO Переиспользоват error из Button.
  error: {
    color: theme.comp.step.colorTextError,

    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${theme.comp.step.colorShadowFocus}`,
    },

    '&:active': {
      color: theme.comp.step.colorTextErrorActive,
      backgroundColor: theme.comp.step.colorBackgroundErrorActive,
    },

    '&:disabled': {
      color: theme.comp.step.colorTextErrorDisabled,
    },

    '& $iconContainer': {
      borderColor: theme.comp.step.iconColorTextError,
      color: theme.comp.step.iconColorTextError,
    },

    '& $iconNumber': {
      borderWidth: 0,
    },

    '& $label': {
      color: theme.comp.step.labelColorTextError,
    },

    '& $badge': {
      borderRadius: '50%',
      backgroundColor: theme.comp.step.badgeColorBackgroundError,
    },

    '& $connector': {
      backgroundColor: theme.comp.step.connectorColorBackgroundError,
    },

    '&:hover': {
      color: theme.comp.step.colorTextErrorHover,
      backgroundColor: theme.comp.step.colorBackgroundErrorHover,

      '& $iconContainer': {
        borderColor: theme.comp.step.iconColorTextErrorHover,
        color: theme.comp.step.iconColorTextErrorHover,
      },

      '& $iconNumber': {
        borderWidth: 2,
      },

      '& $label': {
        color: theme.comp.step.labelColorTextErrorHover,
      },

      '& $badge': {
        backgroundColor: theme.comp.step.badgeColorBackgroundErrorHover,
      },

      '& $connector': {
        backgroundColor: theme.comp.step.connectorColorBackgroundErrorHover,
      },
    },

    '&:hover:active': {
      '& $iconContainer': {
        borderColor: theme.comp.step.iconColorTextErrorActive,
        color: theme.comp.step.iconColorTextErrorActive,
      },

      '& $label': {
        color: theme.comp.step.labelColorTextErrorActive,
      },

      '& $badge': {
        backgroundColor: theme.comp.step.badgeColorBackgroundErrorActive,
      },

      '& $connector': {
        backgroundColor: theme.comp.step.connectorColorBackgroundErrorActive,
      },
    },
  },

  buttonText: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',

    fontFamily: theme.comp.step.iconNumberTypographyFontFamily,
    fontSize: theme.comp.step.iconNumberTypographyFontSize,
    lineHeight: theme.comp.step.iconNumberTypographyLineHeight,
    letterSpacing: theme.comp.step.iconNumberTypographyLetterSpacing,
    fontWeight: theme.comp.step.iconNumberTypographyFontWeight,
  },

  labelContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
  },

  iconContainer: {
    position: 'relative',
    boxSizing: 'border-box',
    flex: '0 0 24px',
    height: 24,
    marginRight: 8,
    color: theme.comp.step.iconColorText,
  },

  iconNumber: {
    lineHeight: '20px',
    borderRadius: '50%',
    border: `2px solid ${theme.comp.step.iconColorText}`,
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 8,
    height: 8,
    display: 'flex',
  },

  label: {
    marginRight: 8,
    color: theme.comp.step.labelColorText,
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    fontFamily: theme.comp.step.labelTypographyFontFamily,
    fontSize: theme.comp.step.labelTypographyFontSize,
    lineHeight: theme.comp.step.labelTypographyLineHeight,
    letterSpacing: theme.comp.step.labelTypographyLetterSpacing,
    fontWeight: theme.comp.step.labelTypographyFontWeight,
  },

  connector: {
    flex: 1,
    height: 2,
    minWidth: 16,
    marginTop: 11,
    borderRadius: 2,
    backgroundColor: theme.comp.step.connectorColorBackground,
  },

  descriptionContainer: {
    display: 'flex',
    alignItems: 'stretch',
  },

  description: {
    color: theme.comp.step.descriptionColorText,
    marginLeft: 32,
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    fontFamily: theme.comp.step.descriptionTypographyFontFamily,
    fontSize: theme.comp.step.descriptionTypographyFontSize,
    lineHeight: theme.comp.step.descriptionTypographyLineHeight,
    letterSpacing: theme.comp.step.descriptionTypographyLetterSpacing,
    fontWeight: theme.comp.step.descriptionTypographyFontWeight,
  },

  clickable: {
    '&:disabled': {
      '& $iconContainer': {
        color: theme.comp.step.iconColorTextDisabled,
      },

      '& $iconNumber': {
        borderColor: theme.comp.step.iconColorTextDisabled,
      },

      '&$active': {
        '& $iconContainer': {
          color: theme.comp.step.iconColorTextDisabled,
        },

        '& $iconNumber': {
          backgroundColor: theme.comp.step.iconColorTextDisabled,
          borderColor: 'transparent',
          color: theme.comp.step.iconNumberColorTextCurrent,
        },
      },

      '&$completed': {
        '& $iconContainer': {
          color: theme.comp.step.iconColorTextDisabled,
        },
      },

      '& $badge': {
        backgroundColor: theme.comp.step.badgeColorBackgroundDisabled,
      },

      '&:not($completed)': {
        '& $badge': {
          backgroundColor: theme.comp.step.badgeColorBackgroundDisabled,
        },
      },

      '& $connector': {
        backgroundColor: theme.comp.step.connectorColorBackgroundDisabled,
      },

      '& $label': {
        color: theme.comp.step.labelColorTextDisabled,
      },

      '& $description': {
        color: theme.comp.step.descriptionColorTextDisabled,
      },
    },
  },
}))

export interface StepProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * JSS-классы для стилизации
   */
  classes?: Partial<StepClasses>
  /**
   * Индекс шага (нумерация с 0)
   */
  index: number
  /**
   * Индекс шага для отображения (в случае несовпадения с основным индексом)
   */
  indexToShow?: number
  /**
   * Дополнительный текст описания шага
   */
  description?: React.ReactNode
  /**
   * Шаг выбран
   */
  active?: boolean
  /**
   * Шаг завершен
   */
  completed?: boolean
  /**
   * Шаг заблокирован
   */
  disabled?: boolean
  /**
   * Шаг содержит ошибку
   */
  error?: boolean
  /**
   * Иконка, отображаемая в обычном состоянии
   */
  icon?: React.ReactNode
  /**
   * Иконка, отображаемая в текущам шаге
   */
  activeIcon?: React.ReactNode
  /**
   * Иконка, отображаемая в завершенном шаге
   */
  completedIcon?: React.ReactNode
  /**
   * Отображать бейдж иконки (в состоянии completed и error)
   */
  showIconBadge?: boolean
}

export const Step = React.forwardRef(
  (
    {
      classes,
      className: classNameProp,
      index,
      indexToShow,
      description,
      active: activeProp,
      completed: completedProp,
      disabled: disabledProp,
      error: errorProp,
      icon: iconProp,
      activeIcon,
      completedIcon,
      showIconBadge = true,
      onClick,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      children,
      ...rest
    }: StepProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const { activeStep, direction, clickable, onChange } =
      React.useContext(StepperContext)

    const buttonResetClasses = useButtonReset()

    const [isHovered, setIsHovered] = React.useState(false)

    const isVertical = direction === Direction.vertical

    let active = activeProp || false
    let completed = completedProp || false
    let error = errorProp || false
    const disabled = disabledProp !== undefined ? disabledProp : !clickable

    if (activeStep === index) {
      active = activeProp !== undefined ? activeProp : true
    } else if (!clickable && activeStep > index) {
      completed = completedProp !== undefined ? completedProp : true
    }

    if (active) {
      error = false
    }

    if (active || error) {
      completed = false
    }

    const icon =
      (completed && completedIcon) || (active && activeIcon) || iconProp
    const showBadge =
      showIconBadge && ((completed && !completedIcon) || error) && iconProp

    const classesList = useStyles()
    const classesMap = useClassList(classesList, classes)

    const className = clsx(
      classNameProp,
      buttonResetClasses.resetButton,
      classesMap.root,
      {
        [classesMap.vertical]: isVertical,
        [classesMap.active]: active,
        [classesMap.completed]: completed,
        [classesMap.error]: error,
        [classesMap.clickable]: clickable,
      }
    )

    const iconContainerClassName = clsx(classesMap.iconContainer, {
      [classesMap.iconNumber]: !icon,
    })

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event)
      if (clickable) {
        onChange?.(index)
      }
    }

    const onMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseEnterProp?.(event)
      setIsHovered(true)
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      onMouseLeaveProp?.(event)
      setIsHovered(false)
    }

    const iconContainerContent = React.useMemo(() => {
      if (icon) {
        return icon
      }

      if (error && !isHovered) {
        return <ErrorIcon />
      }

      if (completed && !isHovered) {
        return <NumberIconCompleted />
      }

      return indexToShow || index + 1
    }, [icon, error, isHovered, completed, indexToShow, index])

    const badgeContent = showBadge && completed ? <CompletedBadgeIcon /> : null

    const shouldDetectHover = clickable && (active || completed || error)

    return (
      <button
        {...rest}
        ref={ref}
        className={className}
        disabled={disabled}
        type="button"
        onClick={handleClick}
        onMouseEnter={shouldDetectHover ? onMouseEnter : onMouseEnterProp}
        onMouseLeave={shouldDetectHover ? onMouseLeave : onMouseLeaveProp}
      >
        <span className={classesMap.buttonText}>
          <span className={classesMap.labelContainer}>
            <span className={iconContainerClassName}>
              {iconContainerContent}

              {showBadge && (
                <span className={classesMap.badge}>{badgeContent}</span>
              )}
            </span>

            {children && <span className={classesMap.label}>{children}</span>}

            {!isVertical && <span className={classesMap.connector} />}
          </span>

          <span className={classesMap.descriptionContainer}>
            {isVertical && <span className={classesMap.connector} />}

            <span className={classesMap.description}>{description}</span>
          </span>
        </span>
      </button>
    )
  }
)
