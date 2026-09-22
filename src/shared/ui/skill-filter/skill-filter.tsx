import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { CheckOption } from '@/shared/ui/check-option'
import { ExpandListButton } from '@/shared/ui/expand-list-button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './skill-filter.module.css'
import type { SkillFilterCategory, SkillFilterProps } from './type'

export const SkillFilter = ({
  categories,
  selected,
  defaultSelected = [],
  onChange,
  title = 'Навыки',
  extraClass = '',
}: SkillFilterProps) => {
  const [ownSelected, setOwnSelected] = useState<string[]>(defaultSelected)
  const [openCategories, setOpenCategories] = useState<string[]>([])

  const currentSelected = selected ?? ownSelected
  const areAllOpen = categories.length > 0 && openCategories.length === categories.length

  const applySelected = (next: string[]) => {
    if (selected === undefined) {
      setOwnSelected(next)
    }
    onChange?.(next)
  }

  const toggleCategoryOpen = (categoryId: string) => {
    setOpenCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleAllOpen = () => {
    setOpenCategories(areAllOpen ? [] : categories.map((category) => category.id))
  }

  const toggleSubcategory = (subcategoryId: string, checked: boolean) => {
    applySelected(
      checked
        ? [...currentSelected, subcategoryId]
        : currentSelected.filter((id) => id !== subcategoryId),
    )
  }

  const toggleCategory = (category: SkillFilterCategory, checked: boolean) => {
    const subcategoryIds = category.subcategories.map((subcategory) => subcategory.id)
    const withoutCategory = currentSelected.filter((id) => !subcategoryIds.includes(id))

    applySelected(checked ? [...withoutCategory, ...subcategoryIds] : withoutCategory)
  }

  return (
    <fieldset className={`${styles.group} ${extraClass}`.trim()}>
      <legend className={styles.title}>{title}</legend>

      <div className={styles.list}>
        {categories.map((category) => {
          const subcategoryIds = category.subcategories.map((subcategory) => subcategory.id)
          const checkedCount = subcategoryIds.filter((id) => currentSelected.includes(id)).length
          const isChecked = subcategoryIds.length > 0 && checkedCount === subcategoryIds.length
          const isOpen = openCategories.includes(category.id)

          return (
            <div key={category.id}>
              <div className={styles.row}>
                <CheckOption
                  value={category.id}
                  label={category.name}
                  checked={isChecked}
                  indeterminate={checkedCount > 0}
                  onChange={(checked) => toggleCategory(category, checked)}
                />

                <Button extraClass={styles.expand} onClick={() => toggleCategoryOpen(category.id)}>
                  <span className={`${styles.icon} ${isOpen ? styles.iconExpanded : ''}`.trim()}>
                    <Icon name="chevron-down" size={20} />
                  </span>
                </Button>
              </div>

              {isOpen && (
                <div className={styles.sub}>
                  {category.subcategories.map((subcategory) => (
                    <CheckOption
                      key={subcategory.id}
                      value={subcategory.id}
                      label={subcategory.name}
                      checked={currentSelected.includes(subcategory.id)}
                      onChange={(checked) => toggleSubcategory(subcategory.id, checked)}
                    />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <ExpandListButton label="Все категории" expanded={areAllOpen} onClick={toggleAllOpen} />
    </fieldset>
  )
}