import type { MouseEvent } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import type { FavoriteButtonProps } from './type'
import styles from './favorite-button.module.css'

export const FavoriteButton = ({
  isFavorite,
  onToggle,
  count,
  disabled = false,
  extraclass = '',
}: FavoriteButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!disabled) {
      onToggle(!isFavorite);
    }
  };

  const iconName = isFavorite ? 'heart-filled' : 'heart';
  const buttonClassName = `${styles.button} ${isFavorite ? styles.active : ''} ${extraclass}`.trim();

  return (
    <div className={styles.wrapper}>
      {<span className={styles.count}>{count}</span>}
      
      <button
        type="button"
        disabled={disabled}
        onClick={handleClick}
        className={buttonClassName}
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        aria-pressed={isFavorite}
      >
        <Icon name={iconName} size={24} />
      </button>
    </div>
  )
}