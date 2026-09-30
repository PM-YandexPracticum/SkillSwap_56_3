import { Category } from "@/shared/types"
import { SkillSelection } from "@/shared/types"

export interface CategorySelectProps {
  categories: Category[]
  selections: SkillSelection[]
  onChange: (selections: SkillSelection[]) => void
  categoryLabel?: string
  subcategoryLabel?: string
  categoryError?: string
  subcategoryError?: string
  multiple?: boolean
}