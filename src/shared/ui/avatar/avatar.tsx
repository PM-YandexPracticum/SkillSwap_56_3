import { useRef, useState, type ChangeEvent } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import type { AvatarProps } from './type'
import styles from './avatar.module.css'

export const Avatar = ({
  src,
  alt = 'Аватар пользователя',
  size = 160,
  onChange,
  extraclass = '',
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showFallback = !src || hasError
  const buttonSize = Math.round(size * 0.25)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const dataUrl = reader.result as string
      onChange?.(dataUrl)
    }

    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <div
      className={`${styles.wrapper} ${extraclass}`.trim()}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

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
        onClick={() => inputRef.current?.click()}
        aria-label="Изменить фотографию"
      >
        <Icon name="edit-image" size={buttonSize} />
      </button>
    </div>
  )
}