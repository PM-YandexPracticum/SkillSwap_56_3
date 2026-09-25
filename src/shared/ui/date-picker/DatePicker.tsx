import { useState, useRef, useEffect } from 'react'
import DatePickerLib from 'react-datepicker'
import { ru } from 'date-fns/locale'
import { Icon } from '@/shared/ui/icon/Icon'
import { Button } from '@/shared/ui/button'
import styles from './date-picker.module.css'
import type { DatePickerProps } from './type'

const MONTH_NAMES = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR = 1900
const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i,
)

// Проверка, что дата реально существует и не в будущем
function parseAndValidate(value: string): Date | null {
  if (value.length !== 10) return null

  const parts = value.split('.')
  if (parts.length !== 3) return null

  // Каждая часть — строго ДД / ММ / ГГГГ
  const [dayStr, monthStr, yearStr] = parts
  if (dayStr.length !== 2 || monthStr.length !== 2 || yearStr.length !== 4) {
    return null
  }

  const day = Number(dayStr)
  const month = Number(monthStr)
  const year = Number(yearStr)

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null

  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null
  if (year < MIN_YEAR || year > CURRENT_YEAR) return null

  const parsed = new Date(year, month - 1, day)

  // Date «перекатывает» невалидные дни (31.02 → 03.03) — отлавливаем
  if (
    parsed.getDate() !== day ||
    parsed.getMonth() !== month - 1 ||
    parsed.getFullYear() !== year
  ) {
    return null
  }

  // Не в будущем
  if (parsed > new Date()) return null

  return parsed
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'дд.мм.гггг',
  extraClass = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Date | null>(value)
  const [inputValue, setInputValue] = useState(
    value ? value.toLocaleDateString('ru-RU') : '',
  )
  const [isInvalid, setIsInvalid] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Синхронизация: value изменилось снаружи — обновляем инпут
  useEffect(() => {
    setInputValue(value ? value.toLocaleDateString('ru-RU') : '')
    setIsInvalid(false)
  }, [value])

  // Клик вне — отмена
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) return
      handleCancel()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, value])

  const handleOpen = () => {
    setTempDate(value)
    setIsOpen(true)
  }

  const handleCancel = () => {
    setTempDate(value)
    setInputValue(value ? value.toLocaleDateString('ru-RU') : '')
    setIsInvalid(false)
    setIsOpen(false)
  }

  const handleConfirm = () => {
    if (isInvalid) return
    onChange(tempDate)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value

    // Только цифры и точки, максимум 10 символов
    if (!/^[\d.]*$/.test(val) || val.length > 10) return

    setInputValue(val)

    // Пока не введено 10 символов — не валидируем
    if (val.length < 10) {
      setIsInvalid(false)
      return
    }

    const parsed = parseAndValidate(val)
    if (parsed) {
      setIsInvalid(false)
      setTempDate(parsed)
      onChange(parsed)
    } else {
      setIsInvalid(true)
    }
  }

  const handleDayChange = (date: Date | null) => {
    setTempDate(date)
    setInputValue(date ? date.toLocaleDateString('ru-RU') : '')
    setIsInvalid(false)
  }

  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}

      <div ref={wrapperRef} className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={`${styles.input} ${isInvalid ? styles.inputInvalid : ''} ${extraClass}`.trim()}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={handleOpen}
          />
          <button
            type="button"
            className={styles.iconButton}
            onClick={handleOpen}
            aria-label="Открыть календарь"
          >
            <Icon name="calendar" size={20} />
          </button>
        </div>

        {isOpen && (
          <div className={styles.calendar}>
            <DatePickerLib
              selected={tempDate}
              onChange={handleDayChange}
              locale={ru}
              inline
              maxDate={new Date()}
              minDate={new Date(MIN_YEAR, 0, 1)}
              openToDate={tempDate ?? new Date()}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
              }) => (
                <div className={styles.header}>
                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.select}
                      value={date.getMonth()}
                      onChange={(e) => changeMonth(Number(e.target.value))}
                    >
                      {MONTH_NAMES.map((name, i) => (
                        <option key={name} value={i}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevron-down" size={16} />
                  </div>

                  <div className={styles.selectWrapper}>
                    <select
                      className={styles.select}
                      value={date.getFullYear()}
                      onChange={(e) => changeYear(Number(e.target.value))}
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <Icon name="chevron-down" size={16} />
                  </div>
                </div>
              )}
            />

            <div className={styles.footer}>
              <Button extraClass={styles.cancelButton} onClick={handleCancel}>
                Отмена
              </Button>
              <Button extraClass={styles.confirmButton} onClick={handleConfirm}>
                Выбрать
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}