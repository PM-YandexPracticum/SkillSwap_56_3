import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './auth-social-buttons.module.css'
import type { AuthSocialButtonsProps } from './type'

export const AuthSocialButtons = ({
  onGoogleClick,
  onAppleClick,
  extraclass = '',
}: AuthSocialButtonsProps) => {
  return (
    <div className={`${styles.list} ${extraclass}`.trim()}>
      <Button type="button" extraclass={styles.button} onClick={onGoogleClick}>
        <Icon name="google" size={24} />
        Продолжить с Google
      </Button>

      <Button type="button" extraclass={styles.button} onClick={onAppleClick}>
        <Icon name="apple" size={24} />
        Продолжить с Apple
      </Button>
    </div>
  )
}