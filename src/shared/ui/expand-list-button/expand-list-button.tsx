import { useState, type MouseEvent } from 'react'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './expand-list-button.module.css'
import type { ExpandListButtonProps } from './type'

export const ExpandListButton = ({
  label,
  onClick,
  expandedLabel = 'Свернуть',
  expanded,
  extraclass = '',
}: ExpandListButtonProps) => {
  const [ownExpanded, setOwnExpanded] = useState(false)
  const isExpanded = expanded ?? ownExpanded

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (expanded === undefined) {
      setOwnExpanded((prev) => !prev)
    }
    onClick?.(e)
  }

  return (
    <Button onClick={handleClick} extraclass={`${styles.expandListButton} ${extraclass}`.trim()}>
      {isExpanded ? expandedLabel : label}
      <span className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`.trim()}>
        <Icon name="chevron-down" size={20} />
      </span>
    </Button>
  )
}