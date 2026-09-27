import type { ReactNode } from 'react'
import type { InputProps } from '@/shared/ui/input/type'

export interface EditableInputProps extends Omit<InputProps, 'rightSlot'> {
  icon?: ReactNode
}

export type FieldProps = Omit<EditableInputProps, 'type'>
