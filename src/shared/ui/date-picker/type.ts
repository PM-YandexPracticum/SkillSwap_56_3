export type DatePickerProps = {
  value: Date | null
  label?: string 
  onChange: (date: Date | null) => void
  placeholder?: string
  extraclass?: string
  error?: string
}