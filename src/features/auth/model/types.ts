import type { AuthUser, RegistrationDraft } from '@/shared/types'

export type FieldErrors = Record<string, string>

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  draft: RegistrationDraft
  draftErrors: FieldErrors
  loginErrors: FieldErrors
}
