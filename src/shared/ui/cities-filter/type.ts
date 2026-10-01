import type { CityOption } from '@/shared/types'

export type CitiesFilterProps = {
  cities: CityOption[]
  selected?: string[]
  defaultSelected?: string[]
  onChange?: (selected: string[]) => void
  visibleCount?: number
  title?: string
  extraclass?: string
}