export interface ImageUploadProps {
  value: string[]                       // ← blob-URL, не File[]
  onChange: (urls: string[]) => void    // ← отдаём массив URL
  className?: string
  disabled?: boolean
  multiple?: boolean
  accept?: string
}