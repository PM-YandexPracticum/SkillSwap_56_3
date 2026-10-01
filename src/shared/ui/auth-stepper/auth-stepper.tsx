import styles from './auth-stepper.module.css'
import type { AuthStepperProps } from './type'

export const AuthStepper = ({ title, step, totalSteps = 3, extraclass = '' }: AuthStepperProps) => {
  const hasSteps = step !== undefined && totalSteps > 0
  const heading = title ?? (hasSteps ? `Шаг ${step} из ${totalSteps}` : '')

  return (
    <div className={`${styles.authStepper} ${extraclass}`.trim()}>
      {heading && <p className={styles.title}>{heading}</p>}

      {hasSteps && (
        <div className={styles.steps}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <span
              key={index}
              className={`${styles.step} ${index < step ? styles.stepDone : ''}`.trim()}
            />
          ))}
        </div>
      )}
    </div>
  )
}