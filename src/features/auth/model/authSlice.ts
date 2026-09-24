import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser, RegistrationDraft } from '@/shared/types'
import type { AuthState } from './types'
import { login, register, getUser, logoutUser, updateUserProfile } from './authThunks'

const emptyDraft: RegistrationDraft = {
  email: '',
  password: '',
  name: '',
  birthDate: '',
  gender: 'all',
  city: '',
  learnCategory: '',
  learnSubcategory: '',
  avatar: '',
  teachSkillName: '',
  teachCategory: '',
  teachSubcategory: '',
  teachDescription: '',
  teachImages: [],
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  draft: emptyDraft,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    updateUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    updateDraft(state, action: PayloadAction<Partial<RegistrationDraft>>) {
      state.draft = { ...state.draft, ...action.payload }
    },
    resetDraft(state) {
      state.draft = emptyDraft
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Не удалось выполнить вход'
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.draft = emptyDraft
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? 'Не удалось зарегистрироваться'
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = action.payload !== null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.draft = emptyDraft
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload ?? 'Не удалось сохранить профиль'
      })
  },
})

export const { setUser, updateUser, logout, updateDraft, resetDraft, setError } = authSlice.actions

export default authSlice.reducer
