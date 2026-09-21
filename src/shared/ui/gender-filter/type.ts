import type { Gender, GenderOption } from '@/shared/types'

export type GenderFilterProps = {
  options: GenderOption[]
  value?: Gender
  defaultValue?: Gender
  onChange?: (value: Gender) => void
  name?: string
  title?: string
  extraClass?: string
}