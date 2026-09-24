import type { ComponentProps } from 'react'

export interface SelectOption {
  id: string
  label: string
}

export type SelectValue = string | string[] | null

export type SelectProps = Omit<
  ComponentProps<'div'>,
  'onChange' | 'defaultValue'
> & {
  options: SelectOption[]
  value: SelectValue
  onChange: (value: SelectValue) => void
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  emptyText?: string
  error?: string
  label?: string
}