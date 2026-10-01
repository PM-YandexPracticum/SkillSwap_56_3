import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/shared/ui/icon/Icon'
import { CheckOption } from '@/shared/ui/check-option'
import { Button } from '@/shared/ui/button'
import styles from './select.module.css'
import type { SelectProps } from './type'

export const Select = ({
  options,
  value,
  onChange,
  multiple = false,
  searchable = false,
  placeholder = 'Выберите...',
  emptyText = 'Ничего не найдено',
  error = '',
  label,
  className,
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const hasError = Boolean(error)

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      return
    }
    const handleClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  const selectedValues = multiple
    ? Array.isArray(value)
      ? value
      : []
    : typeof value === 'string'
      ? [value]
      : []

  const filteredOptions = query.trim()
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.trim().toLowerCase())
      )
    : options

  const valueInInput = multiple
    ? selectedValues.length > 0
      ? `Выбрано: ${selectedValues.length}`
      : ''
    : (options.find((option) => option.id === value)?.label ?? '')

  const handleSelect = (id: string, checked: boolean) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : []
      onChange(checked ? [...current, id] : current.filter((x) => x !== id))
    } else {
      onChange(id)
      setIsOpen(false)
    }
  }

  const selectClassName = [
    styles.field,
    hasError ? styles.fieldError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={styles.root} {...props}>
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={`${styles.fieldWrapper} ${
          isOpen ? styles.fieldWrapperOpen : ''
        }`.trim()}
      >
        <div className={selectClassName} onClick={() => setIsOpen(true)}>
          {searchable ? (
            <input
              className={styles.input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setIsOpen(true)
              }}
              placeholder={valueInInput || placeholder}
            />
          ) : (
            <span className={valueInInput ? '' : styles.placeholder}>
              {valueInInput || placeholder}
            </span>
          )}

          <Button
            type="button"
            extraclass={`${styles.icon} ${
              isOpen ? styles.iconOpen : ''
            }`.trim()}
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen((open) => !open)
            }}
          >
            <Icon name="chevron-down" size={20} />
          </Button>
        </div>

        {isOpen && (
          <div className={styles.dropdown}>
            {filteredOptions.length === 0 ? (
              <p className={styles.empty}>{emptyText}</p>
            ) : multiple ? (
              filteredOptions.map((option) => (
                <CheckOption
                  key={option.id}
                  type="checkbox"
                  value={option.id}
                  label={option.label}
                  checked={selectedValues.includes(option.id)}
                  onChange={(checked) => handleSelect(option.id, checked)}
                />
              ))
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  className={styles.option}
                  onClick={() => handleSelect(option.id, true)}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {hasError && <p className={styles.error}>{error}</p>}
    </div>
  )
}