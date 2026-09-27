import { Select } from '@/shared/ui/select'
import type { SelectValue } from '@/shared/ui/select/type'
import styles from './category-select.module.css'
import type { CategorySelectProps } from './type'

function toArray(value: SelectValue): string[] {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

export function CategorySelect({
  categories,
  categoryValue,
  subcategoryValue,
  onCategoryChange,
  onSubcategoryChange,
  categoryLabel = 'Категория навыка',
  subcategoryLabel = 'Подкатегория навыка',
  categoryError,
  subcategoryError,
}: CategorySelectProps) {
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    label: category.name,
  }))

  const visibleCategories =
    categoryValue.length > 0
      ? categories.filter((category) => categoryValue.includes(category.id))
      : categories

  const subcategoryOptions = visibleCategories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.name,
    })),
  )

  const findParentCategory = (subcategoryId: string) =>
    categories.find((category) =>
      category.subcategories.some((subcategory) => subcategory.id === subcategoryId),
    )?.id

  const handleCategoryChange = (value: SelectValue) => {
    const nextCategories = toArray(value)
    onCategoryChange(nextCategories)

    if (nextCategories.length === 0) {
      return
    }

    const allowed = categories
      .filter((category) => nextCategories.includes(category.id))
      .flatMap((category) => category.subcategories.map((subcategory) => subcategory.id))

    onSubcategoryChange(subcategoryValue.filter((id) => allowed.includes(id)))
  }

  const handleSubcategoryChange = (value: SelectValue) => {
    const nextSubcategories = toArray(value)
    onSubcategoryChange(nextSubcategories)

    const parents = nextSubcategories
      .map(findParentCategory)
      .filter((id): id is string => Boolean(id))

    const merged = Array.from(new Set([...categoryValue, ...parents]))

    if (merged.length !== categoryValue.length) {
      onCategoryChange(merged)
    }
  }

  return (
    <div className={styles.root}>
      <Select
        multiple
        label={categoryLabel}
        placeholder="Выберите категорию навыка"
        options={categoryOptions}
        value={categoryValue}
        onChange={handleCategoryChange}
        error={categoryError}
      />

      <Select
        multiple
        label={subcategoryLabel}
        placeholder="Выберите подкатегорию навыка"
        options={subcategoryOptions}
        value={subcategoryValue}
        onChange={handleSubcategoryChange}
        error={subcategoryError}
      />
    </div>
  )
}
