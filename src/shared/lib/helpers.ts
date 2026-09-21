/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}

/** Форматирует age в формат 1 год/2 года/5 лет */
export function formatAge(age: number): string {
  const agePluralRules = new Intl.PluralRules('ru-RU')
  const form = agePluralRules.select(age)
  const word = form === 'one' ? 'год' : form === 'few' ? 'года' : 'лет'

  return `${age} ${word}`
}

/** Получает age из birthDate */
export function getAgeFromBirth(birth: string): number {
  const [year, month, day] = birth.split('-').map(Number)
  const today = new Date()

  let age = today.getFullYear() - year
  const currentMonth = today.getMonth() + 1
  const birthdayIsAhead = currentMonth < month || (currentMonth === month && today.getDate() < day)

  return birthdayIsAhead ? age - 1 : age
}
