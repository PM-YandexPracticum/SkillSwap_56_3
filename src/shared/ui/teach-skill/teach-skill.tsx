import { Tag } from '../tag'
import { TeachSkillProps } from './type'
import styles from './teach-skill.module.css'

export const TeachSkill = ({ skill }: TeachSkillProps) => {
  return (
    <div className={styles.teachSkill}>
      <h3 className={styles.title}>Может научить:</h3>
      <Tag label={skill.label} tone={skill.tone} />
    </div>
  )
}
