import { Skill } from '@/shared/types'
import type { RootState } from '@/store'

// Все навыки из стора
export const selectAllSkills = (state: RootState): Skill[] => state.skills.skills

// текущий навык
export const selectCurrentSkill = (state: RootState): Skill | null => state.skills.currentSkill

// Навыки по подкатегории (subcategory — это id, например 'english')
export const selectSkillsBySubcategory = (state: RootState, subcategory: string): Skill[] =>
  state.skills.skills.filter((skill) => skill.subcategory === subcategory)

export const selectSkillsLoading = (state: RootState): boolean => state.skills.isLoading

export const selectSkillsError = (state: RootState): string | null => state.skills.error

export const selectCurrentSkillLoading = (state: RootState): boolean =>
  state.skills.isLoadingCurrent

export const selectCurrentSkillError = (state: RootState): string | null =>
  state.skills.errorCurrent
