import { WantFilter, Gender, SortOrder } from "@/shared/types"

export interface FiltersState {
  wantFilter: WantFilter
  categories: string[]
  subcategories: string[]
  gender: Gender
  cities: string[]
  searchQuery: string
  sortOrder: SortOrder
}