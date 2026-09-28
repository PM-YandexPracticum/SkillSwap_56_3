import { EditableInput } from './editable-input'
import type { FieldProps } from './type'

export function SkillNameInput({
  label = 'Название навыка',
  placeholder = 'Введите название вашего навыка',
  ...props
}: FieldProps) {
  return <EditableInput {...props} type="text" label={label} placeholder={placeholder} />
}
