export type ImageUploadProps = {
  value: File[]
  onChange: (files: File[]) => void
  className?: string
  disabled?: boolean
  multiple?: boolean
  accept?: string
}

export type ImagePreview = {
  id: string
  file: File
  previewUrl: string
}
