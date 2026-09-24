export interface AvatarUploadProps {
  value?: string | null
  onChange?: (file: File) => void
  size?: number
  extraClass?: string
}