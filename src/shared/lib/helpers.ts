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

  const age = today.getFullYear() - year
  const currentMonth = today.getMonth() + 1
  const birthdayIsAhead = currentMonth < month || (currentMonth === month && today.getDate() < day)

  return birthdayIsAhead ? age - 1 : age
}

/** Дата уведомления: «сегодня», «вчера» или «1 сентября» */
export function formatNotificationDate(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''

  const startOfDay = (value: Date) =>
    new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime()

  const dayInMs = 24 * 60 * 60 * 1000
  const daysAgo = Math.round((startOfDay(new Date()) - startOfDay(date)) / dayInMs)

  if (daysAgo === 0) return 'сегодня'
  if (daysAgo === 1) return 'вчера'

  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' }).format(date)
}
