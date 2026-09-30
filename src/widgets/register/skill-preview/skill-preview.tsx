import { Modal } from '@/shared/ui/modal'
import { SkillInfo } from '@/entities/skill/ui/skill-info'
import { ImageCarousel } from '@/shared/ui/image-carousel'
import { Button } from '@/shared/ui/button'
import styles from './skill-preview.module.css'
import { SkillPreviewProps } from './type'
import { Icon } from '@/shared/ui/icon'

export function SkillPreview({
  isOpen,
  values,
  errors,
  onEdit,
  onConfirm,
  isLoading,
}: SkillPreviewProps) {
  const selection = values.teachSelections[0]
  const categoryId = selection?.category ?? ''
  const subcategoryId = selection?.subcategories[0] ?? ''

  return (
    <Modal isOpen={isOpen} onClose={onEdit} width={1024}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h2 className={styles.title}>Ваше предложение</h2>
          <p className={styles.subtitle}>
            Пожалуйста, проверьте и подтвердите правильность данных
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.info}>
            <SkillInfo
              title={values.teachSkillName}
              category={categoryId}
              subcategory={subcategoryId}
              description={values.teachDescription}
            />
          </div>

          <div className={styles.carousel}>
            <ImageCarousel
              images={values.teachImages}
              alt={values.teachSkillName}
            />
          </div>

          <div className={styles.buttons}>
            <Button type="button" onClick={onEdit} extraClass={styles.edit}>
              Редактировать
              <Icon name='pencil'/>
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              extraClass={styles.confirm}
              disabled={isLoading}
            >
              {isLoading ? 'Отправка...' : 'Готово'}
            </Button>
          </div>
          {errors.form && <p className={styles.error}>{errors.form}</p>}
        </div>
      </div>
    </Modal>
  )
}