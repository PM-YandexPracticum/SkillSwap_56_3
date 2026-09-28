import { RefObject, useEffect } from 'react'

export function useInfiniteScroll<T extends Element>(
  ref: RefObject<T | null>,
  callback: () => void,
) {
  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callback()
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, callback])
}
