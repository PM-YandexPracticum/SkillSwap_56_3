import { ReactNode } from 'react'

export interface PopoverProps {
  isOpen: boolean
  isOpenChange: (open: boolean) => void
  trigger: ReactNode
  children?: ReactNode
  className?: string
}
