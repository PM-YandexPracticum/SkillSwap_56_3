import type { MouseEvent } from 'react'

export type ShowAllButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  label?: string
  expandedLabel?: string
  expanded?: boolean
  extraclass?: string
}