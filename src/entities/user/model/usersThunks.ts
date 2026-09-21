import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from '@/api/users'
import type { User } from '@/shared/types'
import type { UsersState } from './types'

export const loadUsers = createAsyncThunk<
  User[],
  void,
  { state: { users: UsersState }; rejectValue: string }
>(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      // fetchUsers типизирован как Promise<User[]>,
      // но реально возвращает { meta, data }
      const response = (await fetchUsers()) as unknown as {
        meta: unknown
        data: User[]
      }
      return response.data
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Не удалось загрузить пользователей'
      return rejectWithValue(message)
    }
  },
  {
    condition: (_, { getState }) => {
      const { users } = getState()
      return !users.isLoading
    },
  },
)