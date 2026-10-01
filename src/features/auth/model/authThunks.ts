import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type {
  AuthUser,
  RegistrationDraft,
  UserCard,
  LearnSkill,
  Meta,
  Gender,
} from '@/shared/types'
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
  hasErrors,
} from '../lib/validation'
import { fetchUsers } from '@/api/users'
import { fetchCredentialsByEmail } from '@/api/credentials'
import type { FieldErrors } from './types'
import { FAKE_DELAY } from '@/shared/lib/constants'
import { GenderValue } from '@/shared/ui/gender-select'
import { updateCredentials } from './authUtils'
import type { LoginPayload, UpdateProfilePayload } from '@/shared/types'
import { validateUpdateProfile, validateNewPassword } from '../lib/validation'
import { updateRegisteredUser } from './authUtils'
import { clearAllExchanges } from '@/features/exchange/model/exchangeSlice'

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

      return saveAuthUser({
        id: found.id,
        name: found.name,
        email: found.email,
        gender: found.gender as GenderValue,
        birthDate: found.birthDate,
        city: found.city,
        aboutMe: found.aboutMe,
        avatar: found.avatar,
      })
    } catch {
      return rejectWithValue({ form: 'Не удалось выполнить вход' })
    }
  }
)

export const getUser = createAsyncThunk<AuthUser | null, void>(
  'auth/getUser',
  async () => getAuthUser()
)

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    clearAuthUser()
    clearAllExchanges()
  }
)

function findSubcategoryInfo(
  subcategoryId: string,
  meta: Meta | null
): { subcategoryName: string; categoryName: string } {
  for (const category of meta?.categories ?? []) {
    const sub = category.subcategories.find((s) => s.id === subcategoryId)
    if (sub) {
      return { subcategoryName: sub.name, categoryName: category.name }
    }
  }
  return { subcategoryName: subcategoryId, categoryName: subcategoryId }
}

function draftToUser(draft: RegistrationDraft, meta: Meta | null): UserCard {
  const learnSkills: LearnSkill[] = draft.learnSelections.flatMap((selection) =>
    selection.subcategories.map((subcategoryId) => {
      const { subcategoryName, categoryName } = findSubcategoryInfo(
        subcategoryId,
        meta
      )
      return {
        name: subcategoryName,
        category: categoryName,
        subcategory: subcategoryName,
      }
    })
  )

  const teachSelection = draft.teachSelections[0]
  const teachSubcategoryId = teachSelection?.subcategories[0] ?? ''
  const teachInfo = teachSubcategoryId
    ? findSubcategoryInfo(teachSubcategoryId, meta)
    : { subcategoryName: '', categoryName: '' }

  return {
    id: `u_${Date.now()}`,
    name: draft.name,
    email: draft.email,
    birthDate: draft.birthDate,
    gender: draft.gender as Gender,
    city: draft.city,
    likesCount: 0,
    aboutMe: '',
    createdAt: new Date().toISOString(),
    teachSkill: {
      id: `s_${Date.now()}`,
      name: draft.teachSkillName,
      category: teachInfo.categoryName,
      subcategory: teachInfo.subcategoryName,
    },
    learnSkills,
    avatar: draft.avatar,
  }
}

export const checkEmail = createAsyncThunk<
  void,
  string,
  { rejectValue: FieldErrors }
>(
  'auth/checkEmail',
  async (email, { rejectWithValue }) => {
    const emailError = validateEmail(email)
    if (emailError) {
      return rejectWithValue({ email: emailError })
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

      const existing = await fetchCredentialsByEmail(email)
      const registered = getRegisteredCredentials()

      if (existing || registered.some((item) => item.email === email)) {
        return rejectWithValue({ email: 'Email уже используется' })
      }

      return
    } catch {
      return rejectWithValue({ form: 'Не удалось проверить email' })
    }
  }
)

export const register = createAsyncThunk<
  AuthUser,
  RegistrationDraft,
  { state: RootState; rejectValue: FieldErrors }
>(
  'auth/register',
  async (draft, { getState, rejectWithValue }) => {
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

      const meta = getState().users.meta
      const user = draftToUser(draft, meta)
      saveRegisteredUser(user, draft.password)

      return saveAuthUser({
        id: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender as GenderValue,
        birthDate: user.birthDate,
        city: user.city,
        aboutMe: user.aboutMe,
        avatar: user.avatar,
      })
    } catch {
      return rejectWithValue({ form: 'Не удалось зарегистрироваться' })
    }
  }
)

export const updateUserProfile = createAsyncThunk<
  AuthUser,
  UpdateProfilePayload,
  { state: RootState; rejectValue: FieldErrors }
>(
  'auth/updateUserProfile',
  async (payload, { getState, rejectWithValue }) => {
    const current = getState().auth.user

    if (!current) {
      return rejectWithValue({ form: 'Пользователь не авторизован' })
    }

    const errors = validateUpdateProfile(payload)

    const emailChanged = payload.email !== current.email

    if (emailChanged) {
      await new Promise((r) => setTimeout(r, FAKE_DELAY))

      const existing = await fetchCredentialsByEmail(payload.email)
      const registered = getRegisteredCredentials()

      const isInUse =
        existing ||
        registered.some(
          (c) => c.email === payload.email && c.email !== current.email
        )

      if (isInUse) {
        errors.email = 'Email уже используется'
      }
    }

    if (payload.newPassword) {
      if (!payload.oldPassword) {
        errors.oldPassword = 'Введите текущий пароль'
      } else {
        await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

        const credentials =
          getRegisteredCredentials().find((c) => c.email === current.email) ??
          (await fetchCredentialsByEmail(current.email))

        if (!credentials || credentials.password !== payload.oldPassword) {
          errors.oldPassword = 'Неверный пароль'
        }

        const newPasswordError = validateNewPassword(payload.newPassword)
        if (newPasswordError) errors.newPassword = newPasswordError
      }
    }

    if (hasErrors(errors)) {
      return rejectWithValue(errors)
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY))

      const emailChanged = payload.email !== current.email
      const passwordChanged = Boolean(payload.newPassword)

      // ─── AUTH_USER ───────────────────────
      const updatedAuthUser = saveAuthUser({
        ...current,
        name: payload.name,
        email: payload.email,
        birthDate: payload.birthDate,
        gender: payload.gender,
        city: payload.city,
        aboutMe: payload.aboutMe,
        avatar: payload.avatar,
      })

      // ─── REGISTERED_USERS ────────────────
      updateRegisteredUser(current.id, {
        name: payload.name,
        email: payload.email,
        birthDate: payload.birthDate,
        gender: payload.gender as GenderValue,
        city: payload.city,
        aboutMe: payload.aboutMe,
        avatar: payload.avatar,
      })

      // ─── CREDENTIALS ─────────────────────
      if (emailChanged || passwordChanged) {
        updateCredentials(
          current.email,
          payload.email,
          passwordChanged ? payload.newPassword : undefined
        )
      }

      return updatedAuthUser
    } catch {
      return rejectWithValue({ form: 'Не удалось сохранить профиль' })
    }
  }
)