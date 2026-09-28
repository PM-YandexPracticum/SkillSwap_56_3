import { useCallback, useRef, useState } from 'react'
import { useInfiniteScroll } from './useInfiniteScroll'

export const useProgressiveList = <T>(items: T[], sectionSize = 9) => {
  const [visibleCount, setVisibleCount] = useState(sectionSize)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const visibleItems = items.slice(0, visibleCount)
  const totalCount = items.length
  const hasMore = visibleCount < totalCount

  const showMore = useCallback(() => {
    if (visibleCount >= totalCount) return

    setVisibleCount((previousCount) => Math.min(previousCount + sectionSize, totalCount))
  }, [visibleCount, totalCount, sectionSize])

  const reset = useCallback(() => {
    setVisibleCount(sectionSize)
  }, [sectionSize])

  useInfiniteScroll(sentinelRef, showMore)

  return {
    visibleItems,
    totalCount,
    hasMore,
    sentinelRef,
    showMore,
    reset,
  }
}
