import type { GenderValue } from "@/shared/ui/gender-select"
import type { Category } from "@/shared/types"
import { SkillSelection } from "@/shared/types"

export interface RegisterStep2Props {
  values: {
    avatar: string
    name: string
    birthDate: string
    gender: GenderValue | null
    city: string | null
    learnSelections: SkillSelection[]
  }
  errors: Record<string, string>
  categories: Category[]
  onFieldChange: (patch: Record<string, unknown>) => void
  onAvatarChange: (file: File) => void
  onBack: () => void
  onNext: () => void
}