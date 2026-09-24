import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { ImagePreview } from './type'
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
  const [previews, setPreviews] = useState<ImagePreview[]>([])

  const rootClassName = [style.root, className].filter(Boolean).join(' ')
  const dropzoneClassName = [style.dropzone, isDragging && style.dropzoneDragging]
    .filter(Boolean)
    .join(' ')

    let previewId = 0

  const isImageFile = (file: File) => file.type.startsWith('image/')

  const createImagePreview = (file: File): ImagePreview => {
    previewId += 1

    return {
      id: `${file.name}-${file.lastModified}-${previewId}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }
  }

  useEffect(() => {
    const currentFiles = new Set(value)

    setPreviews((currentPreviews) => {
      const removedPreviews = currentPreviews.filter(
        (preview) => !currentFiles.has(preview.file),
      )

      removedPreviews.forEach((preview) => {
        URL.revokeObjectURL(preview.previewUrl)
      })

      return currentPreviews.filter((preview) => currentFiles.has(preview.file))
    })
  }, [value])

  useEffect(() => {
    return () => {
      previews.forEach((preview) => {
        URL.revokeObjectURL(preview.previewUrl)
      })
    }
  }, [previews])

  const addFiles = (files: File[]) => {
    const imageFiles = files.filter(isImageFile)

    if (imageFiles.length === 0) {
      return
    }

    const filesToAdd = multiple ? imageFiles : imageFiles.slice(0, 1)

    setPreviews((currentPreviews) => {
      const nextPreviews = filesToAdd.map(createImagePreview)

      return multiple ? [...currentPreviews, ...nextPreviews] : nextPreviews
    })

    onChange(multiple ? [...value, ...filesToAdd] : filesToAdd)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  const handleChooseImages = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleDragOver = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsDragging(false)

    if (!disabled) {
      addFiles(Array.from(event.dataTransfer.files))
    }
  }

  const handleRemoveImage = (previewIdToRemove: string) => {
    const previewToRemove = previews.find(
      (preview) => preview.id === previewIdToRemove,
    )

    if (!previewToRemove) {
      return
    }

    URL.revokeObjectURL(previewToRemove.previewUrl)

    setPreviews((currentPreviews) =>
      currentPreviews.filter((preview) => preview.id !== previewIdToRemove),
    )

    onChange(value.filter((file) => file !== previewToRemove.file))
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

      {previews.length > 0 && (
        <ul className={style.previewList}>
          {previews.map((preview) => (
            <li key={preview.id} className={style.previewItem}>
              <img
                className={style.previewImage}
                src={preview.previewUrl}
                alt={preview.file.name}
              />

              <button
                className={style.removeButton}
                type="button"
                aria-label={`Удалить изображение ${preview.file.name}`}
                onClick={() => handleRemoveImage(preview.id)}
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
