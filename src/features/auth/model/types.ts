import type { AuthUser, RegistrationDraft } from '@/shared/types'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  draft: RegistrationDraft
}
