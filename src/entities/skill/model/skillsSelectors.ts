import type { RootState } from '@/store'
import type { Skill } from './types'

// Все навыки из стора
export const selectAllSkills = (state: RootState): Skill[] => state.skills.skills

// Навык по id
export const selectSkillById = (state: RootState, id: string): Skill | undefined =>
  state.skills.skills.find((skill) => skill.id === id)

// Навыки по подкатегории (subcategory — это id, например 'english')
export const selectSkillsBySubcategory = (
  state: RootState,
  subcategory: string,
): Skill[] =>
  state.skills.skills.filter((skill) => skill.subcategory === subcategory)