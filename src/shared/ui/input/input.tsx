import type { InputProps } from './type'
import style from './input.module.css'

export const Input = ({ type = 'text', className, ...props }: InputProps) => {
  const inputClassName = [style.input, className].filter(Boolean).join(' ')

  return <input {...props} type={type} className={inputClassName} />
}
