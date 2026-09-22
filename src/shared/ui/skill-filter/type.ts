import type { Category } from '@/shared/types'

export type SkillFilterCategory = Pick<Category, 'id' | 'name' | 'subcategories'>

export type SkillFilterProps = {
  categories: SkillFilterCategory[]
  selected?: string[]
  defaultSelected?: string[]
  onChange?: (selected: string[]) => void
  title?: string
  extraClass?: string
}