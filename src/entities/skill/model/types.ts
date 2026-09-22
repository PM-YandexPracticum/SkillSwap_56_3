export type SkillType = 'teach' | 'learn'
import type { Skill } from '@/shared/types'

// export interface Skill {
//   id: string
//   type: SkillType
//   title: string
//   category: string
//   subcategory: string
//   description: string
//   tags: string[]
//   images: string[]
//   authorId: string
// }

export interface SkillsState {
  skills: Skill[]
  isLoading: boolean
  error: string | null
  isLoadingCurrent: boolean
  errorCurrent: string | null
  currentSkill: Skill | null
}
