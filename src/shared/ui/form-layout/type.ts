import type { ReactNode } from 'react';

export interface FormLayoutProps {
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  headerCenter?: ReactNode;
  children?: ReactNode;
  extraclass?: string;
  closeTo?: string;
}