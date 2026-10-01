import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import type { OfferExchangeButtonProps } from './type'
import styles from './offer-exchange-button.module.css'

const noop = () => {}

export const OfferExchangeButton = ({
  onClick = noop,
  disabled = false,
  hasExchange = false,
  extraclass = '',
}: OfferExchangeButtonProps) => {
  const combinedClassName = `${styles.offerButton} ${hasExchange ? styles.disabled : ''} ${extraclass}`.trim()

  return (
    <Button
      type="button"
      onClick={hasExchange || disabled ? undefined : onClick}
      extraclass={combinedClassName}
    >
      {hasExchange ? (
        <>
          <Icon name="clock" size={20} />
          <span>Обмен предложен</span>
        </>
      ) : (
        'Предложить обмен'
      )}
    </Button>
  )
}