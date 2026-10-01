import { SkillNameInput } from '@/shared/ui/form-inputs'
import { CategorySelect } from '@/shared/ui/category-select'
import { DescriptionTextarea } from '@/shared/ui/form-textareas'
import { ImageUpload } from '@/shared/ui/image-upload'
import { Button } from '@/shared/ui/button'
import { InfoBlock } from '@/shared/ui/info-block'
import { FormLayout } from '@/shared/ui/form-layout'
import { AuthStepper } from '@/shared/ui/auth-stepper'
import styles from './register-step3.module.css'
import schoolBoard from '@/icons/school-board.svg'
import { RegisterStep3Props } from './type'

export function RegisterStep3({
  values,
  errors,
  categories,
  onFieldChange,
  onBack,
  onOpenPreview,
  isLoading,
}: RegisterStep3Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onOpenPreview()
  }

  return (
    <FormLayout
      headerCenter={<AuthStepper step={3} />}
      leftContent={
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <SkillNameInput
            value={values.teachSkillName}
            onChange={(e) => onFieldChange({ teachSkillName: e.target.value })}
            error={errors.teachSkillName}
            maxLength={50}
            minLength={3}
          />

          <CategorySelect
            categories={categories}
            selections={values.teachSelections}
            onChange={(sels) => onFieldChange({ teachSelections: sels })}
            categoryLabel="Категория навыка"
            subcategoryLabel="Подкатегория навыка"
            categoryError={errors.teachCategory}
            subcategoryError={errors.teachSubcategory}
            multiple={false}
          />

          <DescriptionTextarea
            value={values.teachDescription}
            onChange={(e) => onFieldChange({ teachDescription: e.target.value })}
            error={errors.teachDescription}
            maxLength={500}
          />

          <ImageUpload
            value={values.teachImages}
            onChange={(urls) => onFieldChange({ teachImages: urls })}
            multiple
          />

          <div className={styles.actions}>
            <Button type="button" onClick={onBack} extraclass={styles.back}>
              Назад
            </Button>
            <Button type="submit" extraclass={styles.next} 
              disabled={isLoading || Object.keys(errors).length > 0}>
              {isLoading ? 'Отправка...' : 'Продолжить'}
            </Button>
          </div>
        </form>
      }
      rightContent={
        <InfoBlock
          image={<img className={styles.promoImage} src={schoolBoard} alt="" />}
          title="Укажите, чем вы готовы поделиться"
          description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
        />
      }
    />
  )
}