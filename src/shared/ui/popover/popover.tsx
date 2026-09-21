import { useEffect, useRef } from 'react'
import style from './popover.module.css'
import { PopoverProps } from './type'

export function Popover({ isOpen, isOpenChange, trigger, children }: PopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const ownerDocument = triggerRef.current?.ownerDocument
    if (!ownerDocument) return

    function handleOutsideClick(event: MouseEvent) {
      const target = event.target

      if (!(target instanceof Node)) return

      const clickedTrigger = triggerRef.current?.contains(target)
      const clickedPanel = panelRef.current?.contains(target)

      if (!clickedTrigger && !clickedPanel) {
        isOpenChange(false)
      }
    }

    ownerDocument.addEventListener('click', handleOutsideClick, true)

    return () => {
      ownerDocument.removeEventListener('click', handleOutsideClick, true)
    }
  }, [isOpen, isOpenChange])

  return (
    <div className={style.root}>
      <div ref={triggerRef} onClick={() => isOpenChange(!isOpen)}>
        {trigger}
      </div>

      <div className={style.panel} ref={panelRef} hidden={!isOpen}>
        {children}
      </div>
    </div>
  )
}
