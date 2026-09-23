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
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),

  heart: (
    <>
      <path
        fill="currentColor"
        stroke="none"
        d="M10 17.954c-.288 0-.567-.038-.8-.121C5.647 16.614 0 12.288 0 5.898 0 2.642 2.633 0 5.87 0A5.78 5.78 0 0 1 10 1.712 5.78 5.78 0 0 1 14.13 0C17.367 0 20 2.651 20 5.898c0 6.4-5.646 10.716-9.2 11.935-.233.083-.512.12-.8.12M5.87 1.394c-2.465 0-4.475 2.019-4.475 4.503 0 6.353 6.112 9.888 8.26 10.623.168.056.531.056.699 0 2.139-.735 8.26-4.26 8.26-10.623 0-2.484-2.01-4.503-4.475-4.503A4.42 4.42 0 0 0 10.567 3.2c-.26.353-.855.353-1.116 0A4.44 4.44 0 0 0 5.87 1.395"
      />
    </>
  ),

  chevronDown: (
    <path d="m6 9.5 6 5.5 6-5.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),

  chevronRight: (
    <path d="m9.5 6 5.5 6-5.5 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),

  google: (
    <>
      <path
        fill="#4285F4"
        stroke="none"
        d="M21.6 12.23c0-.7-.06-1.37-.18-2.02H12v3.82h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.3 2.98-7.32Z"
      />
      <path
        fill="#34A853"
        stroke="none"
        d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.51c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.6-4.12H3.07v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        stroke="none"
        d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.07a10 10 0 0 0 0 9l3.33-2.6Z"
      />
      <path
        fill="#EA4335"
        stroke="none"
        d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.87-2.87C16.95 2.99 14.7 2 12 2a10 10 0 0 0-8.93 5.5L6.4 10.1c.8-2.36 3-4.12 5.6-4.12Z"
      />
    </>
  ),

  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M17.05 12.54c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.9-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.88 2.65 3.22 2.6 1.29-.05 1.78-.84 3.34-.84 1.56 0 2 .84 3.37.81 1.39-.02 2.27-1.27 3.12-2.53.98-1.45 1.39-2.85 1.41-2.92-.03-.01-2.7-1.04-2.73-4.12ZM14.5 4.88c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.14 1.14.09 2.3-.58 3.02-1.43Z"
    />
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
