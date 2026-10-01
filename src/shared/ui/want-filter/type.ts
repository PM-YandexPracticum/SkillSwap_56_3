import type { WantFilter, WantFilterOption } from "@/shared/types";

export type WantFilterProps = {
  options: WantFilterOption[]
  value?: WantFilter
  defaultValue?: WantFilter
  onChange?: (value: WantFilter) => void
  name?: string
  extraclass?: string
}