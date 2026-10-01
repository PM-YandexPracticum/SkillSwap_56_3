import { useAppSelector } from '@/store/hooks'
import { selectUsers } from '@/entities/user/model/usersSelectors'
import { UserCard } from '@/shared/ui/user-card'
import type { FavoritesSectionProps } from './type'
import styles from './favorites-section.module.css'
import { useProgressiveList } from '@/shared/hooks/useProgressiveList'

export const FavoritesSection = ({ ids, extraclass = '' }: FavoritesSectionProps) => {
  const allUsers = useAppSelector(selectUsers)
  const favoriteUsers = allUsers.filter((user) => ids.map(String).includes(String(user.id)))

  const { visibleItems, hasMore, sentinelRef } = useProgressiveList(favoriteUsers)

  return (
    <section className={`${styles.section} ${extraclass}`.trim()}>
      <h2 className={styles.title}>Избранное</h2>

      <div className={styles.grid}>
        {visibleItems.map((user) => (
          <UserCard key={user.id} user={user} isCatalog />
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />}
    </section>
  )
}
