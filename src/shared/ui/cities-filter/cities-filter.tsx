import { useState } from 'react'
import { CITIES_VISIBLE_COUNT } from '@/shared/lib/constants'
import { CheckOption } from '@/shared/ui/check-option'
import { ExpandListButton } from '@/shared/ui/expand-list-button'
import styles from './cities-filter.module.css'
import type { CitiesFilterProps } from './type'

export const CitiesFilter = ({
  cities,
  selected,
  defaultSelected = [],
  onChange,
  visibleCount = CITIES_VISIBLE_COUNT,
  title = 'Город',
  extraClass = '',
}: CitiesFilterProps) => {
  const [ownSelected, setOwnSelected] = useState<string[]>(defaultSelected)
  const [isExpanded, setIsExpanded] = useState(false)

  const currentSelected = selected ?? ownSelected
  const visibleCities = isExpanded ? cities : cities.slice(0, visibleCount)
  const hasHiddenCities = cities.length > visibleCount

  const handleToggle = (cityId: string, checked: boolean) => {
    const next = checked
      ? [...currentSelected, cityId]
      : currentSelected.filter((id) => id !== cityId)

    if (selected === undefined) {
      setOwnSelected(next)
    }
    onChange?.(next)
  }

  return (
    <fieldset className={`${styles.group} ${extraClass}`.trim()}>
      <legend className={styles.title}>{title}</legend>

      <div className={styles.list}>
        {visibleCities.map((city) => (
          <CheckOption
            key={city.id}
            value={city.id}
            label={city.name}
            checked={currentSelected.includes(city.id)}
            onChange={(checked) => handleToggle(city.id, checked)}
          />
        ))}
      </div>

      {hasHiddenCities && (
        <ExpandListButton
          label="Все города"
          expanded={isExpanded}
          onClick={() => setIsExpanded((prev) => !prev)}
        />
      )}
    </fieldset>
  )
}