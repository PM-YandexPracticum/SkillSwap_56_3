import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './more-button.module.css'
import type { MoreButtonProps } from './type'

export const MoreButton = ({ onClick, hasExchange = false }: MoreButtonProps) => {
  return (
    <Button
      onClick={hasExchange ? undefined : onClick}
      disabled={hasExchange}
      extraClass={styles.moreButton}
    >
      {hasExchange ? (
        <>
          <Icon name="clock" size={20} />
          <span>Обмен предложен</span>
        </>
      ) : (
        'Подробнее'
      )}
    </Button>
  )
}