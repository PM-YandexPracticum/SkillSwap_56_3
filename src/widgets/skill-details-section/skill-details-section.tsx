import { UserCard } from '@/shared/ui/user-card';
import { SkillCard } from '@/widgets/skill-card';
import { useState } from 'react';

import type { SkillDetailsSectionProps } from './type';
import styles from './skill-details-section.module.css';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectHasExchange } from '@/features/exchange/model/exchangeSelectors';
import { proposeExchange } from '@/features/exchange/model/exchangeSlice';
import { Modal } from '@/shared/ui/modal';
import { Icon } from '@/shared/ui/icon';
import { Button } from '@/shared/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated } from '@/features/auth/model/authSelectors';
import { ROUTES } from '@/shared/lib/constants';

export const SkillDetailsSection = ({
  skill,
  author,
}: SkillDetailsSectionProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isAuth = useAppSelector(selectIsAuthenticated)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasExchange = useAppSelector((state) =>
    author ? selectHasExchange(state, author.id) : false,
  )

  const handleOfferExchange = () => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN, {
        state: { from: location },
      })
      return
    }

    if (!author) return

    dispatch(proposeExchange(author.id))
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section className={styles.section}>
      <aside className={styles.author}>
        <UserCard
          user={author}
          isCatalog={false}
          extraClass={styles.user}
        />
      </aside>

      <SkillCard
        skill={skill}
        extraClass={styles.skillCard}
        onOfferExchange={handleOfferExchange}
        hasExchange={hasExchange}
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width={556}>
      <div className={styles.successContent}>
        <Icon name="bell" width={77} height={77} />

        <div className={styles.container}>
          <div className={styles.texts}>
            <h2 className={styles.successTitle}>Вы предложили обмен</h2>
            <p className={styles.successText}>Теперь дождитесь подтверждения. Вам придёт уведомление</p>
          </div>
          <Button type="button" onClick={handleCloseModal} extraClass={styles.successButton}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
    </section>
  );
};
