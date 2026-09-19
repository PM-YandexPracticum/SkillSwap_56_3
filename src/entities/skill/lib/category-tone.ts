import type { TagTone } from '@/shared/ui/tag'

const CATEGORY_TONES: Record<string, TagTone> = {
  'Бизнес и карьера': 'purple',
  'Творчество и искусство': 'pink',
  'Иностранные языки': 'yellow',
  'Образование и развитие': 'blue',
  'Дом и уют': 'orange',
  'Здоровье и лайфстайл': 'green',
}

export const getCategoryTone = (category: string): TagTone => {
  return CATEGORY_TONES[category] ?? 'neutral'
}
