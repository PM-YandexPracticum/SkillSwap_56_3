export interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: (value: boolean) => void;
  count?: number;
  disabled?: boolean;
  extraClass?: string;
}