import type { FC } from 'react'
import type { SkillInfoProps } from './type'
import styles from './skill-info.module.css'

export const SkillInfo: FC<SkillInfoProps> = ({
  title,
  category,
  subcategory,
  description,
  extraClass = '',
}) => {
  const categoryPath = subcategory ? `${category} / ${subcategory}` : category

  return (
    <div className={`${styles.container} ${extraClass}`.trim()}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.category}>{categoryPath}</p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}