import type { MouseEvent } from 'react'

export type AuthSocialButtonsProps = {
  onGoogleClick?: (e: MouseEvent<HTMLButtonElement>) => void
  onAppleClick?: (e: MouseEvent<HTMLButtonElement>) => void
  extraClass?: string
}