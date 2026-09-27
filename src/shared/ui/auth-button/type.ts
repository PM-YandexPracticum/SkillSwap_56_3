import type { MouseEvent, ReactNode } from 'react';

export type AuthButtonProps = {
  onClick?: (e: MouseEvent) => void;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};
