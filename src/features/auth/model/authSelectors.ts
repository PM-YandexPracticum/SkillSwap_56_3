import type { RootState } from '@/store'

export const selectAuthState = (state: RootState) => state.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export const selectAuthLoading = (state: RootState) => state.auth.isLoading
export const selectAuthError = (state: RootState) => state.auth.error
export const selectUserEmail = (state: RootState) => state.auth.user?.email ?? null
export const selectUserId = (state: RootState) => state.auth.user?.id ?? null
export const selectRegistrationDraft = (state: RootState) => state.auth.draft
export const selectDraftStep1 = (state: RootState) => {
  const { email, password } = state.auth.draft
  return { email, password }
}

export const selectDraftStep2 = (state: RootState) => {
  const { name, birthDate, gender, city, learnCategory, learnSubcategory, avatar } =
    state.auth.draft
  return { name, birthDate, gender, city, learnCategory, learnSubcategory, avatar }
}

export const selectDraftStep3 = (state: RootState) => {
  const { teachSkillName, teachCategory, teachSubcategory, teachDescription, teachImages } =
    state.auth.draft
  return { teachSkillName, teachCategory, teachSubcategory, teachDescription, teachImages }
}
