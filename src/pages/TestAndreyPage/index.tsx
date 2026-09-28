import { useState } from 'react'
import { CitySelect } from '@/shared/ui/city-select'
import { GenderSelect, type GenderValue } from '@/shared/ui/gender-select'

const cardStyle = {
  padding: 20,
  background: '#fff',
  borderRadius: 16,
}

const buttonStyle = {
  minHeight: 40,
  padding: '8px 16px',
  border: 'none',
  borderRadius: 12,
  background: '#fff',
  boxShadow: 'inset 0 0 0 1px #abd27a',
  color: '#253017',
  fontFamily: 'Roboto, sans-serif',
  fontSize: 16,
  cursor: 'pointer',
}

export default function TestAndreyPage() {
  const [gender, setGender] = useState<GenderValue | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [showErrors, setShowErrors] = useState(false)

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        maxWidth: 436,
        padding: 24,
      }}
    >
      <h1 style={{ fontFamily: 'Jost, sans-serif', fontSize: 32, color: '#253017' }}>
        Селекты пола и города
      </h1>

      <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <GenderSelect
          value={gender}
          onChange={setGender}
          error={showErrors && !gender ? 'Выберите пол' : ''}
        />

        <CitySelect
          value={city}
          onChange={setCity}
          error={showErrors && !city ? 'Выберите город' : ''}
        />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button style={buttonStyle} type="button" onClick={() => setShowErrors((prev) => !prev)}>
          {showErrors ? 'Убрать ошибки' : 'Показать ошибки'}
        </button>

        <button
          style={buttonStyle}
          type="button"
          onClick={() => {
            setGender(null)
            setCity(null)
          }}
        >
          Сбросить
        </button>
      </div>

      <pre
        style={{
          ...cardStyle,
          margin: 0,
          fontFamily: 'Roboto, monospace',
          fontSize: 14,
          color: '#253017',
          whiteSpace: 'pre-wrap',
        }}
      >
        {JSON.stringify({ gender, city }, null, 2)}
      </pre>
    </main>
  )
}
