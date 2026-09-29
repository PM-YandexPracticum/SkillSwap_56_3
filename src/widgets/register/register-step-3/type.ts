import type { Category } from "@/shared/types"
import { SkillSelection } from "@/shared/types"

export interface RegisterStep3Props {
  values: {
    teachSkillName: string
    teachSelections: SkillSelection[]
    teachDescription: string
    teachImages: string[]
  }
  errors: Record<string, string>
  categories: Category[]
  onFieldChange: (patch: Record<string, unknown>) => void
  onBack: () => void
  onOpenPreview: () => void
  isLoading: boolean
}