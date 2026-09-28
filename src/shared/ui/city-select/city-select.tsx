import { selectMeta } from '@/entities/user/model/usersSelectors'
import { useAppSelector } from '@/store/hooks'
import { Select } from '@/shared/ui/select'
import type { SelectValue } from '@/shared/ui/select/type'
import type { CitySelectProps } from './type'

export const CitySelect = ({
  value,
  onChange,
  error,
  label = 'Город',
  placeholder = 'Не указан',
  className,
}: CitySelectProps) => {
  const meta = useAppSelector(selectMeta)

  const options = (meta?.cities ?? []).map((city) => ({ id: city.id, label: city.name }))

  const handleChange = (next: SelectValue) => {
    onChange(typeof next === 'string' ? next : null)
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      error={error}
      searchable
      className={className}
    />
  )
}