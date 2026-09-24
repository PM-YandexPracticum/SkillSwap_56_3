import { useState, useRef, useEffect, type ChangeEvent } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import type { AvatarUploadProps } from './type'
import styles from './avatar-upload.module.css'

export const AvatarUpload = ({
  value,
  onChange,
  size = 72,
  extraClass = '',
}: AvatarUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value !== undefined) {
      setPreviewUrl(value)
    }
  }, [value])

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleContainerClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    onChange?.(file)
    e.target.value = ''
  }

  const badgeSize = Math.max(16, Math.round(size * 0.25))

  return (
    <div
      className={`${styles.container} ${extraClass}`.trim()}
      style={{ width: `${size}px`, height: `${size}px` }}
      onClick={handleContainerClick}
      role="button"
      tabIndex={0}
      aria-label="Загрузить фотографию профиля"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleContainerClick()
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Фото профиля"
          className={styles.preview}
        />
      ) : (
        <div className={styles.placeholder}>
          <Icon name="avatar-placeholder" size={size} />
        </div>
      )}

      <div
        className={styles.badge}
        style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
      >
        <Icon name="plus" size={badgeSize} />
      </div>
    </div>
  )
}