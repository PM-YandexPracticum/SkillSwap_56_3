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
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
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
