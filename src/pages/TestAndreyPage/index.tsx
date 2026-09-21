import { useEffect, useState } from 'react'
import type { City, GenderId, WantId } from '@/shared/types'
import { CitiesFilter } from '@/shared/ui/cities-filter'
import { GenderFilter } from '@/shared/ui/gender-filter'
import { ShowAllButton } from '@/shared/ui/show-all-button'
import { SkillFilter, type SkillFilterCategory } from '@/shared/ui/skill-filter'
import { WantFilter } from '@/shared/ui/want-filter'

type CatalogMeta = {
  cities: City[]
  categories: SkillFilterCategory[]
}

export default function TestAndreyPage() {
  const [meta, setMeta] = useState<CatalogMeta | null>(null)
  const [want, setWant] = useState<WantId>('all')
  const [gender, setGender] = useState<GenderId>('all')
  const [skills, setSkills] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    fetch('/db/users.json')
      .then((response) => response.json())
      .then((data) => setMeta(data.meta))
      .catch(() => setMeta(null))
  }, [])

  if (!meta) {
    return <main style={{
      padding: 24
    }}>Загрузка…</main>
  }

  return (
    <main
      style={{
        display: 'grid',
        gridTemplateColumns: '324px minmax(0, 1fr)',
        gap: 24,
        alignItems: 'start',
        padding: 24,
        background: '#f9faf7',
        minHeight: '100vh',
      }}
    >
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          padding: 20,
          background: '#fff',
          borderRadius: 16,
        }}
      >
        <h2 style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: 24,
          color: '#253017'
        }}>Фильтры</h2>

        <WantFilter value={want} onChange={setWant} />
        <SkillFilter categories={meta.categories} selected={skills} onChange={setSkills} />
        <GenderFilter value={gender} onChange={setGender} />
        <CitiesFilter cities={meta.cities} selected={cities} onChange={setCities} />
      </aside>

      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: 32,
            color: '#253017'
          }}>
            Текущие значения
          </h1>
          <ShowAllButton />
        </header>

        <pre
          style={{
            margin: 0,
            padding: 20,
            background: '#fff',
            borderRadius: 16,
            fontFamily: 'Roboto, monospace',
            fontSize: 14,
            color: '#253017',
            whiteSpace: 'pre-wrap',
          }}
        >
          {JSON.stringify({ want, gender, skills, cities }, null, 2)}
        </pre>
      </section>
    </main>
  )
}
