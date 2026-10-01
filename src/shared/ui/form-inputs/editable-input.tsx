import { useRef } from 'react'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import styles from './form-inputs.module.css'
import type { EditableInputProps } from './type'

export function EditableInput({ icon, ...props }: EditableInputProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  const focusInput = () => {
    rootRef.current?.querySelector('input')?.focus()
  }

  return (
    <div ref={rootRef}>
      <Input
        {...props}
        rightSlot={
          icon ? (
            <Button
              type="button"
              extraclass={styles.editButton}
              onClick={focusInput}
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
