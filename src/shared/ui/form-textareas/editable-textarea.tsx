import { useRef } from 'react'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import styles from './form-textareas.module.css'
import type { EditableTextareaProps } from './type'

export function EditableTextarea({ icon, ...props }: EditableTextareaProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const focusTextarea = () => {
    rootRef.current?.querySelector('textarea')?.focus()
  }

  return (
    <div ref={rootRef}>
      <Textarea
        {...props}
        rightSlot={
          icon ? (
            <Button
              type="button"
              extraclass={styles.editButton}
              onClick={focusTextarea}
              aria-label="Редактировать"
            >
              {icon}
            </Button>
          ) : undefined
        }
      />
    </div>
  )
}
