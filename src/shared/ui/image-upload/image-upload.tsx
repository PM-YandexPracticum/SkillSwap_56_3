import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { Icon } from '../icon'
import type { ImageUploadProps } from './type'
import style from './image-upload.module.css'

export const ImageUpload = ({
  value,
  onChange,
  className,
  disabled = false,
  multiple = true,
  accept = 'image/*',
}: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const rootClassName = [style.root, className].filter(Boolean).join(' ')
  const dropzoneClassName = [style.dropzone, isDragging && style.dropzoneDragging]
    .filter(Boolean)
    .join(' ')

  const isImageFile = (file: File) => file.type.startsWith('image/')

  const addFiles = (files: File[]) => {
    const imageFiles = files.filter(isImageFile)
    if (imageFiles.length === 0) return

    const filesToAdd = multiple ? imageFiles : imageFiles.slice(0, 1)
    const nextUrls = filesToAdd.map((file) => URL.createObjectURL(file))
    const nextValue = multiple ? [...value, ...nextUrls] : nextUrls

    onChange(nextValue)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  const handleChooseImages = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (!disabled) addFiles(Array.from(event.dataTransfer.files))
  }

  const handleRemoveImage = (urlToRemove: string) => {
    // Освобождаем blob-URL
    if (urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove)
    }
    onChange(value.filter((url) => url !== urlToRemove))
  }

  return (
    <div className={rootClassName}>
      <input
        ref={inputRef}
        className={style.input}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
      />

      <button
        className={dropzoneClassName}
        type="button"
        disabled={disabled}
        onClick={handleChooseImages}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <span className={style.dropzoneText}>
          Перетащите или выберите изображения навыка
        </span>

        <span className={style.chooseImages}>
          <Icon name="image-placeholder" size={28} />
          Выбрать изображения
        </span>
      </button>

      {value.length > 0 && (
        <ul className={style.previewList}>
          {value.map((url) => (
            <li key={url} className={style.previewItem}>
              <img
                className={style.previewImage}
                src={url}
                alt="Изображение навыка"
              />

              <button
                className={style.removeButton}
                type="button"
                aria-label="Удалить изображение"
                onClick={() => handleRemoveImage(url)}
              >
                <Icon name="cross" size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
