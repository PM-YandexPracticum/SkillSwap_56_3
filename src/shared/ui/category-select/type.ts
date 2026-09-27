import type { Category } from '@/shared/types'

export interface CategorySelectProps {
  categories: Category[]
  categoryValue: string[]
  subcategoryValue: string[]
  onCategoryChange: (value: string[]) => void
  onSubcategoryChange: (value: string[]) => void
  categoryLabel?: string
  subcategoryLabel?: string
  categoryError?: string
  subcategoryError?: string
}
