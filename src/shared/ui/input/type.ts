import { ComponentProps } from 'react'

export type InputProps = Omit<ComponentProps<'input'>, 'type' | 'children'> & {
  type?: InputType
}

export type InputType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'number'
