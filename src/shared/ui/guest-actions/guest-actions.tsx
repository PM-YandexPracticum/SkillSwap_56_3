import { Link } from 'react-router-dom';
import styles from './guest-actions.module.css';
import { Button } from '../button';

export const GuestActions = () => {
  return (
    <div className={styles.wrapper}>
      <Link to="/login">
        <Button extraClass={`${styles.btn} ${styles.login}`}>
          Войти
        </Button>
      </Link>

      <Link to="/register">
        <Button extraClass={`${styles.btn} ${styles.register}`}>
          Зарегистрироваться
        </Button>
      </Link>
    </div>
  );
};