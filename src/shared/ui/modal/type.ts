import type { ReactNode } from 'react'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  width?: number | string
  height?: number | string
  className?: string
}
