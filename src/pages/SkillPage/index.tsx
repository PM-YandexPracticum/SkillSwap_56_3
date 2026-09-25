import { useAppSelector } from '@/store/hooks'
import {
  selectCurrentSkill,
  selectCurrentSkillLoading,
  selectCurrentSkillError,
} from '@/entities/skill/model/skillsSelectors'
import { SkillCard } from '@/widgets/skill-card'
import { Loader } from '@/shared/ui/loader'

export default function SkillPage() {
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
