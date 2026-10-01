import { Modal } from '@/shared/ui/modal'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon/Icon'
import styles from './success-modal.module.css'
import { SuccessModalProps } from './type'

export function SuccessModal({ isOpen, onDone }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onDone} width={556}>
      <div className={styles.content}>
        <Icon name="done" width={77} height={77} />

        <div className={styles.container}>
          <div className={styles.texts}>
            <h2 className={styles.title}>Ваше предложение создано</h2>
            <p className={styles.subtitle}>Теперь вы можете предложить обмен</p>
          </div>
          <Button type="button" onClick={onDone} extraclass={styles.done}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  )
}