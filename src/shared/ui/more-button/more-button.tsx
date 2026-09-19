import { Button } from '@/shared/ui/button'
import styles from './more-button.module.css'
import { MoreButtonProps } from './type'

export const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <Button onClick={onClick} extraClass={styles.moreButton}>
      Подробнее
    </Button>
  )
}
