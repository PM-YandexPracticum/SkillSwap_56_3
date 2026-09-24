import type { RegistrationDraft } from '@/shared/types'
import { FieldErrors } from '../model/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@.]+\.[a-zA-Z]{2,}$/
const PASSWORD_MIN_LENGTH = 8

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Введите email'
  if (!EMAIL_REGEX.test(email)) return 'Некорректный email'
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Введите пароль'
  if (password.length < PASSWORD_MIN_LENGTH) {
    return 'Пароль должен содержать не менее 8 символов'
  }
  if (!/[a-zA-Zа-яА-Я]/.test(password)) {
    return 'Пароль должен содержать буквы'
  }
  if (!/\d/.test(password)) {
    return 'Пароль должен содержать цифры'
  }
  return null
}

export function validateStep1AndLogin(draft: Pick<RegistrationDraft, 'email' | 'password'>): FieldErrors {
  const errors: FieldErrors = {}

  const emailError = validateEmail(draft.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(draft.password)
  if (passwordError) errors.password = passwordError

  return errors
}

export function validateStep2(draft: RegistrationDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (!draft.name.trim()) errors.name = 'Введите имя'
  if (!draft.birthDate) errors.birthDate = 'Укажите дату рождения'
  if (draft.gender === 'all') errors.gender = 'Укажите пол'
  if (!draft.city) errors.city = 'Выберите город'
  if (!draft.learnCategory) errors.learnCategory = 'Выберите категорию навыка'
  if (!draft.learnSubcategory)
    errors.learnSubcategory = 'Выберите подкатегорию навыка'

  return errors
}

export function validateStep3(draft: RegistrationDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (!draft.teachSkillName.trim())
    errors.teachSkillName = 'Введите название навыка'
  if (!draft.teachCategory)
    errors.teachCategory = 'Выберите категорию навыка'
  if (!draft.teachSubcategory)
    errors.teachSubcategory = 'Выберите подкатегорию навыка'
  if (!draft.teachDescription.trim())
    errors.teachDescription = 'Добавьте описание навыка'

  return errors
}

export const hasErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors).length > 0
