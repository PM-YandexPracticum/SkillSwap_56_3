// TODO: реализовать страницу CatalogPage

import { SkillsPopover } from "@/shared/ui/skills-popover/skills-popover"

export default function CatalogPage() {
  return (
    <main>
      <h1>CatalogPage</h1>
      <p>Страница в разработке</p>
      <SkillsPopover categories={[{
        "id": "business-career",
        "name": "Бизнес и карьера",
        "icon": "",
        "subcategories": [
          {
            "id": "team-management",
            "name": "Управление командой"
          },
          {
            "id": "marketing-advertising",
            "name": "Маркетинг и реклама"
          },
          {
            "id": "sales-negotiations",
            "name": "Продажи и переговоры"
          },
          {
            "id": "personal-brand",
            "name": "Личный бренд"
          },
          {
            "id": "resume-interview",
            "name": "Резюме и собеседование"
          },
          {
            "id": "time-management",
            "name": "Тайм-менеджмент"
          },
          {
            "id": "project-management",
            "name": "Проектное управление"
          },
          {
            "id": "entrepreneurship",
            "name": "Предпринимательство"
          }
        ]
      },
      {
        "id": "creativity-art",
        "name": "Творчество и искусство",
        "icon": "",
        "subcategories": [
          {
            "id": "drawing-illustration",
            "name": "Рисование и иллюстрация"
          },
          {
            "id": "photography",
            "name": "Фотография"
          },
          {
            "id": "video-editing",
            "name": "Видеомонтаж"
          },
          {
            "id": "music-sound",
            "name": "Музыка и звук"
          },
          {
            "id": "acting",
            "name": "Актёрское мастерство"
          },
          {
            "id": "creative-writing",
            "name": "Креативное письмо"
          },
          {
            "id": "arts-crafts",
            "name": "Арт-терапия"
          },
          {
            "id": "decor-diy",
            "name": "Декор и DIY"
          }
        ]
      },
      {
        "id": "foreign-languages",
        "name": "Иностранные языки",
        "icon": "",
        "subcategories": [
          {
            "id": "english",
            "name": "Английский"
          },
          {
            "id": "french",
            "name": "Французский"
          },
          {
            "id": "spanish",
            "name": "Испанский"
          },
          {
            "id": "german",
            "name": "Немецкий"
          },
          {
            "id": "chinese",
            "name": "Китайский"
          },
          {
            "id": "japanese",
            "name": "Японский"
          },
          {
            "id": "exam-preparation",
            "name": "Подготовка к экзаменам (IELTS, TOEFL)"
          }
        ]
      },
      {
        "id": "education-development",
        "name": "Образование и развитие",
        "icon": "",
        "subcategories": [
          {
            "id": "personal-development",
            "name": "Личностное развитие"
          },
          {
            "id": "learning-skills",
            "name": "Навыки обучения"
          },
          {
            "id": "cognitive-techniques",
            "name": "Когнитивные техники"
          },
          {
            "id": "speed-reading",
            "name": "Скорочтение"
          },
          {
            "id": "teaching-skills",
            "name": "Навыки преподавания"
          },
          {
            "id": "coaching",
            "name": "Коучинг"
          }
        ]
      },
      {
        "id": "home-comfort",
        "name": "Дом и уют",
        "icon": "",
        "subcategories": [
          {
            "id": "cleaning-organization",
            "name": "Уборка и организация"
          },
          {
            "id": "home-finance",
            "name": "Домашние финансы"
          },
          {
            "id": "cooking",
            "name": "Приготовление еды"
          },
          {
            "id": "houseplants",
            "name": "Домашние растения"
          },
          {
            "id": "repair",
            "name": "Ремонт"
          },
          {
            "id": "storage",
            "name": "Хранение вещей"
          }
        ]
      },
      {
        "id": "health-lifestyle",
        "name": "Здоровье и лайфстайл",
        "icon": "",
        "subcategories": [
          {
            "id": "yoga-meditation",
            "name": "Йога и медитация"
          },
          {
            "id": "nutrition-healthy-lifestyle",
            "name": "Питание и ЗОЖ"
          },
          {
            "id": "mental-health",
            "name": "Ментальное здоровье"
          },
          {
            "id": "mindfulness",
            "name": "Осознанность"
          },
          {
            "id": "physical-training",
            "name": "Физические тренировки"
          },
          {
            "id": "sleep-recovery",
            "name": "Сон и восстановление"
          },
          {
            "id": "work-life-balance",
            "name": "Баланс жизни и работы"
          }
        ]
      }]} />
    </main>
  )
}
