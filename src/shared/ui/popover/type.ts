import { ReactNode } from 'react'

export interface PanelProps {
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}

export interface PopoverProps {
  panel: PanelProps
  trigger: ReactNode
  children?: ReactNode
  className?: string
}
