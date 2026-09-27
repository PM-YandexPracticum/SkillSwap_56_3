import { useAppSelector } from '@/store/hooks'
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from '@/entities/user/model/usersSelectors'
import { selectIsFiltering } from '@/entities/filter/model/filterSelectors'
import { ActiveFiltersBar } from '@/entities/filter/ui/active-filters-bar'
import { FilterPanel } from '@/widgets/filter-panel'
import { SutableOffersSection } from '@/widgets/sutable-offers-section'
import { PopularSection } from '@/widgets/popular-section'
import { NewSection } from '@/widgets/new-section'
import { RecommendedSection } from '@/widgets/recommended-section'
import { Loader } from '@/shared/ui/loader'
import styles from './catalog-page.module.css'

export default function CatalogPage() {
  const users = useAppSelector(selectUsers)
  const isLoading = useAppSelector(selectUsersLoading)
  const error = useAppSelector(selectUsersError)
  const isFiltering = useAppSelector(selectIsFiltering)

  return isLoading && users.length === 0 ? (
    <main className={styles.containerMain}>
      <Loader size="large" />
    </main>
  ) : error && users.length === 0 ? (
    <main className={styles.containerMain}>
      <div className={styles.message}>{error}</div>
    </main>
  ) : !isLoading && !error && users.length === 0 ? (
    <main className={styles.containerMain}>
      <div className={styles.message}>Нет пользователей</div>
    </main>
  ) : (
    <main className={`${styles.containerMain} ${styles.withCards}`}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <FilterPanel />
        </aside>

        <div className={styles.content}>
  {isFiltering ? (
    <>
      <ActiveFiltersBar />
      <SutableOffersSection />
    </>
  ) : (
    <>
      <PopularSection />
      <NewSection />
      <RecommendedSection />
    </>
  )}
</div>
      </div>
    </main>
  )
}