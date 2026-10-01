export interface AvatarProps {
  src?: string
  alt?: string
  size?: number
  onChange?: (url: string) => void
  extraclass?: string
}