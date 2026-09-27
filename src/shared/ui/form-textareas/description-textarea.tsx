import { EditableTextarea } from './editable-textarea'
import type { EditableTextareaProps } from './type'

export function DescriptionTextarea({
  label = 'Описание',
  placeholder = 'Коротко опишите, чему можете научить',
  ...props
}: EditableTextareaProps) {
  return <EditableTextarea {...props} label={label} placeholder={placeholder} />
}
