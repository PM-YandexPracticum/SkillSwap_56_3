import { Select } from '@/shared/ui/select'
import type { SelectValue } from '@/shared/ui/select/type'
import styles from './category-select.module.css'
import type { CategorySelectProps } from './type'
import { SkillSelection } from '@/shared/types'

function toArray(value: SelectValue | string[] | string | null): string[] {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

export function CategorySelect({
  categories,
  selections,
  onChange,
  categoryLabel = 'Категория навыка',
  subcategoryLabel = 'Подкатегория навыка',
  categoryError,
  subcategoryError,
  multiple = true,
}: CategorySelectProps) {
  const selectedCategories = selections.map((s) => s.category)

  const visibleCategories =
    selectedCategories.length > 0
      ? categories.filter((c) => selectedCategories.includes(c.id))
      : categories

  const subcategoryOptions = visibleCategories.flatMap((category) =>
    category.subcategories.map((sub) => ({ id: sub.id, label: sub.name }))
  )

  const selectedSubcategories = selections.flatMap((s) => s.subcategories)

  const handleCategoryChange = (value: SelectValue) => {
    const nextCategories = multiple
      ? toArray(value)
      : value
        ? [value as string]
        : []

    const nextSelections = nextCategories.map((categoryId) => {
      const existing = selections.find((s) => s.category === categoryId)
      return {
        category: categoryId,
        subcategories: existing?.subcategories ?? [],
      }
    })

    onChange(nextSelections)
  }

  const handleSubcategoryChange = (value: SelectValue) => {
    const nextSubcategories = multiple
      ? toArray(value)
      : value
        ? [value as string]
        : []

    const findParent = (subId: string) =>
      categories.find((c) =>
        c.subcategories.some((sub) => sub.id === subId)
      )?.id

    const grouped = new Map<string, string[]>()
    nextSubcategories.forEach((subId) => {
      const parent = findParent(subId)
      if (!parent) return
      if (!grouped.has(parent)) grouped.set(parent, [])
      grouped.get(parent)!.push(subId)
    })
    const nextSelections: SkillSelection[] = selectedCategories.map(
      (categoryId) => ({
        category: categoryId,
        subcategories: grouped.get(categoryId) ?? [],
      })
    )

    grouped.forEach((subcategories, categoryId) => {
      if (!selectedCategories.includes(categoryId)) {
        nextSelections.push({ category: categoryId, subcategories })
      }
    })

    onChange(nextSelections)
  }

  return (
    <div className={styles.root}>
      <Select
        multiple={multiple}
        label={categoryLabel}
        placeholder="Выберите категорию навыка"
        options={categories.map((c) => ({ id: c.id, label: c.name }))}
        value={multiple ? selectedCategories : selectedCategories[0] ?? null}
        onChange={handleCategoryChange}
        error={categoryError}
      />

      <Select
        multiple={multiple}
        label={subcategoryLabel}
        placeholder="Выберите подкатегорию навыка"
        options={subcategoryOptions}
        value={multiple ? selectedSubcategories : selectedSubcategories[0] ?? null}
        onChange={handleSubcategoryChange}
        error={subcategoryError}
      />
    </div>
  )
}