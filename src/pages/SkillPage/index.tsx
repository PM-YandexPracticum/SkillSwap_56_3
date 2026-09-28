import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadSkillById } from '@/entities/skill/model/skillsThunks'
import { useAppSelector } from '@/store/hooks'
import {
  selectCurrentSkill,
  selectCurrentSkillLoading,
  selectCurrentSkillError,
} from '@/entities/skill/model/skillsSelectors'

import { selectMeta } from '@/entities/user/model/usersSelectors'
import { SkillSection } from '@/widgets/skill-section'
import { SimilarSection } from '@/widgets/similar-section'
import { Loader } from '@/shared/ui/loader'
import styles from './skill-page.module.css'
import { SkillCard } from '@/widgets/skill-card'
import { Loader } from '@/shared/ui/loader'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import { loadSkillById } from '@/entities/skill/model/skillsThunks'
import { MainHeader } from '@/widgets/header/ui'
import { Footer } from '@/widgets/footer'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const meta = useAppSelector(selectMeta)

  useEffect(() => {
    if (id) {
      dispatch(loadSkillById(id))
    }
  }, [id, dispatch])

  const skill = useAppSelector(selectCurrentSkill)
  const isLoading = useAppSelector(selectCurrentSkillLoading)
  const error = useAppSelector(selectCurrentSkillError)

  useEffect(() => {
    if (id) dispatch(loadSkillById(id))
  }, [dispatch, id])

  // id подкатегории → название (для SimilarSection)
  const subcategoryName = useMemo(() => {
    if (!skill) return ''
    if (!meta) return skill.subcategory
    for (const cat of meta.categories) {
      const sub = cat.subcategories.find((s) => s.id === skill.subcategory)
      if (sub) return sub.name
    }
    return skill.subcategory
  }, [meta, skill])

  if (isLoading) {
    return (
      <main className={styles.container}>
        <Loader size="large" />
      </main>
    )
  }

  if (error) {
    return (
      <main className={styles.container}>
        <div className={styles.message}>{error}</div>
      </main>
    )
  }

  if (!skill) {
    return (
      <main className={styles.container}>
        <div className={styles.message}>Навык не найден</div>
  const main = () => {
    if (isLoading) {
      return (
        <main style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <Loader size="large" />
        </main>
      )
    }

    if (error || !skill) {
      return (
        <main style={{ textAlign: 'center', padding: '60px 0' }}>
          <p>{error ?? 'Навык не найден'}</p>
        </main>
      )
    }

    return (
      <main style={{ maxWidth: 1120, margin: '40px auto', padding: '0 20px' }}>
        <SkillCard skill={skill} />
      </main>
    )
  }

  return (
    <main className={styles.container}>
      <SkillSection skill={skill} />
      <SimilarSection
        subcategory={subcategoryName}
        excludeAuthorId={skill.authorId}
      />
    </main>
    <>
      <MainHeader />
      {main()}
      <Footer />
    </>
  )
}