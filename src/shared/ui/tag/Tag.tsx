import type { TagProps } from './types'
import styles from './Tag.module.css'

export function Tag({ label, tone = 'neutral' }: TagProps) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{label}</span>
}
