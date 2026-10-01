import { describe, it, expect } from 'vitest'
import skillsReducer from './skillsSlice'
import { loadSkills, loadSkillById } from './skillsThunks'
import type { SkillsState } from './types'

const getInitialState = (): SkillsState => skillsReducer(undefined, { type: 'unknown' })

describe('skillsSlice', () => {
  it('начальное состояние пустое', () => {
    const state = getInitialState()

    expect(state.skills).toEqual([])
    expect(state.currentSkill).toBeNull()
    expect(state.isLoading).toBe(false)
  })

  it('loadSkills.pending включает загрузку', () => {
    const result = skillsReducer(getInitialState(), loadSkills.pending('', undefined))

    expect(result.isLoading).toBe(true)
    expect(result.error).toBeNull()
  })

  it('loadSkills.rejected записывает ошибку', () => {
    const result = skillsReducer(
      { ...getInitialState(), isLoading: true },
      loadSkills.rejected(null, '', undefined, 'Не удалось загрузить навыки'),
    )

    expect(result.isLoading).toBe(false)
    expect(result.error).toBe('Не удалось загрузить навыки')
  })

  it('loadSkillById.pending сбрасывает текущий навык', () => {
    const result = skillsReducer(getInitialState(), loadSkillById.pending('', 's1'))

    expect(result.isLoadingCurrent).toBe(true)
    expect(result.currentSkill).toBeNull()
  })

  it('loadSkillById.rejected записывает ошибку', () => {
    const result = skillsReducer(
      { ...getInitialState(), isLoadingCurrent: true },
      loadSkillById.rejected(null, '', 's1', 'Навык не найден'),
    )

    expect(result.isLoadingCurrent).toBe(false)
    expect(result.errorCurrent).toBe('Навык не найден')
  })

  it('loadSkills.fulfilled записывает навыки', () => {
    const skill = {
      id: 's1',
      type: 'teach' as const,
      title: 'Игра на барабанах',
      category: 'creativity-art',
      subcategory: 'music-sound',
      description: 'Описание навыка',
      tags: ['барабаны'],
      images: [],
      imageUrl: null,
      authorId: 'u1',
      createdAt: '2024-01-01T00:00:00Z',
    }

    const result = skillsReducer(
      { ...getInitialState(), isLoading: true },
      loadSkills.fulfilled([skill], '', undefined),
    )

    expect(result.isLoading).toBe(false)
    expect(result.skills).toHaveLength(1)
    expect(result.skills[0].title).toBe('Игра на барабанах')
  })

  it('loadSkillById.fulfilled записывает текущий навык', () => {
    const skill = {
      id: 's1',
      type: 'teach' as const,
      title: 'Игра на барабанах',
      category: 'creativity-art',
      subcategory: 'music-sound',
      description: 'Описание навыка',
      tags: ['барабаны'],
      images: [],
      imageUrl: null,
      authorId: 'u1',
      createdAt: '2024-01-01T00:00:00Z',
    }

    const result = skillsReducer(
      { ...getInitialState(), isLoadingCurrent: true },
      loadSkillById.fulfilled(skill, '', 's1'),
    )

    expect(result.isLoadingCurrent).toBe(false)
    expect(result.currentSkill?.id).toBe('s1')
  })
})
