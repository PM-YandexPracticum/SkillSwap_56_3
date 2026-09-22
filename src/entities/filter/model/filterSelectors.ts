import { RootState } from "@/store"
import { createSelector } from "@reduxjs/toolkit"
import { selectUsers, selectMeta } from "@/entities/user/model/usersSelectors"
import type { UserCard } from "@/shared/types"

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
  if (filters.gender !== 'all') count++
  count += filters.categories.length
  count += filters.subcategories.length
  count += filters.cities.length
  if (filters.searchQuery.trim()) count++
  return count
}

export const selectIsFiltering = (state: RootState): boolean =>
  selectFiltersCount(state) > 0

//СКВОЗНОЙ ФИЛЬТР ПО ЮЗЕРАМ
export const selectFilteredUsers = createSelector(
  [selectUsers, selectFilters, selectMeta],
  (users, filters, meta): UserCard[] => {
    const findCategoryId = (name: string): string | null =>
      meta?.categories.find((category) => category.name === name)?.id ?? null

    const findSubcategoryId = (name: string): string | null => {
      if (!meta) return null
      for (const category of meta.categories) {
        const sub = category.subcategories.find((subcategory) => subcategory.name === name)
        if (sub) return sub.id
      }
      return null
    }

    const skillMatchesFilters = (skill: {
      category: string
      subcategory: string
    }): boolean => {
      const categoryId = findCategoryId(skill.category)
      const subcategoryId = findSubcategoryId(skill.subcategory)

      const matchCategory =
        categoryId !== null && filters.categories.includes(categoryId)
      const matchSubcategory =
        subcategoryId !== null && filters.subcategories.includes(subcategoryId)

      return matchCategory || matchSubcategory
    }

    return users
      .filter((user) => {
        const hasSubcategoryFilter =
          filters.categories.length > 0 || filters.subcategories.length > 0

        if (hasSubcategoryFilter) {
          const matchesTeach = skillMatchesFilters(user.teachSkill)
          const matchesLearn = user.learnSkills.some(skillMatchesFilters)

          if (filters.wantFilter === 'teach') {
            if (!matchesLearn) return false
          } else if (filters.wantFilter === 'learn') {
            if (!matchesTeach) return false
          } else {
            if (!matchesTeach && !matchesLearn) return false
          }
        }

        if (filters.gender !== 'all' && user.gender !== filters.gender) {
          return false
        }

        if (filters.cities.length > 0 && !filters.cities.includes(user.city)) {
          return false
        }

        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.trim().toLowerCase()

          const matchesTeach = user.teachSkill.name.toLowerCase().includes(query)
          const matchesLearn = user.learnSkills.some((item) =>
            item.name.toLowerCase().includes(query)
          )

          if (!matchesTeach && !matchesLearn) return false
        }

        return true
      })
      .sort((a, b) => {
        const da = new Date(a.createdAt).getTime()
        const db = new Date(b.createdAt).getTime()
        return filters.sortOrder === 'newest' ? db - da : da - db
      })
  }
)

export const selectFilteredUsersCount = createSelector(
  [selectFilteredUsers],
  (users) => users.length
)