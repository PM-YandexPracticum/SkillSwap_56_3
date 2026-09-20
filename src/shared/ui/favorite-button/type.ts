export interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
  extraClass?: string;
}