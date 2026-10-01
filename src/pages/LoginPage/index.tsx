import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FormLayout } from '@/shared/ui/form-layout'
import { AuthSocialButtons } from '@/shared/ui/auth-social-buttons'
import { EmailInput } from '@/shared/ui/form-inputs'
import { PasswordInput } from '@/shared/ui/password-input'
import { Button } from '@/shared/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { login } from '@/features/auth/model/authThunks'
import { clearLoginErrors } from '@/features/auth/model/authSlice'
import { selectAuthLoading, selectLoginErrors } from '@/features/auth/model/authSelectors'
import { ROUTES } from '@/shared/lib/constants'
import lightBulb from '@/icons/light-bulb.svg'
import styles from './login-page.module.css'
import { InfoBlock } from '@/shared/ui/info-block'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(selectAuthLoading)
  const loginErrors = useAppSelector(selectLoginErrors)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hasAnyError = Object.keys(loginErrors).length > 0
  const hasFormError = Boolean(loginErrors.form)

  const clearErrors = () => {
    if (hasAnyError) {
      dispatch(clearLoginErrors())
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <FormLayout 
    headerCenter={<h2 className={styles.title}>Вход</h2>}
    leftContent={
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <AuthSocialButtons />

          <div className={styles.divider}>
            <span className={styles.dividerText}>или</span>
          </div>

          <EmailInput
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              clearErrors()
            }}
            error={loginErrors.email}
            className={hasFormError ? styles.invalid : undefined}
          />

          <PasswordInput
            value={password}
            label='Пароль'
            placeholder="Введите ваш пароль"
            onChange={(event) => {
              setPassword(event.target.value)
              clearErrors()
            }}
            error={loginErrors.password}
            className={hasFormError ? styles.invalid : undefined}
          />

          {hasFormError && <p className={styles.formError}>{loginErrors.form}</p>}

          <div className={styles.actions}>
            <Button type="submit" extraclass={styles.submit} 
              disabled={isLoading || hasAnyError}>
              {isLoading ? 'Входим...' : 'Войти'}
            </Button>

            <Link className={styles.registerLink} to={ROUTES.REGISTER}>
              Зарегистрироваться
            </Link>
          </div>
        </form>
      }
      rightContent={
        <InfoBlock
          image={<img className={styles.promoImage} src={lightBulb} alt="" />}
          title="С возвращением в SkillSwap!"
          description="Обменивайтесь знаниями и навыками с другими людьми"
        />
      }
    />
  )
}
