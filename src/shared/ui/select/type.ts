export interface SelectOption {
  id: string
  label: string
}

export type SelectValue = string | string[] | null

export interface SelectProps {
  options: SelectOption[]
  value: SelectValue
  onChange: (value: SelectValue) => void
  multiple?: boolean
  searchable?: boolean
  placeholder?: string
  disabled?: boolean
  extraClass?: string
  emptyText?: string
  error?: string
  label?: string
}