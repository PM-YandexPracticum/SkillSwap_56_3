import { useAppSelector } from '@/store/hooks'
import {
  selectCurrentSkill,
  selectCurrentSkillLoading,
  selectCurrentSkillError,
} from '@/entities/skill/model/skillsSelectors'
import { SkillCard } from '@/widgets/skill-card'
import { Loader } from '@/shared/ui/loader'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/store/hooks'
import { useEffect } from 'react'
import { loadSkillById } from '@/entities/skill/model/skillsThunks'

export default function SkillPage() {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id) {
      dispatch(loadSkillById(id))
    }
  }, [id, dispatch])

  const skill = useAppSelector(selectCurrentSkill)
  const isLoading = useAppSelector(selectCurrentSkillLoading)
  const error = useAppSelector(selectCurrentSkillError)

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
