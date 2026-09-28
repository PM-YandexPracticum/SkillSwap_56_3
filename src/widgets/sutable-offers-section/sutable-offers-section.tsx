import { useAppSelector } from '@/store/hooks'
import { selectFilteredUsers, selectFilters } from '@/entities/filter/model/filterSelectors'
import { UserCard } from '@/shared/ui/user-card'
import { SortButton } from '@/shared/ui/sort-button'
import type { SutableOffersProps } from './type'
import styles from './sutable-offers-section.module.css'
import { useProgressiveList } from '@/shared/hooks/useProgressiveList'
import { useEffect } from 'react'

export const SutableOffersSection = ({ extraClass = '' }: SutableOffersProps) => {
  const users = useAppSelector(selectFilteredUsers)
  const filters = useAppSelector(selectFilters)

  const { visibleItems, totalCount, hasMore, sentinelRef, reset } = useProgressiveList(users)

  useEffect(() => {
    reset()
  }, [filters, reset])

  return (
    <section className={`${styles.section} ${extraClass}`.trim()}>
      <div className={styles.header}>
        <h2 className={styles.title}>Подходящие предложения: {totalCount}</h2>
        <SortButton />
      </div>

      {totalCount === 0 ? (
        <div className={styles.empty}>Ничего не найдено. Попробуйте изменить фильтры</div>
      ) : (
        <div className={styles.grid}>
          {visibleItems.map((user) => (
            <UserCard key={user.id} user={user} isCatalog />
          ))}
          {hasMore && <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />}
        </div>
      )}
    </section>
  )
}
