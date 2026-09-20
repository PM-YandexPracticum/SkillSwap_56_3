import type { Meta, UserCard } from "@/shared/types"

export interface UsersState {
  meta: Meta | null
  users: UserCard[]
  likedUserIds: string[]
  currentUser: UserCard | null
  isLoading: boolean
  isLoadingCurrent: boolean
  error: string | null
  errorCurrent: string | null
}