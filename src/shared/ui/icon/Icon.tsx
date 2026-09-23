import type { ReactNode } from 'react'
import type { IconName } from './types'

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

  sun: (
    <>
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),

  moon: (
    <path
      d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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
    <path d="m6 9.5 6 5.5 6-5.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),

  cross: (
    <path d="M5 5L19 19M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  ),

  sort: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        d="M7.564 4.822a.69.69 0 0 1-.49-.203L4.127 1.672 1.18 4.62a.697.697 0 0 1-.98 0 .697.697 0 0 1 0-.98L3.638.204a.69.69 0 0 1 .98 0L8.053 3.64a.697.697 0 0 1 0 .979.69.69 0 0 1-.49.203"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M4.127 18.014a.7.7 0 0 1-.693-.693V.693c0-.379.314-.693.693-.693s.693.314.693.693V17.32a.7.7 0 0 1-.693.693M13.873 18.013a.7.7 0 0 1-.49-.203l-3.436-3.436a.697.697 0 0 1 0-.98.697.697 0 0 1 .979 0l2.947 2.947 2.947-2.947a.697.697 0 0 1 .979 0 .697.697 0 0 1 0 .98l-3.436 3.436a.7.7 0 0 1-.49.203"
      />
      <path
        fill="currentColor"
        stroke="none"
        d="M13.864 18.014a.7.7 0 0 1-.693-.693V.693c0-.379.314-.693.693-.693s.693.314.693.693V17.32a.69.69 0 0 1-.693.693"
      />
    </>
  ),
}

type IconProps = {
  name: IconName
  size?: number
}

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
  )
}
