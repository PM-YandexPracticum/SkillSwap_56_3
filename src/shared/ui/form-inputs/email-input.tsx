import { EditableInput } from './editable-input'
import type { FieldProps } from './type'

export function EmailInput({
  label = 'Email',
  placeholder = 'Введите email',
  ...props
}: FieldProps) {
  return <EditableInput {...props} type="email" label={label} placeholder={placeholder} />
}
