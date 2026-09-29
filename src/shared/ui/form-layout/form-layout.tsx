import { Children } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/shared/ui/logo';
import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon/Icon';
import type { FormLayoutProps } from './type';
import styles from './form-layout.module.css';
import { useAppDispatch } from '@/store/hooks';
import { resetDraft } from '@/features/auth/model/authSlice';

export const FormLayout = ({
  leftContent,
  rightContent,
  headerCenter,
  children,
  extraClass = '',
  closeTo = '/',
}: FormLayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleClose = () => {
    navigate(closeTo);
    dispatch(resetDraft())
  };

  const childrenArray = Children.toArray(children);
  const resolvedLeft = leftContent ?? childrenArray[0] ?? null;
  const resolvedRight = rightContent ?? childrenArray[1] ?? null;

  return (
    <div className={`${styles.layout} ${extraClass}`.trim()}>
      <header className={styles.header}>
        <Logo />

        <Button
          onClick={handleClose}
          extraClass={styles.closeButton}
          aria-label="Закрыть"
        >
          <span>Закрыть</span>
          <Icon name="cross" size={13} />
        </Button>
      </header>

      {headerCenter && (
          <div className={styles.headerCenter}>
            {headerCenter}
          </div>
        )}

      <main className={styles.contentWrapper}>
        <div className={styles.columnsGrid}>
          <div className={`${styles.column} ${styles.columnLeft}`}>
            <div className={styles.contentInner}>
              {resolvedLeft}
            </div>
          </div>

          <div className={`${styles.column} ${styles.columnRight}`}>
            <div className={styles.contentInner}>
              {resolvedRight}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};