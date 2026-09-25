import { Skill } from '@/shared/types'

export interface SkillsState {
  skills: Skill[]
  isLoading: boolean
  error: string | null
  isLoadingCurrent: boolean
  errorCurrent: string | null
  currentSkill: Skill | null
  likesCount?: number
  isFavorite?: boolean
}
