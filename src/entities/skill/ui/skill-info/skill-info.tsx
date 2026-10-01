import type { FC } from 'react'
import type { SkillInfoProps } from './type'
import styles from './skill-info.module.css'
import { useAppSelector } from '@/store/hooks'
import { selectMeta } from '@/entities/user/model/usersSelectors'

export const SkillInfo: FC<SkillInfoProps> = ({
  title,
  category,
  subcategory,
  description,
  extraclass = '',
}) => {
  const meta = useAppSelector(selectMeta);
  const getCategoryName = (categoryId: string): string =>
    meta?.categories.find((category) => category.id === categoryId)?.name ?? categoryId

  const getSubcategoryName = (subcategoryId: string): string => {
    for (const category of meta?.categories ?? []) {
      const sub = category.subcategories.find((s) => s.id === subcategoryId)
      if (sub) return sub.name
    }
    return subcategoryId
  }

  const categoryPath = subcategory 
    ? `${getCategoryName(category)} / ${getSubcategoryName(subcategory)}` 
    : category

  return (
    <div className={`${styles.container} ${extraclass}`.trim()}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.category}>{categoryPath}</p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  )
}