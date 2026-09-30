import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadSkillById } from '@/entities/skill/model/skillsThunks'
import {
  selectCurrentSkill,
  selectCurrentSkillLoading,
  selectCurrentSkillError,
} from '@/entities/skill/model/skillsSelectors'
import { selectMeta, selectUserById } from '@/entities/user/model/usersSelectors'
import { SkillDetailsSection } from '@/widgets/skill-details-section'
import { SimilarSection } from '@/widgets/similar-section'
import { Loader } from '@/shared/ui/loader'
import styles from './skill-page.module.css'
import { UserCard } from '@/shared/types'
import { MainHeader } from '@/widgets/header/ui'
import { Footer } from '@/widgets/footer'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(selectMeta)

  const skill = useAppSelector(selectCurrentSkill)
  const isLoading = useAppSelector(selectCurrentSkillLoading)
  const error = useAppSelector(selectCurrentSkillError)
  const author = useAppSelector((state) =>
    skill ? selectUserById(state, skill.authorId) : null
  )

  useEffect(() => {
    if (id) dispatch(loadSkillById(id))
  }, [dispatch, id])

  const subcategoryName = useMemo(() => {
    if (!skill) return ''
    if (!meta) return skill.subcategory
    for (const cat of meta.categories) {
      const sub = cat.subcategories.find((s) => s.id === skill.subcategory)
      if (sub) return sub.name
    }
    return skill.subcategory
  }, [meta, skill])

  const main = () => {
    if (isLoading) {
      return (
        <main className={`${styles.container} ${styles.center}`.trim()}>
          <Loader size="large" />
        </main>
      )
    }

    if (error) {
      return (
        <main className={`${styles.container} ${styles.center}`.trim()}>
          <div className={styles.message}>{error}</div>
        </main>
      )
    }

    if (!skill) {
      return (
        <main className={`${styles.container} ${styles.center}`.trim()}>
          <div className={styles.message}>Навык не найден</div>
        </main>
      )
    }

    return (
      <main className={styles.container}>
        <SkillDetailsSection skill={skill} author={author as UserCard}/>
        <SimilarSection
          subcategory={subcategoryName}
          excludeAuthorId={skill.authorId}
        />
      </main>
    )
  }

  return (
    <>
      <MainHeader />
      {main()}
      <Footer />
    </>
  )
}