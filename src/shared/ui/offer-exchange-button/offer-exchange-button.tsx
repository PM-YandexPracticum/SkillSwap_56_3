import { Button } from '@/shared/ui/button';
import type { OfferExchangeButtonProps } from './type';
import styles from './offer-exchange-button.module.css';

const noop = () => {};

export const OfferExchangeButton = ({
  onClick = noop,
  disabled = false,
  extraClass = '',
}: OfferExchangeButtonProps) => {
  const combinedClassName = `${styles.offerButton} ${extraClass}`.trim();

  return (
    <Button
      type="button"
      onClick={disabled ? undefined : onClick}
      extraClass={combinedClassName}
    >
      Предложить обмен
    </Button>
  );
};