import type { City } from '@/shared/types'

export type CitiesFilterProps = {
  cities: City[]
  selected?: string[]
  defaultSelected?: string[]
  onChange?: (selected: string[]) => void
  visibleCount?: number
  title?: string
  extraClass?: string
}
