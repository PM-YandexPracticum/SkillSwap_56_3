import { Button } from '../button'
import { Icon } from '../icon/Icon'
import { Input } from '../input'
import { PasswordInputProps } from './type'
import style from './password-input.module.css'
import { useState } from 'react'

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const inputClassName = [style.input, className].filter(Boolean).join(' ')

  return (
    <Input
      {...props}
      label={props.label}
      className={inputClassName}
      type={isVisible ? 'text' : 'password'}
      rightSlot={
        <Button
          type="button"
          aria-label={isVisible ? 'Скрыть пароль' : 'Показать пароль'}
          onClick={() => setIsVisible((current) => !current)}
        >
          {isVisible ? <Icon name="eyeClosed" size={24} /> : <Icon name="eye" size={24} />}
        </Button>
      }
    />
  )
}