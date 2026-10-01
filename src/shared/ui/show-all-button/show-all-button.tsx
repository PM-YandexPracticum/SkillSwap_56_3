import { useState, type MouseEvent } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './show-all-button.module.css'
import type { ShowAllButtonProps } from './type'

export const ShowAllButton = ({
  onClick,
  label = 'Смотреть все',
  expandedLabel = 'Свернуть',
  expanded,
  extraclass = '',
}: ShowAllButtonProps) => {
  const [ownExpanded, setOwnExpanded] = useState(false)
  const isExpanded = expanded ?? ownExpanded

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (expanded === undefined) {
      setOwnExpanded((prev) => !prev)
    }
    onClick?.(e)
  }

  return (
    <Button onClick={handleClick} extraclass={`${styles.showAllButton} ${extraclass}`.trim()}>
      {isExpanded ? expandedLabel : label}
      <span className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`.trim()}>
        <Icon name="chevron-right" size={20} />
      </span>
    </Button>
  )
}