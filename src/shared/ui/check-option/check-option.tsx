import { useEffect, useRef, type ChangeEvent } from 'react'
import styles from './check-option.module.css'
import type { CheckOptionProps } from './type'

export const CheckOption = ({
  label,
  checked,
  onChange,
  type = 'checkbox',
  name,
  value,
  indeterminate = false,
  disabled = false,
  extraclass = '',
}: CheckOptionProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.indeterminate = type === 'checkbox' && indeterminate && !checked
  }, [type, indeterminate, checked])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <label className={`${styles.check} ${extraclass}`.trim()}>
      <input
        ref={inputRef}
        className={styles.input}
        type={type}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className={type === 'radio' ? styles.radioBox : styles.checkBox} />
      <span className={styles.text}>{label}</span>
    </label>
  )
}