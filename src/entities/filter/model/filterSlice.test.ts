import filterReducer, {
  setWantFilter,
  toggleCategory,
  setGender,
  toggleCity,
  setSearchQuery,
  toggleSortOrder,
  resetFilters,
} from './filterSlice'
import type { FiltersState } from './types'
import { describe, it, expect } from 'vitest'

const initialState: FiltersState = {
  wantFilter: 'all',
  categories: [],
  subcategories: [],
  gender: 'all',
  cities: [],
  searchQuery: '',
  sortOrder: 'newest',
}

describe('filterSlice', () => {
  it('возвращает начальное состояние', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('setWantFilter меняет значение фильтра', () => {
    const result = filterReducer(initialState, setWantFilter('learn'))

    expect(result.wantFilter).toBe('learn')
  })

  it('toggleCategory добавляет категорию, если её не было', () => {
    const result = filterReducer(initialState, toggleCategory('business-career'))

    expect(result.categories).toEqual(['business-career'])
  })

  it('toggleCategory убирает категорию, если она уже выбрана', () => {
    const state = { ...initialState, categories: ['business-career'] }

    const result = filterReducer(state, toggleCategory('business-career'))

    expect(result.categories).toEqual([])
  })

  it('setGender меняет пол', () => {
    const result = filterReducer(initialState, setGender('female'))

    expect(result.gender).toBe('female')
  })

  it('toggleCity добавляет и убирает город', () => {
    const added = filterReducer(initialState, toggleCity('moscow'))
    expect(added.cities).toEqual(['moscow'])

    const removed = filterReducer(added, toggleCity('moscow'))
    expect(removed.cities).toEqual([])
  })

  it('setSearchQuery записывает поисковый запрос', () => {
    const result = filterReducer(initialState, setSearchQuery('английский'))

    expect(result.searchQuery).toBe('английский')
  })

  it('toggleSortOrder переключает порядок сортировки', () => {
    const toOldest = filterReducer(initialState, toggleSortOrder())
    expect(toOldest.sortOrder).toBe('oldest')

    const backToNewest = filterReducer(toOldest, toggleSortOrder())
    expect(backToNewest.sortOrder).toBe('newest')
  })

  it('resetFilters сбрасывает все фильтры', () => {
    const state: FiltersState = {
      wantFilter: 'teach',
      categories: ['business-career'],
      subcategories: ['team-management'],
      gender: 'male',
      cities: ['moscow'],
      searchQuery: 'тест',
      sortOrder: 'oldest',
    }

    const result = filterReducer(state, resetFilters())

    expect(result).toEqual(initialState)
  })
})
