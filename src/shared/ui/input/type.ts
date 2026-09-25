import type { ComponentProps, ReactNode } from 'react'

export type InputProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  type?: InputType
  label?: string
  error?: string
  rightSlot?: ReactNode
}

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
