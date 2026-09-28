import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import styles from './user-panel.module.css'
import { SECTIONS } from '@/shared/lib/constants'
import { Icon } from '@/shared/ui/icon'
import { IconName } from '@/shared/ui/icon/types'

export const UserPanel = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {SECTIONS.map((section) => {
          const isActive = section.path === location.pathname

          return (
            <Button
              key={section.id}
              onClick={() => {
                if (section.path) navigate(section.path)
              }}
              extraClass={`${styles.item} ${isActive ? styles.active : ''}`}
            >
              <Icon name={section.id as IconName} size={20}/>
              {section.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}