import { useId, useState } from 'react'
import type { GenderId } from '@/shared/types'
import { GENDER_OPTIONS } from '@/shared/lib/constants'
import { CheckOption } from '@/shared/ui/check-option'
import styles from './gender-filter.module.css'
import type { GenderFilterProps } from './type'

export const GenderFilter = ({
  options = GENDER_OPTIONS,
  value,
  defaultValue = 'all',
  onChange,
  name,
  title = 'Пол автора',
  extraClass = '',
}: GenderFilterProps) => {
  const generatedName = useId()
  const [ownValue, setOwnValue] = useState<GenderId>(defaultValue)
  const currentValue = value ?? ownValue
  const groupName = name ?? generatedName

  const handleSelect = (next: GenderId) => {
    if (value === undefined) {
      setOwnValue(next)
    }
    onChange?.(next)
  }

  return (
    <fieldset className={`${styles.group} ${extraClass}`.trim()}>
      <legend className={styles.title}>{title}</legend>

      <div className={styles.list}>
        {options.map((option) => (
          <CheckOption
            key={option.id}
            type="radio"
            name={groupName}
            value={option.id}
            label={option.name}
            checked={currentValue === option.id}
            onChange={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </fieldset>
  )
}
