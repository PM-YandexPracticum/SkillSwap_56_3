import { AvatarUpload } from '@/shared/ui/avatar-upload'
import { NameInput } from '@/shared/ui/form-inputs'
import { DatePicker } from '@/shared/ui/date-picker/DatePicker'
import { GenderSelect } from '@/shared/ui/gender-select'
import { CitySelect } from '@/shared/ui/city-select'
import { CategorySelect } from '@/shared/ui/category-select'
import { Button } from '@/shared/ui/button'
import { InfoBlock } from '@/shared/ui/info-block'
import { FormLayout } from '@/shared/ui/form-layout'
import { AuthStepper } from '@/shared/ui/auth-stepper'
import styles from './register-step2.module.css'
import { RegisterStep2Props } from './type'
import userInfo from '@/icons/user-info.svg'

export function RegisterStep2({
  values,
  errors,
  categories,
  onFieldChange,
  onAvatarChange,
  onBack,
  onNext,
}: RegisterStep2Props) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onNext()
  }

  return (
    <FormLayout
      headerCenter={<AuthStepper step={2} />}
      leftContent={
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <AvatarUpload value={values.avatar} onChange={onAvatarChange} extraClass={styles.avatar} />

          <NameInput
            value={values.name}
            onChange={(e) => onFieldChange({ name: e.target.value })}
            error={errors.name}
          />

          <div className={styles.container}>
            <DatePicker
              label="Дата рождения"
              value={values.birthDate ? new Date(values.birthDate) : null}
              onChange={(date) =>
                onFieldChange({ birthDate: date ? date.toISOString() : '' })
              }
              error={errors.birthDate}
            />

            <GenderSelect
              value={values.gender}
              onChange={(v) => onFieldChange({ gender: v })}
              error={errors.gender}
            />
          </div>

          <CitySelect
            value={values.city}
            onChange={(v) => onFieldChange({ city: v })}
            error={errors.city}
          />

          <CategorySelect
            categories={categories}
            selections={values.learnSelections}
            onChange={(ls) => onFieldChange({ learnSelections: ls })}
            categoryLabel="Категория навыка, которому хотите научиться"
            subcategoryLabel="Подкатегория навыка, которому хотите научиться"
            categoryError={errors.learnCategories}
            subcategoryError={errors.learnSubcategories}
          />

          <div className={styles.actions}>
            <Button type="button" onClick={onBack} extraClass={styles.back}>
              Назад
            </Button>
            <Button type="submit" extraClass={styles.next}>
              Продолжить
            </Button>
          </div>
        </form>
      }
      rightContent={
        <InfoBlock
          image={<img className={styles.promoImage} src={userInfo} alt="" />}
          title="Расскажите немного о себе"
          description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
        />
      }
    />
  )
}