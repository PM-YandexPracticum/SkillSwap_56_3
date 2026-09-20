import type { UserCard as UserCardType } from '@/shared/types'

export interface UserCardProps {
  isCatalog: boolean,
  user: UserCardType
  onMore?: (userId: string) => void
}