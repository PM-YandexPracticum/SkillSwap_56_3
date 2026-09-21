import type { GenderOption, WantOption } from '@/shared/types'

export const ROUTES = {
  HOME: '/',
  SKILL: '/skill/:id',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CREATE: '/create',
  LOGIN: '/login',
  REGISTER: '/register',
  TEST_ANDREY: '/test-andrey',
} as const

export const SKILL_CATEGORIES = [
  'Программирование',
  'Дизайн',
  'Языки',
  'Музыка',
  'Спорт',
  'Кулинария',
  'Фото и видео',
  'Бизнес',
  'Другое',
] as const

export const WANT_OPTIONS: WantOption[] = [
  { id: 'all', name: 'Всё' },
  { id: 'learn', name: 'Хочу научиться' },
  { id: 'teach', name: 'Могу научить' },
]

export const GENDER_OPTIONS: GenderOption[] = [
  { id: 'all', name: 'Не имеет значения' },
  { id: 'male', name: 'Мужской' },
  { id: 'female', name: 'Женский' },
]

export const CITIES_VISIBLE_COUNT = 5

export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  THEME: 'skillswap_theme',
} as const
