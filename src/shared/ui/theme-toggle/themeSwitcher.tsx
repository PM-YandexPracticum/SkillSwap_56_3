import { Icon } from '@/shared/ui/icon/Icon';

import './themeSwitcher.css';
import type { ThemeSwitcherProps } from './type';

export const ThemeSwitcher = ({
  theme,
  onChange,
}: ThemeSwitcherProps) => {
  const isDarkTheme = theme === 'dark';

  const handleClick = () => {
    onChange(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <button
      className="theme-switcher"
      type="button"
      aria-label="Переключить тему"
      aria-pressed={isDarkTheme}
      onClick={handleClick}
    >
      <Icon name={isDarkTheme ? 'moon' : 'sun'} size={28} />
    </button>
  );
};
