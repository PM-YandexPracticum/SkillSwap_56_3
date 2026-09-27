import { EditableTextarea } from './editable-textarea'
import type { EditableTextareaProps } from './type'

export function AboutTextarea({
  label = 'О себе',
  placeholder = 'Расскажите немного о себе',
  ...props
}: EditableTextareaProps) {
  return <EditableTextarea {...props} label={label} placeholder={placeholder} />
}
