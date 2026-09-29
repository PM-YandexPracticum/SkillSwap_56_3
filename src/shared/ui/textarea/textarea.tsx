import type { TextareaProps } from './type'
import styles from './textarea.module.css'

export const Textarea = ({
  className,
  label,
  error = '',
  rightSlot,
  ...props
}: TextareaProps) => {
  const hasError = Boolean(error)

  const textareaClassName = [
    styles.textarea,
    hasError ? styles.textareaError : '',
    rightSlot ? styles.withRightSlot : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.textareaWrapper}>
        <textarea {...props} className={textareaClassName} />
        {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
      </div>

      {hasError && <p className={styles.error}>{error}</p>}
    </div>
  )
}