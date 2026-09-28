export type CitySelectProps = {
  value: string | null
  onChange: (value: string | null) => void
  error?: string
  label?: string
  placeholder?: string
  className?: string
}
