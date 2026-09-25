import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  selectWantFilter,
  selectSubcategories,
  selectGender,
  selectCities,
} from '@/entities/filter/model/filterSelectors'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import {
  setWantFilter,
  setGender,
  toggleSubcategory,
  toggleCity,
} from '@/entities/filter/model/filterSlice'
import { FilterChip } from '@/shared/ui/filter-chip'
import styles from './active-filters-bar.module.css'

export function ActiveFiltersBar() {
  const dispatch = useAppDispatch()
  const wantFilter = useAppSelector(selectWantFilter)
  const subcategories = useAppSelector(selectSubcategories)
  const gender = useAppSelector(selectGender)
  const cities = useAppSelector(selectCities)
  const meta = useAppSelector(selectMeta)

  if (!meta) return null

  const findWantName = (id: string): string =>
    meta.wantFilter.find((item) => item.id === id)?.name ?? id

  const findGenderName = (id: string): string =>
    meta.genders.find((item) => item.id === id)?.name ?? id

  const findCityName = (id: string): string =>
    meta.cities.find((item) => item.id === id)?.name ?? id

  const findSubcategoryName = (id: string): string => {
    for (const category of meta.categories) {
      const sub = category.subcategories.find((s) => s.id === id)
      if (sub) return sub.name
    }
    return id
  }

  const hasFilters =
    wantFilter !== 'all' ||
    gender !== 'all' ||
    subcategories.length > 0 ||
    cities.length > 0

  if (!hasFilters) return null

  return (
    <div className={styles.bar}>
      {wantFilter !== 'all' && (
        <FilterChip
          label={findWantName(wantFilter)}
          onRemove={() => dispatch(setWantFilter('all'))}
        />
      )}

      {gender !== 'all' && (
        <FilterChip
          label={findGenderName(gender)}
          onRemove={() => dispatch(setGender('all'))}
        />
      )}

      {subcategories.map((id) => (
        <FilterChip
          key={`sub-${id}`}
          label={findSubcategoryName(id)}
          onRemove={() => dispatch(toggleSubcategory(id))}
        />
      ))}

      {cities.map((id) => (
        <FilterChip
          key={`city-${id}`}
          label={findCityName(id)}
          onRemove={() => dispatch(toggleCity(id))}
        />
      ))}
    </div>
  )
}