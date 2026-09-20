import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSkills } from '@/api/skills'
import type { Skill, SkillsState } from './types'

export const loadSkills = createAsyncThunk<
  Skill[],
  void,
  { state: { skills: SkillsState }; rejectValue: string }
>(
  'skills/loadSkills',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const skills = await fetchSkills()
      return skills as unknown as Skill[]
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Не удалось загрузить навыки'
      return rejectWithValue(message)
    }
  },
  {
    condition: (_, { getState }) => {
      const { skills } = getState()
      return !skills.isLoading
    },
  },
)