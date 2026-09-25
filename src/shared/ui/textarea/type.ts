import type { ComponentProps, ReactNode } from 'react'

export type TextareaProps = Omit<ComponentProps<'textarea'>, 'children'> & {
  label?: string
  rightSlot?: ReactNode
}