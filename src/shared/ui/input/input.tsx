import type { InputProps } from './type'
import styles from './input.module.css'

export const Input = ({
  type = 'text',
  className,
  label,
  error = '',
  rightSlot,
  ...props
}: InputProps) => {
  const hasError = Boolean(error)

  const inputClassName = [
    styles.input,
    hasError ? styles.inputError : '',
    rightSlot ? styles.withRightSlot : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input {...props} type={type} className={inputClassName} />
        {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
      </div>

      {hasError && <p className={styles.error}>{error}</p>}
    </div>
  )
}