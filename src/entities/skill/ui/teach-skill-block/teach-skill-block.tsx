import { Tag } from '@/shared/ui/tag'
import { getCategoryTone } from '@/entities/skill/lib/category-tone'
import styles from './teach-skill-block.module.css'
import { TeachSkillBlockProps } from './type'

export const TeachSkillBlock = ({ name, category }: TeachSkillBlockProps) => {
  return (
    <div className={styles.teachSkillBlock}>
      <span className={styles.label}>Может научить</span>
      <Tag label={name} tone={getCategoryTone(category)} />
    </div>
  )
}
