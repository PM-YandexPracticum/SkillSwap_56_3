export type IconsBlockProps = {
  onFavoriteChange: (isFavorite: boolean) => void
  isFavorite: boolean
  onShare?: () => void
  onMoreClick?: () => void
}
