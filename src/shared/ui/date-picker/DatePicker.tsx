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

export function DatePicker({
  value,
  onChange,
  placeholder = 'дд.мм.гггг',
  extraClass = '',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<Date | null>(value)
  const wrapperRef = useRef<HTMLDivElement>(null)

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
    setIsOpen(false)
  }

  const handleConfirm = () => {
    onChange(tempDate)
    setIsOpen(false)
  }

  const formattedValue = tempDate ? tempDate.toLocaleDateString('ru-RU') : ''

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.input} ${isOpen ? styles.inputOpen : ''} ${extraClass}`.trim()}
        onClick={handleOpen}
      >
        <span className={formattedValue ? styles.value : styles.placeholder}>
          {formattedValue || placeholder}
        </span>
        <Icon name="calendar" size={20} />
      </button>

      {isOpen && (
        <div className={styles.calendar}>
          <DatePickerLib
            selected={tempDate}
            onChange={(date: Date | null) => setTempDate(date)}
            locale={ru}
            inline
            maxDate={new Date()}
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
  )
}