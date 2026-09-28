import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './auth-social-buttons.module.css'
import type { AuthSocialButtonsProps } from './type'

export const AuthSocialButtons = ({
  onGoogleClick,
  onAppleClick,
  extraClass = '',
}: AuthSocialButtonsProps) => {
  return (
    <div className={`${styles.list} ${extraClass}`.trim()}>
      <Button type="button" extraClass={styles.button} onClick={onGoogleClick}>
        <Icon name="google" size={24} />
        Продолжить с Google
      </Button>

      <Button type="button" extraClass={styles.button} onClick={onAppleClick}>
        <Icon name="apple" size={24} />
        Продолжить с Apple
      </Button>
    </div>
  )
}