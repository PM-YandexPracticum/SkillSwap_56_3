import { Button } from '@/shared/ui/button';
import styles from './auth-button.module.css';
import { AuthButtonProps } from './type';

export const AuthButton = ({
  onClick,
  children,
  type = 'submit',
}: AuthButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      extraclass={styles.authButton}
    >
      {children}
    </Button>
  );
};
