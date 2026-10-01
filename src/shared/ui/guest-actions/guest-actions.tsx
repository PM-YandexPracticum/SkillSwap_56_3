import { Link } from 'react-router-dom';
import styles from './guest-actions.module.css';
import { Button } from '../button';
import { ROUTES } from '@/shared/lib/constants';

export const GuestActions = () => {
  return (
    <div className={styles.wrapper}>
      <Link to={ROUTES.LOGIN}>
        <Button extraclass={`${styles.btn} ${styles.login}`}>
          Войти
        </Button>
      </Link>

      <Link to={ROUTES.REGISTER}>
        <Button extraclass={`${styles.btn} ${styles.register}`}>
          Зарегистрироваться
        </Button>
      </Link>
    </div>
  );
};