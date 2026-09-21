// pages/UserCardTestPage/UserCardTestPage.tsx
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadUsers } from '@/entities/user/model/usersThunks'
import { toggleLike } from '@/entities/user/model/usersSlice'
import {
  selectUsers,
  selectUsersLoading,
  selectUsersError,
  selectMeta,
  selectLikedUserIds,
} from '@/entities/user/model/usersSelectors'
import { UserCard } from '@/shared/ui/user-card'

export default function UserCardTestPage() {
  const dispatch = useAppDispatch()

  // ─── Данные ────────────────────────────────────────────
  const users = useAppSelector(selectUsers)
  const isLoading = useAppSelector(selectUsersLoading)
  const error = useAppSelector(selectUsersError)
  const meta = useAppSelector(selectMeta)
  const likedUserIds = useAppSelector(selectLikedUserIds)

  // ─── Выбор юзера для проверки ──────────────────────────
  const [selectedIndex, setSelectedIndex] = useState(0)
  const user = users[selectedIndex]

  // ─── Загрузка при маунте ───────────────────────────────
  useEffect(() => {
    if (users.length === 0 && !isLoading) {
      dispatch(loadUsers())
    }
  }, [dispatch, users.length, isLoading])

  // ─── Логирование лайков ────────────────────────────────
  useEffect(() => {
    console.log('likedUserIds:', likedUserIds)
  }, [likedUserIds])

  // ─── UI-хелперы ────────────────────────────────────────
  const btn = (label: string, onClick: () => void, accent = false) => (
    <button
      onClick={onClick}
      style={{
        padding: '6px 10px',
        border: '1px solid #ccc',
        borderRadius: 6,
        background: accent ? '#ffeeba' : '#fff',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {label}
    </button>
  )

  return (
    <main style={{ padding: 24, fontFamily: 'monospace' }}>
      <h1>UserCardTestPage — тест компонента UserCard</h1>

      {/* ─── Состояния загрузки ───────────────── */}
      {isLoading && <p>Загрузка пользователей...</p>}
      {error && <p style={{ color: 'crimson' }}>Ошибка: {error}</p>}

      {/* ─── Actions ─────────────────────────── */}
      <h2>Actions</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {btn('loadUsers()', () => dispatch(loadUsers()), true)}
        {btn('toggleLike(текущий)', () => {
          if (user) dispatch(toggleLike(user.id))
        })}
        {btn('log likedUserIds', () => console.log('likedUserIds:', likedUserIds))}
      </div>

      {/* ─── Переключение юзера ───────────────── */}
      <h2>Выбор пользователя для проверки</h2>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 12,
        }}
      >
        {users.slice(0, 5).map((u, i) =>
          btn(
            `${u.id} — ${u.name}`,
            () => setSelectedIndex(i),
            selectedIndex === i
          )
        )}
      </div>

      {/* ─── Диагностика ─────────────────────── */}
      <h2>Диагностика</h2>
      <table
        style={{
          borderCollapse: 'collapse',
          marginBottom: 24,
          fontSize: 13,
        }}
      >
        <tbody>
          <tr>
            <td style={cellStyle}>users.length</td>
            <td style={cellStyle}>{users.length}</td>
          </tr>
          <tr>
            <td style={cellStyle}>meta</td>
            <td style={cellStyle}>
              {meta
                ? `{ cities: ${meta.cities.length}, categories: ${meta.categories.length} }`
                : 'null'}
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>likedUserIds</td>
            <td style={cellStyle}>{JSON.stringify(likedUserIds)}</td>
          </tr>
          <tr>
            <td style={cellStyle}>текущий user</td>
            <td style={cellStyle}>
              {user ? `${user.name} (${user.id})` : '—'}
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>лайкнут ли текущий</td>
            <td style={cellStyle}>
              {user ? String(likedUserIds.includes(user.id)) : '—'}
            </td>
          </tr>
          <tr>
            <td style={cellStyle}>likesCount текущего</td>
            <td style={cellStyle}>{user ? user.likesCount : '—'}</td>
          </tr>
        </tbody>
      </table>

      {/* ─── Карточка ────────────────────────── */}
      <h2>Компонент UserCard</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 24,
          background: '#fafafa',
          borderRadius: 12,
          marginBottom: 24,
        }}
      >
        {user ? (
          <div style={{ maxWidth: 400, width: '100%' }}>
            <UserCard
              user={user}
              onMore={(id) => console.log('onMore:', id)}
            />
          </div>
        ) : (
          <p style={{ color: '#999' }}>Нет данных — нажми loadUsers()</p>
        )}
      </div>

      {/* ─── Данные текущего юзера (raw) ─────── */}
      <h2>Данные текущего юзера (raw)</h2>
      <pre
        style={{
          background: '#f4f4f4',
          padding: 16,
          borderRadius: 8,
          fontSize: 13,
          overflow: 'auto',
          maxHeight: 400,
        }}
      >
        {JSON.stringify(user ?? null, null, 2)}
      </pre>
    </main>
  )
}

const cellStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '6px 10px',
  textAlign: 'left',
  verticalAlign: 'top',
}