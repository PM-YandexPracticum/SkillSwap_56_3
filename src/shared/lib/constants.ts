import type { Section } from "../types"

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

export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  REGISTERED_USERS: 'skillswap_registered_users',
  REGISTERED_CREDENTIALS: 'skillswap_registered_credentials',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  THEME: 'skillswap_theme',
} as const

export const CITIES_VISIBLE_COUNT = 5

export const SECTIONS: Section[] = [
  { id: 'requests', label: 'Заявки' },
  { id: 'exchanges', label: 'Мои обмены' },
  { id: 'heart', label: 'Избранное', path: '/favorites' },
  { id: 'skills', label: 'Мои навыки' },
  { id: 'profile', label: 'Личные данные', path: '/profile' },
]
