import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser, RegistrationDraft } from '@/shared/types'
import type { AuthState, FieldErrors } from './types'
import {
  login,
  register,
  getUser,
  logoutUser,
  updateUserProfile,
  checkEmail
} from './authThunks'

const emptyDraft: RegistrationDraft = {
  email: '',
  password: '',
  name: '',
  birthDate: '',
  gender: null,
  city: '',
  avatar: '',
  learnSelections: [],
  teachSelections: [],
  teachSkillName: '',
  teachDescription: '',
  teachImages: [],
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  draft: emptyDraft,
  draftErrors: {},
  loginErrors: {},
  justRegistered: false,
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

      Object.keys(action.payload).forEach((key) => {
        delete state.draftErrors[key]
        
        if (key === 'learnSelections') {
          delete state.draftErrors.learnCategories
          delete state.draftErrors.learnSubcategories
        }
        if (key === 'teachSelections') {
          delete state.draftErrors.teachCategory
          delete state.draftErrors.teachSubcategory
        }
      })
    },
    resetDraft(state) {
      state.draft = emptyDraft
      state.draftErrors = {}
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setDraftErrors(state, action: PayloadAction<FieldErrors>) {
      state.draftErrors = action.payload
    },
    clearDraftErrors(state) {
      state.draftErrors = {}
    },
    setLoginErrors(state, action: PayloadAction<FieldErrors>) {
      state.loginErrors = action.payload
    },
    clearLoginErrors(state) {
      state.loginErrors = {}
    },
    setJustRegistered(state, action: PayloadAction<boolean>) {
      state.justRegistered = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── login ─────────────────────────────────────────
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.loginErrors = {}
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.loginErrors = {}
        console.log('FULFILLED')
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload && typeof action.payload === 'object') {
          state.loginErrors = action.payload
        } else {
          state.error = action.error.message ?? 'Не удалось выполнить вход'
        }
        console.log('REJECT')
      })
      
      // ─── checkEmail ────────────────────────────────────
      .addCase(checkEmail.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload && typeof action.payload === 'object') {
          state.draftErrors = { ...state.draftErrors, ...action.payload }
        } else {
          state.error = action.error.message ?? 'Не удалось проверить email'
        }
      })

      // ─── register ──────────────────────────────────────
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.draftErrors = {}
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.draft = emptyDraft
        state.draftErrors = {}
        state.justRegistered = true
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload && typeof action.payload === 'object') {
          state.draftErrors = action.payload
        } else {
          state.error = action.error.message ?? 'Не удалось зарегистрироваться'
        }
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = action.payload !== null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.draft = emptyDraft
        state.justRegistered = false
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.draftErrors = {}
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.draftErrors = {}
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload && typeof action.payload === 'object') {
          state.draftErrors = action.payload
        } else {
          state.error = action.error.message ?? 'Не удалось сохранить профиль'
        }
      })
  },
})

export const {
  setUser,
  updateUser,
  logout,
  updateDraft,
  resetDraft,
  setError,
  setDraftErrors,
  clearDraftErrors,
  setLoginErrors,
  clearLoginErrors,
  setJustRegistered,
} = authSlice.actions

export default authSlice.reducer
