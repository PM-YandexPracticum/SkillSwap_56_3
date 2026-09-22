import type { MouseEvent } from 'react'

export type ExpandListButtonProps = {
  label: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  expandedLabel?: string
  expanded?: boolean
  extraClass?: string
}