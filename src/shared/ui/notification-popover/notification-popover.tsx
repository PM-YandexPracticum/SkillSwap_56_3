import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  selectNewExchanges,
  selectNewExchangesCount,
  selectViewedExchanges,
} from '@/features/exchange/model/exchangeSelectors'
import { clearViewed, markAllAsViewed, markAsViewed } from '@/features/exchange/model/exchangeSlice'
import { selectUsers } from '@/entities/user/model/usersSelectors'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { formatNotificationDate } from '@/shared/lib/helpers'
import type { ExchangeNotification } from '@/shared/types'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import { Popover } from '@/shared/ui/popover'
import styles from './notifications-menu.module.css'
import type { NotificationPopoverProps } from './type'

export const NotificationPopover = ({ panel, className }: NotificationPopoverProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const newExchanges = useAppSelector(selectNewExchanges)
  const viewedExchanges = useAppSelector(selectViewedExchanges)
  const newCount = useAppSelector(selectNewExchangesCount)
  const users = useAppSelector(selectUsers)

  const [isOwnOpen, setIsOwnOpen] = useState(false)
  const currentPanel = panel ?? { isOpen: isOwnOpen, isOpenChange: setIsOwnOpen }

  const usersById = useMemo(() => new Map(users.map((user) => [user.id, user])), [users])

  const handleGo = (userId: string) => {
    const skillId = usersById.get(userId)?.teachSkill.id
    dispatch(markAsViewed(userId))
    currentPanel.isOpenChange(false)

    if (skillId) {
      navigate(`/skill/${skillId}`)
    }
  }

  const renderItem = (notification: ExchangeNotification, withButton: boolean) => {
    const user = usersById.get(notification.userId)

    return (
      <li key={notification.userId} className={styles.item}>
        <span className={styles.itemIcon}>
          <Icon name="skills" size={24} />
        </span>

        <div className={styles.itemBody}>
          <p className={styles.itemTitle}>Вы предложили обмен {user?.name ?? ''}</p>
          <p className={styles.itemText}>Перейдите в профиль, чтобы обсудить детали</p>

          {withButton && (
            <Button extraClass={styles.goButton} onClick={() => handleGo(notification.userId)}>
              Перейти
            </Button>
          )}
        </div>

        <span className={styles.itemDate}>{formatNotificationDate(notification.createdAt)}</span>
      </li>
    )
  }

  return (
    <div className={styles.root}>
      <Popover
        panel={currentPanel}
        className={`${styles.panel} ${className ?? ''}`.trim()}
        trigger={
          <Button
            extraClass={styles.bell}
            aria-label={newCount > 0 ? `Уведомления, новых: ${newCount}` : 'Уведомления'}
          >
            <Icon name="notification" size={24} />
            {newCount > 0 && <span className={styles.badge} />}
          </Button>
        }
      >
        {newExchanges.length === 0 && viewedExchanges.length === 0 && (
          <p className={styles.empty}>Уведомлений пока нет</p>
        )}

        {newExchanges.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Новые уведомления</h3>
              <Button extraClass={styles.action} onClick={() => dispatch(markAllAsViewed())}>
                Прочитать все
              </Button>
            </div>

            <ul className={styles.list}>
              {newExchanges.map((notification) => renderItem(notification, true))}
            </ul>
          </section>
        )}

        {viewedExchanges.length > 0 && (
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>Просмотренные</h3>
              <Button extraClass={styles.action} onClick={() => dispatch(clearViewed())}>
                Очистить
              </Button>
            </div>

            <ul className={`${styles.list} ${styles.listViewed}`}>
              {viewedExchanges.map((notification) => renderItem(notification, false))}
            </ul>
          </section>
        )}
      </Popover>
    </div>
  )
}