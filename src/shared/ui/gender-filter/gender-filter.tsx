import { useId, useState } from 'react'
import type { Gender } from '@/shared/types'
import { CheckOption } from '@/shared/ui/check-option'
import styles from './gender-filter.module.css'
import type { GenderFilterProps } from './type'

export const GenderFilter = ({
  options,
  value,
  defaultValue = 'unspecified',
  onChange,
  name,
  title = 'Пол автора',
  extraClass = '',
}: GenderFilterProps) => {
  const generatedName = useId()
  const [ownValue, setOwnValue] = useState<Gender>(defaultValue)
  const currentValue = value ?? ownValue
  const groupName = name ?? generatedName

  const handleSelect = (next: Gender) => {
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