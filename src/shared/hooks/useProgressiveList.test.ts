import { describe, it, expect, beforeAll, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useProgressiveList } from './useProgressiveList'

beforeAll(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})

const items = Array.from({ length: 25 }, (_, index) => index + 1)

describe('useProgressiveList', () => {
  it('показывает первую порцию элементов', () => {
    const { result } = renderHook(() => useProgressiveList(items, 9))

    expect(result.current.visibleItems).toHaveLength(9)
    expect(result.current.totalCount).toBe(25)
    expect(result.current.hasMore).toBe(true)
  })

  it('showMore добавляет следующую порцию', () => {
    const { result } = renderHook(() => useProgressiveList(items, 9))

    act(() => {
      result.current.showMore()
    })

    expect(result.current.visibleItems).toHaveLength(18)
  })

  it('не показывает больше, чем есть элементов', () => {
    const { result } = renderHook(() => useProgressiveList(items, 9))

    act(() => {
      result.current.showMore()
    })
    act(() => {
      result.current.showMore()
    })

    expect(result.current.visibleItems).toHaveLength(25)
    expect(result.current.hasMore).toBe(false)
  })

  it('reset возвращает к первой порции', () => {
    const { result } = renderHook(() => useProgressiveList(items, 9))

    act(() => {
      result.current.showMore()
    })
    act(() => {
      result.current.reset()
    })

    expect(result.current.visibleItems).toHaveLength(9)
  })

  it('hasMore равен false, если элементов меньше порции', () => {
    const { result } = renderHook(() => useProgressiveList([1, 2, 3], 9))

    expect(result.current.visibleItems).toHaveLength(3)
    expect(result.current.hasMore).toBe(false)
  })
})
