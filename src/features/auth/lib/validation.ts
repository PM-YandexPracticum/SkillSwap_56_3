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
