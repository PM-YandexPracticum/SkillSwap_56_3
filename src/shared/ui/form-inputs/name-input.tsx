import { EditableInput } from './editable-input'
import type { FieldProps } from './type'

export function NameInput({
  label = 'Имя',
  placeholder = 'Введите ваше имя',
  ...props
}: FieldProps) {
  return <EditableInput {...props} type="text" label={label} placeholder={placeholder} />
}
