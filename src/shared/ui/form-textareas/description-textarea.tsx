import { Textarea } from '../textarea'
import type { EditableTextareaProps } from './type'

export function DescriptionTextarea({
  label = 'Описание',
  placeholder = 'Коротко опишите, чему можете научить',
  ...props
}: EditableTextareaProps) {
  return <Textarea {...props} label={label} placeholder={placeholder} />
}
