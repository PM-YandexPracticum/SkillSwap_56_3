import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popover } from '@/shared/ui/popover'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectUser } from '@/features/auth/model/authSelectors'
import { logoutUser } from '@/features/auth/model/authThunks'
import { ROUTES } from '@/shared/lib/constants'
import styles from './authorized-actions.module.css'
import { clearAllExchanges } from '@/features/exchange/model/exchangeSlice'

export const AuthorizedActions = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)

  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null
  
  const initial = user.name.trim().charAt(0).toLocaleUpperCase('ru-RU') || '?'

  const handleProfile = () => {
    setIsOpen(false)
    navigate(ROUTES.PROFILE)
  }

  const handleLogout = () => {
    setIsOpen(false)
    dispatch(logoutUser())
    dispatch(clearAllExchanges())
  }

  return (
    <Popover
      className={styles.panel}
      panel={{
        isOpen,
        isOpenChange: setIsOpen,
      }}
      trigger={
        <div className={styles.container}>
          <button type="button" className={styles.trigger}>
            <span className={styles.name}>{user.name}</span>

            <span className={styles.avatar}>
              {user.avatar ? (
                <img
                  className={styles.avatarImage}
                  src={user.avatar}
                  alt={`Аватар пользователя ${user.name}`}
                />
              ) : (
                <span
                  className={styles.avatarFallback}
                  role="img"
                  aria-label={`Аватар пользователя ${user.name}`}
                >
                  {initial}
                </span>
              )}
            </span>
          </button>
        </div>
      }
    >
      <div className={styles.menu}>
        <Button
          type="button"
          onClick={handleProfile}
          extraClass={styles.menuItem}
        >
          Личный кабинет
        </Button>

        <Button
          type="button"
          onClick={handleLogout}
          extraClass={styles.menuItem}
        >
          Выйти из аккаунта
          <Icon name='logout'/>
        </Button>
      </div>
    </Popover>
  )
}