import type { User } from '@/shared/types'

export interface UserInfoProps extends Pick<User, 'name' | 'avatarUrl'> {
  city: string
  age: number
  className?: string
}
