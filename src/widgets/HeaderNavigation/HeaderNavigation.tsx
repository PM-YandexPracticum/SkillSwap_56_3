import type { Category } from '@/shared/types'
import { SkillsPopover } from '@/shared/ui/skills-popover'
import { Button } from '@/shared/ui/button'

interface HeaderNavigationProps {
  onAbout: () => void
  categories: Category[]
}

export function HeaderNavigation({ onAbout, categories }: HeaderNavigationProps) {
  return (
    <nav>
      <Button type="button" onClick={onAbout}>
        О проекте
      </Button>
      <SkillsPopover categories={categories} />
    </nav>
  )
}
