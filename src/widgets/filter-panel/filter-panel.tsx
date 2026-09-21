import { useDispatch, useSelector } from 'react-redux'
import { WantFilter } from '@/shared/ui/want-filter'
import { SkillFilter } from '@/shared/ui/skill-filter'
import { GenderFilter } from '@/shared/ui/gender-filter'
import { CitiesFilter } from '@/shared/ui/cities-filter'
import {
  setWantFilter,
  toggleSubcategory,
  setGender,
  toggleCity,
  resetFilters
} from '@/entities/filter/model/filterSlice'
import {
  selectWantFilter,
  selectSubcategories,
  selectGender,
  selectCities,
  selectIsFiltering,
  selectFiltersCount
} from '@/entities/filter/model/filterSelectors'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import styles from './filter-panel.module.css'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'

export const FilterPanel = () => {
  const dispatch = useDispatch()
  const meta = useSelector(selectMeta)

  const wantFilter = useSelector(selectWantFilter)
  const subcategories = useSelector(selectSubcategories)
  const gender = useSelector(selectGender)
  const cities = useSelector(selectCities)

  const isFiltering = useSelector(selectIsFiltering)
  const filtersCount = useSelector(selectFiltersCount)

  if (!meta) return null

  return (
    <aside className={`${styles.container}`.trim()}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {isFiltering ? `Фильтры (${filtersCount})` : 'Фильтры'}
        </h2>

        {isFiltering && (
          <Button
            extraClass={styles.reset}
            onClick={() => dispatch(resetFilters())}
          >
            Сбросить
            <Icon name='cross' size={11}/>
          </Button>
        )}
      </div>
      <div className={styles.filters}>
        <WantFilter
          options={meta.wantFilter}
          value={wantFilter}
          onChange={(value) => dispatch(setWantFilter(value))}
        />

        <SkillFilter
          categories={meta.categories}
          selected={subcategories}
          onChange={(next) => {
            subcategories.forEach((id) => {
              if (!next.includes(id)) dispatch(toggleSubcategory(id))
            })
            next.forEach((id) => {
              if (!subcategories.includes(id)) dispatch(toggleSubcategory(id))
            })
          }}
        />

        <GenderFilter
          options={meta.genders}
          value={gender}
          onChange={(value) => dispatch(setGender(value))}
        />

        <CitiesFilter
          cities={meta.cities}
          selected={cities}
          onChange={(next) => {
            cities.forEach((id) => {
              if (!next.includes(id)) dispatch(toggleCity(id))
            })
            next.forEach((id) => {
              if (!cities.includes(id)) dispatch(toggleCity(id))
            })
          }}
        />
      </div>
    </aside>
  )
}