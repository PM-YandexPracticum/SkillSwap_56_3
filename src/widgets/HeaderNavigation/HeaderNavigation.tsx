import { Link } from 'react-router-dom'
import { PanelProps } from '../header/ui/type'
import { Button } from '@/shared/ui/button'
import styles from './header-navigation.module.css'
import { Popover } from '@/shared/ui/popover/popover'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { SkillsPopoverContent } from '@/shared/ui/skills-popover-content/skills-popover-content'
import { useEffect } from 'react'
import { loadUsers } from '@/entities/user/model/usersThunks'

export function HeaderNavigation(panel: PanelProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [dispatch])
  const meta = useAppSelector(selectMeta)
  const categories = meta?.categories || []

  return (
    <nav className={styles.navigation}>
      <Link className={styles.link} to={'/about'}>
        О проекте
      </Link>

      <Popover
        {...panel}
        className={styles.panel}
        trigger={
          <Button extraClass={styles.button}>
            <span>Все навыки</span>
            <img
              src="src/icons/arrow.svg"
              className={`${styles.buttonIcon} ${panel.isOpen ? styles.buttonIconOpen : ''}`}
            />
          </Button>
        }
      >
        <SkillsPopoverContent categories={categories} />
      </Popover>
    </nav>
  )
}
