import type { WantId, WantOption } from '@/shared/types'

export type WantFilterProps = {
  options?: WantOption[]
  value?: WantId
  defaultValue?: WantId
  onChange?: (value: WantId) => void
  name?: string
  extraClass?: string
}
