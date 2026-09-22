import { useAppSelector } from '@/store/hooks'
import { selectFilteredUsers, selectFilteredUsersCount } from '@/entities/filter/model/filterSelectors'
import { UserCard } from '@/shared/ui/user-card'
import { SortButton } from '@/shared/ui/sort-button'
import type { SutableOffersProps } from './type'
import styles from './sutable-offers-section.module.css'

export const SutableOffersSection = ({
  onMore,
  extraClass = '',
}: SutableOffersProps) => {
  const users = useAppSelector(selectFilteredUsers)
  const count = useAppSelector(selectFilteredUsersCount)

  return (
    <section className={`${styles.section} ${extraClass}`.trim()}>
      <div className={styles.header}>
        <h2 className={styles.title}>Подходящие предложения: {count}</h2>
        <SortButton />
      </div>

      {users.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено. Попробуйте изменить фильтры.</p>
      ) : (
        <div className={styles.grid}>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isCatalog
              onMore={onMore}
            />
          ))}
        </div>
      )}
    </section>
  )
}