import styles from './auth-info-block.module.css';
import { AuthInfoBlockProps } from './type';


export const AuthInfoBlock = ({
  image,
  title,
  description,
  extraClass = '',
}: AuthInfoBlockProps) => {
  return (
    <aside className={`${styles.authInfoBlock} ${extraClass}`.trim()}>
      <div className={styles.content}>
        <div className={styles.image}>{image}</div>

        <h2 className={styles.title}>{title}</h2>

        <p className={styles.description}>{description}</p>
      </div>
    </aside>
  );
};
