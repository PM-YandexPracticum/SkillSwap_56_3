import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'
import { useLocalStorage } from './useLocalStorage'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('сразу возвращает начальное значение', () => {
    const { result } = renderHook(() => useDebounce('первое', 300))

    expect(result.current).toBe('первое')
  })

  it('обновляет значение только после задержки', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'первое' },
    })

    rerender({ value: 'второе' })

    expect(result.current).toBe('первое')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(result.current).toBe('второе')
  })

  it('не обновляет значение, если задержка не прошла', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'первое' },
    })

    rerender({ value: 'второе' })

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe('первое')
  })
})

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('возвращает начальное значение, если в localStorage пусто', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'по умолчанию'))

    expect(result.current[0]).toBe('по умолчанию')
  })

  it('читает сохранённое значение из localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('сохранённое'))

    const { result } = renderHook(() => useLocalStorage('test-key', 'по умолчанию'))

    expect(result.current[0]).toBe('сохранённое')
  })

  it('записывает новое значение в localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'первое'))

    act(() => {
      result.current[1]('второе')
    })

    expect(result.current[0]).toBe('второе')
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('второе'))
  })

  it('возвращает начальное значение, если в localStorage мусор', () => {
    localStorage.setItem('test-key', 'не json')

    const { result } = renderHook(() => useLocalStorage('test-key', 'по умолчанию'))

    expect(result.current[0]).toBe('по умолчанию')
  })
})
