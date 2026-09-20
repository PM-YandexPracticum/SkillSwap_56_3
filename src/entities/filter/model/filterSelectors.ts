import { RootState } from "@/store"

export const selectFilters = (state: RootState) => state.filters
export const selectWantFilter = (state: RootState) => state.filters.wantFilter
export const selectCategories = (state: RootState) => state.filters.categories
export const selectSubcategories = (state: RootState) => state.filters.subcategories
export const selectGender = (state: RootState) => state.filters.gender
export const selectCities = (state: RootState) => state.filters.cities
export const selectSearchQuery = (state: RootState) => state.filters.searchQuery
export const selectSortOrder = (state: RootState) => state.filters.sortOrder

export const selectFiltersCount = (state: RootState): number => {
  const filters = state.filters
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