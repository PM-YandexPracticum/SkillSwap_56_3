import { type FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleLike } from '@/entities/user/model/usersSlice'
import { selectLikedUserIds, selectUserById } from '@/entities/user/model/usersSelectors'
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
  hasExchange,
  extraClass = '',
}) => {
  const dispatch = useAppDispatch()
  const likedUserIds = useAppSelector(selectLikedUserIds)
  const isFavorite = likedUserIds.includes(skill.authorId)

  const author = useAppSelector((state) =>
    selectUserById(state, skill.authorId)
  )

  const handleFavoriteChange = () => {
    dispatch(toggleLike(skill.authorId))
  }

  return (
    <article className={`${styles.card} ${extraClass}`.trim()}>
      <div className={styles.topActions}>
        <IconsBlock
          isFavorite={isFavorite}
          onFavoriteChange={handleFavoriteChange}
          count={author?.likesCount as number}
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
            <OfferExchangeButton onClick={onOfferExchange} hasExchange={hasExchange} />
          </div>
        </div>

        <div className={styles.rightCol}>
          <ImageCarousel images={skill.images ?? []} alt={skill.title} />
        </div>
      </div>
    </article>
  )
}