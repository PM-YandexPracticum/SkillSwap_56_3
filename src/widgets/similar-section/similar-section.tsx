import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectSimilarUsers } from '@/entities/user/model/usersSelectors'
import { UserCard } from '@/shared/ui/user-card'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './similar-section.module.css'
import { SimilarSectionProps } from './type'

const VISIBLE_COUNT = 4
const GAP = 24

export function SimilarSection({ subcategory, excludeAuthorId }: SimilarSectionProps) {
  const users = useAppSelector((state) => selectSimilarUsers(state, subcategory, excludeAuthorId))
  const [startIndex, setStartIndex] = useState(0)

  if (users.length === 0) {
    return null
  }

  const hasPrev = startIndex > 0
  const hasNext = startIndex + VISIBLE_COUNT < users.length
  const canScroll = users.length > VISIBLE_COUNT

  const totalGap = GAP * (VISIBLE_COUNT - 1)
  const step = `((100% - ${totalGap}px) / ${VISIBLE_COUNT} + ${GAP}px)`

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Похожие предложения</h2>
      <div className={styles.slider}>
        <div className={styles.viewport}>
          <div
            className={styles.track}
            style={{ transform: `translateX(calc(${-startIndex} * ${step}))` }}
          >
            {users.map((user) => (
              <div key={user.id} className={styles.slide}>
                <UserCard user={user} isCatalog />
              </div>
            ))}
          </div>
        </div>

        {canScroll && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowPrev}`}
              onClick={() => setStartIndex((index) => index - 1)}
              disabled={!hasPrev}
              aria-label="Показать предыдущее предложение"
            >
              <Icon name="chevron-left" size={16} />
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowNext}`}
              onClick={() => setStartIndex((index) => index + 1)}
              disabled={!hasNext}
              aria-label="Показать следующее предложение"
            >
              <Icon name="chevron-right" size={16} />
            </button>
          </>
        )}
      </div>
    </section>
  )
}
