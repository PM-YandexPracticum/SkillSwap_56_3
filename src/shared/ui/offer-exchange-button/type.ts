import type { MouseEvent } from 'react';

export interface OfferExchangeButtonProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  extraClass?: string;
}