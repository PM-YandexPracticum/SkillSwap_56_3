import { RootState } from "@/store"

export const selectFilters = (state: RootState) => state.filter
export const selectWantFilter = (state: RootState) => state.filter.wantFilter
export const selectCategories = (state: RootState) => state.filter.categories
export const selectSubcategories = (state: RootState) => state.filter.subcategories
export const selectGender = (state: RootState) => state.filter.gender
export const selectCities = (state: RootState) => state.filter.cities
export const selectSearchQuery = (state: RootState) => state.filter.searchQuery
export const selectSortOrder = (state: RootState) => state.filter.sortOrder

export const selectFiltersCount = (state: RootState): number => {
  const filters = state.filter
  let count = 0
  if (filters.wantFilter !== 'all') count++
  if (filters.gender !== 'unspecified') count++
  count += filters.categories.length
  count += filters.subcategories.length
  count += filters.cities.length
  if (filters.searchQuery.trim()) count++
  return count
}

export const selectIsFiltering = (state: RootState): boolean =>
  selectFiltersCount(state) > 0