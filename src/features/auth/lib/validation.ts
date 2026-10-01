import type { RegistrationDraft } from '@/shared/types'
import type { FieldErrors } from '../model/types'
import type { UpdateProfilePayload } from '@/shared/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@.]+\.[a-zA-Z]{2,}$/
const PASSWORD_MIN_LENGTH = 8

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Введите email'
  if (!EMAIL_REGEX.test(email)) return 'Некорректный email'
  return null
}

export function validatePassword(password: string): string | null {
  if (!password.trim()) return 'Введите пароль'
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

export function validateStep1AndLogin(
  draft: Pick<RegistrationDraft, 'email' | 'password'>
): FieldErrors {
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
  if (!draft.gender) errors.gender = 'Укажите пол'
  if (!draft.city) errors.city = 'Выберите город'

  if (draft.learnSelections.length === 0) {
    errors.learnCategories = 'Выберите хотя бы одну категорию'
  } else {
    const hasEmptySubcategory = draft.learnSelections.some(
      (s) => s.subcategories.length === 0
    )
    if (hasEmptySubcategory) {
      errors.learnSubcategories = 'Выберите хотя бы одну подкатегорию'
    }
  }

  return errors
}

export function validateStep3(draft: RegistrationDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (draft.teachSkillName.length < 4)
    errors.teachSkillName = 'Слишком короткое название'

  if (!draft.teachSkillName.trim())
    errors.teachSkillName = 'Введите название навыка'

  const teachSelection = draft.teachSelections[0]

  if (!teachSelection) {
    errors.teachCategory = 'Выберите категорию навыка'
  } else if (teachSelection.subcategories.length === 0) {
    errors.teachSubcategory = 'Выберите подкатегорию навыка'
  }
  if (!draft.teachDescription.trim())
    errors.teachDescription = 'Добавьте описание навыка'

  return errors
}

export function validateUpdateProfile(
  payload: Pick<UpdateProfilePayload, 'email' | 'name' | 'birthDate' | 'gender' | 'city'>
): FieldErrors {
  const errors: FieldErrors = {}

  const emailError = validateEmail(payload.email)
  if (emailError) errors.email = emailError

  if (!payload.name.trim()) errors.name = 'Введите имя'
  if (!payload.birthDate) errors.birthDate = 'Укажите дату рождения'
  if (!payload.gender) errors.gender = 'Укажите пол'
  if (!payload.city) errors.city = 'Выберите город'

  return errors
}

export function validateNewPassword(newPassword: string): string | null {
  return validatePassword(newPassword)
}

export const hasErrors = (errors: FieldErrors): boolean =>
  Object.keys(errors).length > 0
