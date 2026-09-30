export interface AvatarProps {
  src?: string | null
  alt?: string
  size?: number
  onEditClick?: () => void
  extraClass?: string
  onChange: (file: File) => void
}