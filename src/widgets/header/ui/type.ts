export type HeaderPanel = 'skills' | 'notifications' | 'profile'

export interface PanelProps {
  isOpen: boolean
  isOpenChange: (open: boolean) => void
}