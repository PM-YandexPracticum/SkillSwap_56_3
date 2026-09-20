import { SkillsPopover } from '@/shared/ui/skills-popover'
import { Button } from '@/shared/ui/button'
import { HeaderNavigationProps } from './type'

export function HeaderNavigation({ categories }: HeaderNavigationProps) {
  return (
    <nav>
      <Button type="button">
        О проекте
      </Button>
      <SkillsPopover categories={categories} />
    </nav>
  )
}
