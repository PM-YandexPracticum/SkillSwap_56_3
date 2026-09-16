import type { MouseEvent } from 'react';

export type ButtonProps = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  extraClass?: string;
};