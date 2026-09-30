export interface RegisterStep1Props {
  values: { email: string; password: string }
  errors: Record<string, string>
  onFieldChange: (patch: { email?: string; password?: string }) => void
  onNext: () => void
  isLoading: boolean
}