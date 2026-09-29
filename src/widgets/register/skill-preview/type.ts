import { SkillSelection } from "@/shared/types"

export interface SkillPreviewProps {
  isOpen: boolean
  values: {
    teachSkillName: string
    teachSelections: SkillSelection[]
    teachDescription: string
    teachImages: string[]
  }
  onEdit: () => void
  onConfirm: () => void
  isLoading: boolean
}