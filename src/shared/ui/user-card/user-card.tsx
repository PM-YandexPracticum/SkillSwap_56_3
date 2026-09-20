import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { UserCardProps } from './type'
import { UserInfo } from '@/entities/user/ui/user-info'
import { TeachSkill } from '@/shared/ui/teach-skill'
import { LearnSkills } from '@/shared/ui/learn-skills'
import { MoreButton } from '@/shared/ui/more-button'
import { FavoriteButton } from '@/shared/ui/favorite-button'
import { getCategoryTone } from '@/entities/skill/lib/category-tone'
import { selectMeta, selectLikedUserIds } from '@/entities/user/model/usersSelectors'
import { toggleLike } from '@/entities/user/model/usersSlice'
import styles from './user-card.module.css'

export const UserCard = ({ user, onMore, isCatalog = false }: UserCardProps) => {
  const dispatch = useAppDispatch()
  const meta = useAppSelector(selectMeta)
  const likedUserIds = useAppSelector(selectLikedUserIds)
  const isFavorite = likedUserIds.includes(user.id)

  const getCategoryName = (categoryId: string): string => {
    const category = meta?.categories.find((category) => category.id === categoryId)
    return category?.name ?? categoryId
  }

  const getCityName = (cityId: string): string => {
    const city = meta?.cities.find((city) => city.id === cityId)
    return city?.name ?? cityId
  }

  const teachSkillTag = {
    label: user.teachSkill.name,
    tone: getCategoryTone(getCategoryName(user.teachSkill.category)),
  }

  const learnSkillsTags = user.learnSkills.map((skill) => ({
    label: skill.name,
    tone: getCategoryTone(getCategoryName(skill.category)),
  }))

  const handleToggleFavorite = () => {
    dispatch(toggleLike(user.id))
  }

  const handleMore = () => {
    onMore?.(user.id)
  }

  return (
    <article className={styles.userCard}>
      {isCatalog && (
        <div className={styles.favoriteWrapper}>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleToggleFavorite}
          />
          <span className={styles.likesCount}>{user.likesCount}</span>
        </div>
      )}
      <UserInfo
        name={user.name}
        avatarUrl={user.avatar}
        city={getCityName(user.city)}
        /*Добавить сюда обработку возраста когда задача будет готова*/
        age={30}
      />
      {!isCatalog && user.aboutMe && (
        <p className={styles.description}>{user.aboutMe}</p>
      )}
      <div className={styles.skills}>
        <TeachSkill skill={teachSkillTag} />
        <LearnSkills skills={learnSkillsTags} visible={isCatalog ? 2 : user.learnSkills.length} />
      </div>
      {isCatalog && <MoreButton onClick={handleMore} />}
    </article>
  )
}