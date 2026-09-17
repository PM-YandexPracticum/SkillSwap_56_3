import type { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  extraClass?: string;
};