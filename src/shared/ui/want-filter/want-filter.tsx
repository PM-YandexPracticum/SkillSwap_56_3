import { useId, useState } from 'react'
import type { WantId } from '@/shared/types'
import { WANT_OPTIONS } from '@/shared/lib/constants'
import { CheckOption } from '@/shared/ui/check-option'
import styles from './want-filter.module.css'
import type { WantFilterProps } from './type'

export const WantFilter = ({
  options = WANT_OPTIONS,
  value,
  defaultValue = 'all',
  onChange,
  name,
  extraClass = '',
}: WantFilterProps) => {
  const generatedName = useId()
  const [ownValue, setOwnValue] = useState<WantId>(defaultValue)
  const currentValue = value ?? ownValue
  const groupName = name ?? generatedName

  const handleSelect = (next: WantId) => {
    if (value === undefined) {
      setOwnValue(next)
    }
    onChange?.(next)
  }

  return (
    <fieldset className={`${styles.group} ${extraClass}`.trim()}>
      <legend className={styles.legend}>Что показывать</legend>

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
