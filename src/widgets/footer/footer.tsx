import { Logo } from '@/shared/ui/logo'
import { SkillsPopover } from '@/shared/ui/skills-popover'
import { Button } from '@/shared/ui/button'
import styles from './footer.module.css'
import { FooterProps } from './type'

export function Footer({ categories }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Logo className={styles.logo} />

      <nav className={styles.nav}>
        <div className={styles.column}>
          <Button type="button">О проекте</Button>
          <SkillsPopover categories={categories} />
        </div>

        <div className={styles.column}>
          <Button type="button">Контакты</Button>
          <Button type="button">Блог</Button>
        </div>

        <div className={styles.column}>
          <Button type="button">Политика конфиденциальности</Button>
          <Button type="button">Пользовательское соглашение</Button>
        </div>
      </nav>

      <p className={styles.copyright}>SkillSwap - 2025</p>
    </footer>
  )
}
