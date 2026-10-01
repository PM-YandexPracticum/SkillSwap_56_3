import { AuthSocialButtons } from '@/shared/ui/auth-social-buttons'
import { EmailInput } from '@/shared/ui/form-inputs'
import { PasswordInput } from '@/shared/ui/password-input'
import { Button } from '@/shared/ui/button'
import { InfoBlock } from '@/shared/ui/info-block'
import { FormLayout } from '@/shared/ui/form-layout'
import { AuthStepper } from '@/shared/ui/auth-stepper'
import styles from './register-step1.module.css'
import { RegisterStep1Props } from './type'
import lightBulb from '@/icons/light-bulb.svg'

export function RegisterStep1({
  values,
  errors,
  onFieldChange,
  onNext,
  isLoading,
}: RegisterStep1Props) {
  const hasFormError = Boolean(errors.form)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return
    onNext()
  }

  return (
    <FormLayout
      headerCenter={<AuthStepper step={1} />}
      leftContent={
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <AuthSocialButtons/>

          <div className={styles.divider}>
            <span className={styles.dividerText}>или</span>
          </div>

          <EmailInput
            value={values.email}
            onChange={(e) => onFieldChange({ email: e.target.value })}
            error={errors.email}
          />

          <PasswordInput
            value={values.password}
            label='Пароль'
            onChange={(e) => onFieldChange({ password: e.target.value })}
            error={errors.password}
            placeholder='Придумайте надёжный пароль'
          />

          {hasFormError && <p className={styles.error}>{errors.form}</p>}

          <Button type="submit" extraclass={styles.submit} 
            disabled={isLoading || Object.keys(errors).length > 0}>
            {isLoading ? 'Проверяем...' : 'Далее'}
          </Button>
        </form>
      }
      rightContent={
        <InfoBlock
          image={<img className={styles.promoImage} src={lightBulb} alt="" />}
          title="Добро пожаловать в SkillSwap"
          description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
        />
      }
    />
  )
}