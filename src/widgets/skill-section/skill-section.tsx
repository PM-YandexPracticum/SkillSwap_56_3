import { useAppSelector } from '@/store/hooks'
import { selectMeta, selectUsersByIds } from '@/entities/user/model/usersSelectors'
import { UserInfo } from '@/entities/user/ui/user-info'
import { TeachSkill } from '@/shared/ui/teach-skill'
import { LearnSkills } from '@/shared/ui/learn-skills'
import { OfferExchangeButton } from '@/shared/ui/offer-exchange-button'
import { ImageCarousel } from '@/shared/ui/image-carousel'
import { Icon } from '@/shared/ui/icon/Icon'
import { getCategoryTone } from '@/entities/skill/lib/category-tone'
import { getAgeFromBirth } from '@/shared/lib/helpers'
import type { SkillSectionProps } from './type'
import styles from './skill-section.module.css'

export function SkillSection({ skill }: SkillSectionProps) {
  const meta = useAppSelector(selectMeta)
  const authors = useAppSelector((state) => selectUsersByIds(state, [skill.authorId]))
  const author = authors[0]

  if (!meta || !author) return null

  const getCategoryName = (id: string): string =>
    meta.categories.find((c) => c.id === id)?.name ?? id

  const getSubcategoryName = (id: string): string => {
    for (const cat of meta.categories) {
      const sub = cat.subcategories.find((s) => s.id === id)
      if (sub) return sub.name
    }
    return id
  }

  const cityName = meta.cities.find((c) => c.id === author.city)?.name ?? author.city

  const teachSkillTag = {
    label: author.teachSkill.name,
    tone: getCategoryTone(getCategoryName(author.teachSkill.category)),
  }

  const learnSkillsTags = author.learnSkills.map((s) => ({
    label: s.name,
    tone: getCategoryTone(getCategoryName(s.category)),
  }))

  const handleOfferExchange = () => {
    // TODO: логика предложения обмена
  }

  return (
    <section className={styles.section}>
      {/* Левая колонка — автор */}
      <div className={styles.author}>
        <UserInfo
          name={author.name}
          avatarUrl={author.avatar}
          city={cityName}
          age={getAgeFromBirth(author.birthDate)}
        />

        <p className={styles.about}>{author.aboutMe}</p>

        <div className={styles.skills}>
          <TeachSkill skill={teachSkillTag} />
          <LearnSkills skills={learnSkillsTags} visible={2} />
        </div>
      </div>

      {/* Правая колонка — навык */}
      <div className={styles.skill}>
        {/* Иконки — правый верхний угол */}
        <div className={styles.skillActions}>
          <button type="button" className={styles.iconButton} aria-label="В избранное">
            <Icon name="heart" size={20} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Поделиться">
            <Icon name="share" size={20} />
          </button>
          <button type="button" className={styles.iconButton} aria-label="Ещё">
            <Icon name="moreSquare" size={20} />
          </button>
        </div>

        {/* Две колонки: контент + галерея */}
        <div className={styles.skillBody}>
          <div className={styles.skillContent}>
            <h1 className={styles.title}>{skill.title}</h1>
            <p className={styles.breadcrumbs}>
              {getCategoryName(skill.category)} / {getSubcategoryName(skill.subcategory)}
            </p>
            <p className={styles.description}>{skill.description}</p>

            {/* Кнопка — прижата к низу */}
            <div className={styles.skillButton}>
              <OfferExchangeButton onClick={handleOfferExchange} />
            </div>
          </div>

          {skill.images.length > 0 && (
            <div className={styles.gallery}>
              <ImageCarousel images={skill.images} alt={skill.title} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}