import type { CSSProperties } from 'react';
import type { LoaderProps } from './type';
import styles from './loader.module.css';

export const Loader = ({
  size = 'medium',
  extraClass = '',
}: LoaderProps) => {
  const isPresetSize = typeof size === 'string';

  const sizeClass = isPresetSize ? styles[size] : '';
  const customStyle: CSSProperties | undefined = !isPresetSize
    ? {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${Math.max(2, Math.round(size / 10))}px`,
      }
    : undefined;

  const className = [styles.loader, sizeClass, extraClass]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      role="status"
      aria-label="Загрузка"
      className={className}
      style={customStyle}
    />
  );
};