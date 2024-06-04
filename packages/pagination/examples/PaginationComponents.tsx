import * as React from 'react'
import {
  Button,
  Pagination,
  PaginationPageButtonProps,
  PaginationOverflowButtonProps,
  PaginationNavigationButtonProps,
  PaginationSelectedIndicatorProps,
} from '@v-uik/base'

const PageButton: React.FC<PaginationPageButtonProps> = ({
  isSelected,
  size,
  children,
  disabled,
  indicator,
  onPageChange,
}) => {
  return (
    <Button
      style={{
        minWidth: 40,
        padding: 7,
        pointerEvents: isSelected ? 'none' : 'all',
      }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      onClick={() => onPageChange?.()}
    >
      {children}
      {isSelected ? indicator : null}
    </Button>
  )
}

const FirstPageButton: React.FC<PaginationNavigationButtonProps> = ({
  disabled,
  size,
  onPageChange,
}) => {
  return (
    <Button
      style={{ minWidth: 40, padding: 7 }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      onClick={() => onPageChange?.()}
    >
      ¦←
    </Button>
  )
}

const LastPageButton: React.FC<PaginationNavigationButtonProps> = ({
  disabled,
  size,
  onPageChange,
}) => {
  return (
    <Button
      style={{ minWidth: 40, padding: 7 }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      onClick={() => onPageChange?.()}
    >
      →¦
    </Button>
  )
}

const PreviousPageButton: React.FC<PaginationNavigationButtonProps> = ({
  disabled,
  size,
  onPageChange,
}) => {
  return (
    <Button
      style={{ minWidth: 40, padding: 7 }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      onClick={() => onPageChange?.()}
    >
      ←
    </Button>
  )
}

const NextPageButton: React.FC<PaginationNavigationButtonProps> = ({
  disabled,
  size,
  onPageChange,
}) => {
  return (
    <Button
      style={{ minWidth: 40, padding: 7 }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      onClick={() => onPageChange?.()}
    >
      →
    </Button>
  )
}

const OverflowButton: React.FC<PaginationOverflowButtonProps> = ({
  disabled,
  size,
}) => {
  return (
    <Button
      style={{ minWidth: 40, padding: 7, pointerEvents: 'none' }}
      disabled={disabled}
      size={size}
      color="primary"
      kind="ghost"
      tabIndex={-1}
    >
      …
    </Button>
  )
}

const SelectedIndicator: React.FC<PaginationSelectedIndicatorProps> = ({
  className,
}) => {
  return (
    <span className={className} style={{ height: 'auto', background: 'none' }}>
      −
    </span>
  )
}

export const PaginationComponents: React.FC = () => {
  return (
    <Pagination
      showNavigationFirst
      showNavigationLast
      components={{
        FirstPageButton,
        LastPageButton,
        NextPageButton,
        OverflowButton,
        PageButton,
        PreviousPageButton,
        SelectedIndicator,
      }}
      totalPageCount={10}
    />
  )
}
