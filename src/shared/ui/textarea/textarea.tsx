import type { TextareaProps } from './type'
import styles from './textarea.module.css'

export const Textarea = ({
  className,
  label,
  rightSlot,
  ...props
}: TextareaProps) => {
  const textareaClassName = [
    styles.textarea,
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
    </div>
  )
}