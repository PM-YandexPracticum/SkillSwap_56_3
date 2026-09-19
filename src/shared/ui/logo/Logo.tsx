import { Link } from 'react-router-dom';

import { Icon } from '@/shared/ui/icon/Icon.tsx';

import styles from './Logo.module.css';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={`${styles.logo} ${className ?? ''}`}
      aria-label="SkillSwap — перейти на главную страницу"
    >
      <span className={styles.iconWrapper}>
        <Icon name="logo" size={28} />
      </span>

      <span className={styles.text}>
        Skill<span>Swap</span>
      </span>
    </Link>
  );
}
