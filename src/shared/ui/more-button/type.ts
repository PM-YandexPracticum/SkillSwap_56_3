import type { MouseEvent } from 'react'

export type MoreButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  hasExchange?: boolean
}