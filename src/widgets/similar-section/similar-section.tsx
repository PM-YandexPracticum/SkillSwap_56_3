import { useState } from 'react'
import { useAppSelector } from '@/store/hooks'
import { selectSimilarUsers } from '@/entities/user/model/usersSelectors'
import { UserCard } from '@/shared/ui/user-card'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './similar-section.module.css'
import { SimilarSectionProps } from './type'

const VISIBLE_COUNT = 4
const CARD_WIDTH = 324
const GAP = 24
const STEP = CARD_WIDTH + GAP

export function SimilarSection({ subcategory, excludeAuthorId }: SimilarSectionProps) {
  const users = useAppSelector((state) => selectSimilarUsers(state, subcategory, excludeAuthorId))
  const [startIndex, setStartIndex] = useState(0)

  if (users.length === 0) {
    return null
  }

  const hasNext = startIndex + VISIBLE_COUNT < users.length
  const canScroll = users.length > VISIBLE_COUNT

  const handleNext = () => {
    setStartIndex((index) => index + 1)
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Похожие предложения</h2>
      <div className={styles.slider}>
        <div
          className={styles.viewport}
          style={{ maxWidth: VISIBLE_COUNT * CARD_WIDTH + (VISIBLE_COUNT - 1) * GAP }}
        >
          <div
            className={styles.track}
            style={{ gap: GAP, transform: `translateX(-${startIndex * STEP}px)` }}
          >
            {users.map((user) => (
              <UserCard key={user.id} user={user} isCatalog />
            ))}
          </div>
        </div>
        {canScroll && (
          <button
            type="button"
            className={styles.arrow}
            onClick={handleNext}
            disabled={!hasNext}
            aria-label="Показать следующее предложение"
          >
            <Icon name="chevron-right" size={16} />
          </button>
        )}
      </div>
    </section>
  )
}
