import type { Skill } from '@/shared/types'

export interface SkillCardProps {
  skill: Skill
  onOfferExchange?: () => void
  onShare?: () => void
  onMoreClick?: () => void
  extraClass?: string
}