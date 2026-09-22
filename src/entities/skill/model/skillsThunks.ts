import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSkillById, fetchSkills } from '@/api/skills'
import type { SkillsState } from './types'
import { Skill } from '@/shared/types'

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
      return skills
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Не удалось загрузить навыки'
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

export const loadSkillById = createAsyncThunk<Skill, string, { rejectValue: string }>(
  'skills/getById',
  async (id, { rejectWithValue }) => {
    try {
      const skill = await fetchSkillById(id)

      if (!skill) {
        return rejectWithValue('Навык не найден')
      }
      return skill
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Не удалось загрузить навык'
      return rejectWithValue(message)
    }
  },
)
