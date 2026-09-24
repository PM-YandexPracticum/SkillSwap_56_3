import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from '@/api/users'
import { fetchCredentialsByEmail } from '@/api/credentials'
import type { AuthUser } from '@/shared/types'
import { getAuthUser, saveAuthUser, clearAuthUser } from './authUtils'
import { validateEmail, validatePassword } from '../lib/validation'

const FAKE_DELAY = 500

interface LoginPayload {
  email: string
  password: string
}

export const login = createAsyncThunk<AuthUser, LoginPayload, { rejectValue: string }>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const emailError = validateEmail(email)
    if (emailError) {
      return rejectWithValue(emailError)
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return rejectWithValue(passwordError)
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

      const credentials = await fetchCredentialsByEmail(email)

      if (!credentials) {
        return rejectWithValue('Пользователь с таким email не найден')
      }

      if (credentials.password !== password) {
        return rejectWithValue('Неверный пароль')
      }

      const { data } = await fetchUsers()
      const found = data.find((user) => user.email === email)

      if (!found) {
        return rejectWithValue('Пользователь с таким email не найден')
      }

      return saveAuthUser({ id: found.id, name: found.name, email: found.email })
    } catch {
      return rejectWithValue('Не удалось выполнить вход')
    }
  },
)

export const getUser = createAsyncThunk<AuthUser | null, void>('auth/getUser', async () =>
  getAuthUser(),
)

export const logoutUser = createAsyncThunk<void, void>('auth/logout', async () => {
  clearAuthUser()
})
