import { useState } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import type { AvatarProps } from './type'
import styles from './avatar.module.css'

export const Avatar = ({
  src,
  alt = 'Аватар пользователя',
  size = 160,
  onEditClick,
  extraClass = '',
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false)

  const showFallback = !src || hasError

  const buttonSize = Math.round(size * 0.25)

  const handleEditClick = () => {
    onEditClick?.()
  }

  return (
    <div
      className={`${styles.wrapper} ${extraClass}`.trim()}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {showFallback ? (
        <div className={styles.fallback} aria-label={alt}>
          <Icon name="image-placeholder" size={Math.round(size * 0.4)} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={styles.avatar}
          onError={() => setHasError(true)}
        />
      )}

      <button
        type="button"
        className={styles.editButton}
        style={{ width: `${buttonSize}px`, height: `${buttonSize}px` }}
        onClick={handleEditClick}
        aria-label="Изменить фотографию"
      >
        <Icon name="edit-image" size={buttonSize} />
      </button>
    </div>
  )
}