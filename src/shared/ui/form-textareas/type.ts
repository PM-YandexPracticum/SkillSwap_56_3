import type { ReactNode } from 'react'
import type { TextareaProps } from '@/shared/ui/textarea/type'

export interface EditableTextareaProps extends Omit<TextareaProps, 'rightSlot'> {
  icon?: ReactNode
}
