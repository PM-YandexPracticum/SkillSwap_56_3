import { useState, type FC } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { incrementLike } from '@/entities/skill/model/skillsSlice'
import { IconsBlock } from '@/shared/ui/icons-block'
import { ImageCarousel } from '@/shared/ui/image-carousel'
import { OfferExchangeButton } from '@/shared/ui/offer-exchange-button'
import { SkillInfo } from '@/entities/skill/ui/skill-info'
import type { SkillCardProps } from './type'
import styles from './skill-card.module.css'

export const SkillCard: FC<SkillCardProps> = ({
  skill,
  onOfferExchange,
  onShare,
  onMoreClick,
  extraClass = '',
}) => {
  const dispatch = useAppDispatch()
  const [isFav, setIsFav] = useState(Boolean(skill.isFavorite))

  const handleFavoriteChange = () => {
    setIsFav((prev) => !prev)
    dispatch(incrementLike(skill.id))
  }

  return (
    <article className={`${styles.card} ${extraClass}`.trim()}>
      <div className={styles.topActions}>
        <IconsBlock
          isFavorite={isFav}
          onFavoriteChange={handleFavoriteChange}
          onShare={onShare}
          onMoreClick={onMoreClick}
        />
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftCol}>
          <SkillInfo
            title={skill.title}
            category={skill.category}
            subcategory={skill.subcategory}
            description={skill.description}
          />

          <div className={styles.buttonWrapper}>
            <OfferExchangeButton onClick={onOfferExchange} />
          </div>
        </div>

        <div className={styles.rightCol}>
          <ImageCarousel images={skill.images ?? []} alt={skill.title} />
        </div>
      </div>
    </article>
  )
}