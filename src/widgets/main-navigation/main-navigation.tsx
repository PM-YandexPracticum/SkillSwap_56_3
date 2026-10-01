import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import styles from './main-navigation.module.css'
import { Popover } from '@/shared/ui/popover'
import { SkillsPopoverContent } from '@/shared/ui/skills-popover-content'
import { NavigationProps } from './type'
import arrowIcon from '@/icons/arrow.svg'

export function MainNavigation({
  categories,
  variant,
  panel,
  extraItems,
  className,
}: NavigationProps) {
  return (
    <nav className={`${styles.navigation} ${styles[variant]} ${className ?? ''}`}>
      <Link className={styles.link} to={'/about'}>
        О проекте
      </Link>

      <Popover
        panel={panel}
        className={styles.panel}
        trigger={
          <Button extraclass={styles.button}>
            <span>Все навыки</span>
            <img
              src={arrowIcon}
              className={`${styles.buttonIcon} ${panel.isOpen ? styles.buttonIconOpen : ''}`}
            />
          </Button>
        }
      >
        <SkillsPopoverContent categories={categories} />
      </Popover>
      {extraItems}
    </nav>
  )
}
