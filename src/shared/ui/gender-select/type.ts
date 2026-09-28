import type { Gender } from '@/shared/types'

export type GenderValue = Exclude<Gender, 'all'>

export type GenderSelectProps = {
  value: GenderValue | null
  onChange: (value: GenderValue | null) => void
  error?: string
  label?: string
  placeholder?: string
  className?: string
}
