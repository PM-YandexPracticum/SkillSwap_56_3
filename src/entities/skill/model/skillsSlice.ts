import { createSlice } from '@reduxjs/toolkit'
import { loadSkillById, loadSkills } from './skillsThunks'
import type { SkillsState } from './types'

const initialState: SkillsState = {
  skills: [],
  isLoading: false,
  error: null,
  isLoadingCurrent: false,
  errorCurrent: null,
  currentSkill: null,
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
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skills = action.payload
        state.error = null
      })
      .addCase(loadSkills.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload ?? action.error.message ?? 'Неизвестная ошибка'
      })
      .addCase(loadSkillById.pending, (state) => {
        state.isLoadingCurrent = true
        state.errorCurrent = null
        state.currentSkill = null
      })
      .addCase(loadSkillById.fulfilled, (state, action) => {
        state.isLoadingCurrent = false
        state.currentSkill = action.payload
      })
      .addCase(loadSkillById.rejected, (state, action) => {
        state.isLoadingCurrent = false
        state.errorCurrent = action.payload ?? action.error.message ?? 'Не удалось загрузить навык'
      })
  },
})

export default skillsSlice.reducer