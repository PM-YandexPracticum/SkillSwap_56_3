import { Tag } from '../tag'
import { LearnSkillsProps } from './type'
import style from './learn-skills.module.css'

export const LearnSkills = ({ skills, visible }: LearnSkillsProps) => {
  const visibleSkills = skills.slice(0, visible)
  const remainingCount = skills.length - visibleSkills.length

  return (
    <div className={style.learnSkills}>
      <h3 className={style.title}>Хочет научиться:</h3>
      <div className={style.tags}>
        {visibleSkills.map((skill, index) => (
          <Tag key={index} label={skill.label} tone={skill.tone} />
        ))}
        {remainingCount > 0 && <Tag label={`+${remainingCount}`} tone="neutral" />}
      </div>
    </div>
  )
}
