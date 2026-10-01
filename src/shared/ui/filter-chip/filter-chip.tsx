import { Button } from '../button'
import { Icon } from '../icon/Icon'
import type { FilterChipProps } from './type'
import style from './filter-chip.module.css'

export const FilterChip = ({ label, onRemove }: FilterChipProps) => {
  return (
    <Button
      type="button"
      onClick={onRemove}
      extraclass={style.chip}
      aria-label={`Удалить фильтр: ${label}`}
    >
      <span>{label}</span>
      <Icon name="cross" size={12} />
    </Button>
  )
}
