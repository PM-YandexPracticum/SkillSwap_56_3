import type { ReactNode } from 'react';
import type { IconName } from './types';

const paths: Record<IconName, ReactNode> = {
  logo: (
    <path
      d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),

  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" strokeWidth="2" />
      <path d="m16 16 5 5" strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  heart: (
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),

  'heart-filled': (
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}