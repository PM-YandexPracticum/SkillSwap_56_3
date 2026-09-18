export type SkillType = 'teach' | 'learn'

export interface Skill {
  id: string
  type: SkillType
  title: string
  category: string
  subcategory: string
  description: string
  tags: string[]
  images: string[]
  authorId: string
}

export interface SkillsState {
  skills: Skill[]
  isLoading: boolean
  error: string | null
}