import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import type { ModalProps } from './type'

export function Modal({ isOpen, onClose, children, width, height, className }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${className ?? ''}`}
        style={{ width, height }}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
