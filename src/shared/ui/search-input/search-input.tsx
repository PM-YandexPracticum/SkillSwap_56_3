import { useRef, type ChangeEvent, type FormEvent } from 'react';
import { Icon } from '@/shared/ui/icon/Icon';
import type { SearchInputProps } from './type';
import styles from './search-input.module.css';

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Искать навык',
  extraClass = '',
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    onChange('');
    onSearch('');
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`${styles.form} ${extraClass}`.trim()}
    >
      <div className={styles.inputWrapper}>
        <button
          type="submit"
          className={styles.searchButton}
          aria-label="Искать"
        >
          <Icon name="search" size={20} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={styles.input}
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Очистить поле поиска"
          >
            ✕
          </button>
        )}
      </div>
    </form>
  );
};