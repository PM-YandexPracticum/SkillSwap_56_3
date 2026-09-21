export type CheckOptionProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  type?: 'checkbox' | 'radio'
  name?: string
  value?: string
  indeterminate?: boolean
  disabled?: boolean
  extraClass?: string
}
