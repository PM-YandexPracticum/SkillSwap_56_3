import type { RegistrationDraft } from '@/shared/types'

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

export function validateStep1(draft: RegistrationDraft): string | null {
  return validateEmail(draft.email) ?? validatePassword(draft.password)
}

export function validateStep2(draft: RegistrationDraft): string | null {
  if (!draft.name.trim()) return 'Введите имя'
  if (!draft.birthDate) return 'Укажите дату рождения'
  if (!draft.city) return 'Выберите город'
  if (!draft.learnCategory) return 'Выберите категорию навыка'
  if (!draft.learnSubcategory) return 'Выберите подкатегорию навыка'
  return null
}

export function validateStep3(draft: RegistrationDraft): string | null {
  if (!draft.teachSkillName.trim()) return 'Введите название навыка'
  if (!draft.teachCategory) return 'Выберите категорию навыка'
  if (!draft.teachSubcategory) return 'Выберите подкатегорию навыка'
  if (!draft.teachDescription.trim()) return 'Добавьте описание навыка'
  return null
}
