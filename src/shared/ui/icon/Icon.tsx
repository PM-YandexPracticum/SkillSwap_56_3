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
      fill="currentColor"
      stroke="none"
      d="M12 20.954c-.288 0-.567-.038-.8-.121-3.553-1.219-9.2-5.545-9.2-11.935 0-3.256 2.633-5.898 5.87-5.898A5.78 5.78 0 0 1 12 4.712a5.78 5.78 0 0 1 4.13-1.712c3.237 0 5.87 2.651 5.87 5.898 0 6.4-5.646 10.716-9.2 11.935-.233.083-.512.12-.8.12M7.87 4.394c-2.465 0-4.475 2.019-4.475 4.503 0 6.353 6.112 9.888 8.26 10.623.168.056.531.056.699 0 2.139-.735 8.26-4.26 8.26-10.623 0-2.484-2.01-4.503-4.475-4.503A4.42 4.42 0 0 0 12.567 6.2c-.26.353-.855.353-1.116 0A4.44 4.44 0 0 0 7.87 4.395"
    />
  ),

  'heart-filled': (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 20.954c-.288 0-.567-.038-.8-.121-3.553-1.219-9.2-5.545-9.2-11.935 0-3.256 2.633-5.898 5.87-5.898A5.78 5.78 0 0 1 12 4.712a5.78 5.78 0 0 1 4.13-1.712c3.237 0 5.87 2.651 5.87 5.898 0 6.4-5.646 10.716-9.2 11.935-.233.083-.512.12-.8.12"
    />
  ),

  'chevron-left': (
    <path
      d="m15 18-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  'chevron-right': (
    <path
      d="m9 18 6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  'image-placeholder': (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="m21 15-5-5L5 21" strokeWidth="2" strokeLinecap="round" />
    </>
  ),

  'chevron-down': (
    <path
      d="m6 9.5 6 5.5 6-5.5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),

  cross: (
    <>
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  )
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