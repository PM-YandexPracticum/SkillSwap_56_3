import type { GenderId, GenderOption } from '@/shared/types'

export type GenderFilterProps = {
  options?: GenderOption[]
  value?: GenderId
  defaultValue?: GenderId
  onChange?: (value: GenderId) => void
  name?: string
  title?: string
  extraClass?: string
}
