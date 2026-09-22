import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FiltersState } from './types'

const initialState: FiltersState = {
  wantFilter: 'all',
  categories: [],
  subcategories: [],
  gender: 'all',
  cities: [],
  searchQuery: '',
  sortOrder: 'newest',
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setWantFilter(state, action) {
      state.wantFilter = action.payload
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const id = action.payload
      state.categories = state.categories.includes(id)
        ? state.categories.filter((c) => c !== id)
        : [...state.categories, id]
    },
    toggleSubcategory(state, action: PayloadAction<string>) {
      const id = action.payload
      state.subcategories = state.subcategories.includes(id)
        ? state.subcategories.filter((s) => s !== id)
        : [...state.subcategories, id]
    },
    setGender(state, action: PayloadAction<FiltersState['gender']>) {
      state.gender = action.payload
    },
    toggleCity(state, action: PayloadAction<string>) {
      const id = action.payload
      state.cities = state.cities.includes(id)
        ? state.cities.filter((c) => c !== id)
        : [...state.cities, id]
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload
    },
    toggleSortOrder(state) {
      state.sortOrder = state.sortOrder === 'newest' ? 'oldest' : 'newest'
    },
    resetFilters() {
      return initialState
    },
  },
})

export const {
  setWantFilter,
  toggleCategory,
  toggleSubcategory,
  setGender,
  toggleCity,
  setSearchQuery,
  toggleSortOrder,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer