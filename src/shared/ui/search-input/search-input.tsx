import { Icon } from '@/shared/ui/icon/Icon';
import type { SearchInputProps } from './type';
import styles from './search-input.module.css';

export function SearchInput({ value, onChange, placeholder = 'Искать навык' }: SearchInputProps) {
  return (
    <div className={styles.root} role="search">
      <Icon name="search" size={20} />

      <input
        className={styles.input}
        type="search"
        aria-label="Поиск"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    </div>
  )
}