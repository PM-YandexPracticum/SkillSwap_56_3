import { useId, useState } from 'react'
import type { WantFilter as WantId } from '@/shared/types'
import { CheckOption } from '@/shared/ui/check-option'
import styles from './want-filter.module.css'
import type { WantFilterProps } from './type'
import { useAppSelector } from '@/store/hooks'
import { selectMeta } from '@/entities/user/model/usersSelectors'

export const WantFilter = ({
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

  const meta = useAppSelector(selectMeta)
  const options = meta?.wantFilter ?? []

  const handleSelect = (next: WantId) => {
    if (value === undefined) {
      setOwnValue(next)
    }
    onChange?.(next)
  }

  if (options.length === 0) return null

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