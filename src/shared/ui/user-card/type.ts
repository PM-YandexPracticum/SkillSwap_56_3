import type { UserCard } from '@/shared/types'

export interface UserCardProps {
  isCatalog: boolean,
  user: UserCard
  extraClass?: string
}