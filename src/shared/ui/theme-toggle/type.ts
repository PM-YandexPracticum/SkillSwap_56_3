export type Theme = 'light' | 'dark';

export interface ThemeSwitcherProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}
