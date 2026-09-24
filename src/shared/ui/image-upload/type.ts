export type ImageUploadProps = {
  value: File[]
  onChange: (files: File[]) => void
  className?: string
  disabled?: boolean
  multiple?: boolean
  accept?: string
}
