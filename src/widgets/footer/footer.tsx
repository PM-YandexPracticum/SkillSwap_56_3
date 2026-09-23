import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '@/shared/ui/logo'
import { MainNavigation } from '@/widgets/main-navigation'
import { useAppSelector } from '@/store/hooks'
import { selectMeta } from '@/entities/user/model/usersSelectors'
import styles from './footer.module.css'

export function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const categories = useAppSelector(selectMeta)?.categories ?? []

  return (
    <footer className={styles.footer}>
      <Logo className={styles.logo} />

      <MainNavigation
        categories={categories}
        variant="footer"
        className={styles.nav}
        panel={{ isOpen, isOpenChange: setIsOpen }}
        extraItems={
          <>
            <Link to="/contacts">Контакты</Link>
            <Link to="/blog">Блог</Link>
            <Link to="/privacy">Политика конфиденциальности</Link>
            <Link to="/terms">Пользовательское соглашение</Link>
          </>
        }
      />

      <p className={styles.copyright}>SkillSwap — 2025</p>
    </footer>
  )
}
