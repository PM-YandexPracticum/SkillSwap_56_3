import './themeSwitcher.css';

type Theme = 'light' | 'dark';

interface ThemeSwitcherProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

const SunIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />

      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const MoonIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
      {isDarkTheme ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};
