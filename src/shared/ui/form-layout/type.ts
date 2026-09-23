import type { ReactNode } from 'react';

export interface FormLayoutProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  headerCenter?: ReactNode;
  children?: ReactNode;
  extraClass?: string; //Дополнительный класс для внешней обертки
  closeTo?: string;
}