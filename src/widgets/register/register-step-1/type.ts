export interface RegisterStep1Props {
  values: { email: string; password: string }
  errors: { email?: string; password?: string }
  onFieldChange: (patch: { email?: string; password?: string }) => void
  onNext: () => void
}