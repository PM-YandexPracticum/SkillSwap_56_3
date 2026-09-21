import type { User, AuthUser } from '@/shared/types'

export type { User, AuthUser }

export interface UsersState {
  users: User[]
  isLoading: boolean
  error: string | null
}