import { createSlice } from '@reduxjs/toolkit'
import { loadSkills } from './skillsThunks'
import type { SkillsState } from './types'

const initialState: SkillsState = {
  skills: [],
  isLoading: false,
  error: null,
}

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSkills.pending, (state) => {
        state.isLoading = true
        state.error = null
        // state.skills НЕ трогаем — старые данные сохраняются
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skills = action.payload
        state.error = null
      })
      .addCase(loadSkills.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? action.error.message ?? 'Неизвестная ошибка'
        // state.skills НЕ трогаем — старые данные сохраняются
      })
  },
})

export default skillsSlice.reducer