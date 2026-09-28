import { selectMeta } from '@/entities/user/model/usersSelectors'
import { useAppSelector } from '@/store/hooks'
import { Select } from '@/shared/ui/select'
import type { SelectValue } from '@/shared/ui/select/type'
import type { GenderSelectProps, GenderValue } from './type'

export const GenderSelect = ({
  value,
  onChange,
  error,
  label = 'Пол',
  placeholder = 'Не указан',
  className,
}: GenderSelectProps) => {
  const meta = useAppSelector(selectMeta)

  const options = (meta?.genders ?? [])
    .filter((gender) => gender.id !== 'all')
    .map((gender) => ({ id: gender.id, label: gender.name }))

  const handleChange = (next: SelectValue) => {
    onChange(typeof next === 'string' ? (next as GenderValue) : null)
  }

  return (
    <Select
      options={options}
      value={value}
      onChange={handleChange}
      label={label}
      placeholder={placeholder}
      error={error}
      searchable={false}
      className={className}
    />
  )
}
