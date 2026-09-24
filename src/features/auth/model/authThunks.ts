import type { AuthUser, RegistrationDraft, UserCard } from '@/shared/types'
import {
  getAuthUser,
  saveAuthUser,
  clearAuthUser,
  getRegisteredUsers,
  getRegisteredCredentials,
  saveRegisteredUser,
} from './authUtils'
import {
  validateEmail,
  validateStep1AndLogin,
  validateStep2,
  validateStep3,
  hasErrors
} from '../lib/validation'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers } from '@/api/users'
import { fetchCredentialsByEmail } from '@/api/credentials'
import { FieldErrors } from './types'

const FAKE_DELAY = 500

interface LoginPayload {
  email: string
  password: string
}

interface UpdateProfilePayload {
  name: string
  email: string
}

export const login = createAsyncThunk<
  AuthUser,
  LoginPayload,
  { rejectValue: FieldErrors }
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    const errors = validateStep1AndLogin({ email, password })

    if (hasErrors(errors)) {
      return rejectWithValue(errors)
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

      const credentials =
        getRegisteredCredentials().find((item) => item.email === email) ??
        (await fetchCredentialsByEmail(email))

      if (!credentials || credentials.password !== password) {
        return rejectWithValue({ form: 'Неверный логин или пароль' })
      }

      const { data } = await fetchUsers()
      const found =
        getRegisteredUsers().find((user) => user.email === email) ??
        data.find((user) => user.email === email)

      if (!found) {
        return rejectWithValue({ form: 'Пользователь с таким email не найден' })
      }

      return saveAuthUser({ id: found.id, name: found.name, email: found.email })
    } catch {
      return rejectWithValue({ form: 'Не удалось выполнить вход' })
    }
  }
)

export const getUser = createAsyncThunk<AuthUser | null, void>('auth/getUser', async () =>
  getAuthUser(),
)

export const logoutUser = createAsyncThunk<void, void>('auth/logout', async () => {
  clearAuthUser()
})

function draftToUser(draft: RegistrationDraft): UserCard {
  return {
    id: `u_${Date.now()}`,
    name: draft.name,
    email: draft.email,
    birthDate: draft.birthDate,
    gender: draft.gender,
    city: draft.city,
    likesCount: 0,
    aboutMe: '',
    createdAt: new Date().toISOString(),
    teachSkill: {
      id: `s_${Date.now()}`,
      name: draft.teachSkillName,
      category: draft.teachCategory,
      subcategory: draft.teachSubcategory,
    },
    learnSkills: [
      {
        name: draft.learnSubcategory,
        category: draft.learnCategory,
        subcategory: draft.learnSubcategory,
      },
    ],
    avatar: draft.avatar,
  }
}

export const register = createAsyncThunk<
  AuthUser,
  RegistrationDraft,
  { rejectValue: FieldErrors }
>(
  'auth/register',
  async (draft, { rejectWithValue }) => {
    const errors = {
      ...validateStep1AndLogin(draft),
      ...validateStep2(draft),
      ...validateStep3(draft),
    }

    if (hasErrors(errors)) {
      return rejectWithValue(errors)
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

      const existing = await fetchCredentialsByEmail(draft.email)
      const registered = getRegisteredCredentials()

      if (existing || registered.some((item) => item.email === draft.email)) {
        return rejectWithValue({ email: 'Email уже используется' })
      }

      const user = draftToUser(draft)
      saveRegisteredUser(user, draft.password)

      return saveAuthUser({ id: user.id, name: user.name, email: user.email })
    } catch {
      return rejectWithValue({ form: 'Не удалось зарегистрироваться' })
    }
  }
)

export const updateUserProfile = createAsyncThunk<
  AuthUser,
  UpdateProfilePayload,
  { rejectValue: string }
>('auth/updateUserProfile', async ({ name, email }, { getState, rejectWithValue }) => {
  const state = getState() as { auth: { user: AuthUser | null } }
  const current = state.auth.user

  if (!current) {
    return rejectWithValue('Пользователь не авторизован')
  }

  const emailError = validateEmail(email)
  if (emailError) {
    return rejectWithValue(emailError)
  }

  return saveAuthUser({ id: current.id, name, email })
})
